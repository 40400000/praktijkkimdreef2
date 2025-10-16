"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, MessageSquare, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Mail, ArrowUpRight, ChevronDown } from "lucide-react";
import { getAvailableTimeSlots, getCalendarAvailability, getTreatments, getQuickSelectSlots, type TimeSlot, type CalendarDay, type QuickSelectSlot } from "@/lib/actions/availability";
import { createAppointment, type AppointmentData } from "@/lib/actions/appointments";
import { Treatment } from "@/lib/db";

interface AppointmentBookingState {
  treatment: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface AppointmentBookingProps {
  onStepChange?: (step: number) => void;
}

export default function AppointmentBooking({ onStepChange }: AppointmentBookingProps) {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1); // 1: treatment, 2: date, 3: time
  const [appointmentData, setAppointmentData] = useState<AppointmentBookingState>({
    treatment: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({});
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [quickSelectSlots, setQuickSelectSlots] = useState<QuickSelectSlot[]>([]);
  const [loadingQuickSlots, setLoadingQuickSlots] = useState(false);
  const timeSlotsContainerRef = useRef<HTMLDivElement>(null);

  // Load treatments on component mount
  useEffect(() => {
    async function loadTreatments() {
      try {
        const treatmentData = await getTreatments();
        setTreatments(treatmentData);
      } catch (error) {
        console.error('Error loading treatments:', error);
      }
    }
    loadTreatments();
  }, []);

  // Load quick select slots when treatment changes
  useEffect(() => {
    async function loadQuickSelectSlots() {
      if (selectedTreatment) {
        setLoadingQuickSlots(true);
        setQuickSelectSlots([]);
        try {
          const slots = await getQuickSelectSlots(selectedTreatment);
          setQuickSelectSlots(slots);
        } catch (error) {
          console.error('Error loading quick select slots:', error);
        } finally {
          setLoadingQuickSlots(false);
        }
      } else {
        setQuickSelectSlots([]);
      }
    }
    loadQuickSelectSlots();
  }, [selectedTreatment]);

  // Load calendar data when month changes
  useEffect(() => {
    async function loadCalendarData() {
      const startTime = performance.now();
      console.log(`⏱️ [UI] Starting to load calendar for ${currentMonth.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}`);
      
      setLoading(true);
      setCalendarData([]); // Clear old data to show skeleton
      setDebugInfo({}); // Clear debug info
      
      try {
        // Get treatment duration for calendar availability
        const treatmentDuration = selectedTreatment 
          ? treatments.find(t => t.value === selectedTreatment)?.duration || 60
          : 60; // Default to 60 minutes if no treatment selected
        
        const calendar = await getCalendarAvailability(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          treatmentDuration
        );
        
        // Fetch debug info for the entire month (only in development)
        if (process.env.NODE_ENV === 'development') {
          try {
            const response = await fetch(`/api/debug-availability?date=${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-01&duration=${treatmentDuration}&month=true`);
            if (response.ok) {
              const monthDebugInfo = await response.json();
              setDebugInfo(monthDebugInfo);
            }
          } catch (error) {
            console.error('Error fetching month debug info:', error);
            setDebugInfo({ error: 'Failed to fetch month debug info' });
          }
        }
        const endTime = performance.now();
        console.log(`✅ [UI] Calendar loaded in ${(endTime - startTime).toFixed(0)}ms`);
        console.log(`🔍 [UI] Calendar data:`, calendar.filter(d => d.isCurrentMonth).map(d => ({ date: d.date, hasAvailability: d.hasAvailability })));
        setCalendarData(calendar);
      } catch (error) {
        console.error('Error loading calendar data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCalendarData();
  }, [currentMonth, selectedTreatment, treatments]);

  // Load time slots when date changes
  useEffect(() => {
    async function loadTimeSlots() {
      if (appointmentData.date && selectedTreatment) {
        console.log(`🔍 [UI] Loading time slots for ${appointmentData.date} with treatment ${selectedTreatment}`);
        setLoading(true);
        try {
          const slots = await getAvailableTimeSlots(appointmentData.date, selectedTreatment);
          console.log(`✅ [UI] Received ${slots.length} time slots, ${slots.filter(s => s.available).length} available`);
          console.log(`🔍 [UI] Time slots:`, slots);
          setTimeSlots(slots);
        } catch (error) {
          console.error('Error loading time slots:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadTimeSlots();
  }, [appointmentData.date, selectedTreatment]);

  // Auto-select first available date when moving to date selection
  useEffect(() => {
    if (subStep === 2 && selectedTreatment && !appointmentData.date && calendarData.length > 0) {
      const firstAvailableDate = calendarData.find(date => date.hasAvailability);
      if (firstAvailableDate) {
        setAppointmentData({ ...appointmentData, date: firstAvailableDate.date });
      }
    }
  }, [subStep, selectedTreatment, appointmentData, calendarData]);

  // Check if scroll indicator should be shown when timeSlots change
  useEffect(() => {
    const container = timeSlotsContainerRef.current;
    if (container) {
      const hasScroll = container.scrollHeight > container.clientHeight;
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      setShowScrollIndicator(hasScroll && !isAtBottom);
    }
  }, [timeSlots]);

  // Handle scroll to update indicator visibility
  const handleTimeSlotsScroll = () => {
    const container = timeSlotsContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      setShowScrollIndicator(!isAtBottom);
    }
  };

  const handleQuickSelect = (slot: QuickSelectSlot) => {
    const slotDate = new Date(slot.date);
    if (slotDate.getFullYear() !== currentMonth.getFullYear() || slotDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(slotDate.getFullYear(), slotDate.getMonth(), 1));
    }
    setAppointmentData({ ...appointmentData, date: slot.date, time: slot.time });
  };

  const handleTreatmentChange = (value: string) => {
    setSelectedTreatment(value);
    setAppointmentData({ ...appointmentData, treatment: value, date: "", time: "" }); // Also reset date/time
    
    // Auto-continue to next step after a small delay
    setTimeout(() => {
      setSubStep(2);
    }, 800);
  };

  const handleTreatmentNext = () => {
    if (selectedTreatment) {
      setSubStep(2);
    }
  };

  const handleDateSelect = (date: string) => {
    setAppointmentData({ ...appointmentData, date, time: "" }); // Reset time when date changes
    // Don't advance to sub-step 3, times will show on the right
  };

  const handleTimeSelect = (time: string) => {
    setAppointmentData({ ...appointmentData, time });
  };

  // Month navigation functions
  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const canGoPrevious = () => {
    const today = new Date();
    const firstOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentMonth >= firstOfCurrentMonth;
  };

  const canGoNext = () => {
    const today = new Date();
    const maxMonth = new Date(today.getFullYear(), today.getMonth() + 6, 1); // 6 months ahead
    return currentMonth < maxMonth;
  };

  const handleNextStep = () => {
    if (step === 1 && appointmentData.treatment && appointmentData.date && appointmentData.time) {
      setStep(2);
      setSubStep(1); // Reset substep for next step
      onStepChange?.(2); // Notify parent component about step change
    }
  };

  const handleBackToTreatment = () => {
    setSubStep(1);
    setAppointmentData({ ...appointmentData, date: "", time: "" });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setNotification(null);
    
    try {
      const result = await createAppointment(appointmentData as AppointmentData);
      
      if (result.success) {
        // Show full success screen
        setShowSuccessScreen(true);
      } else {
        setNotification({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setNotification({ 
        type: 'error', 
        message: 'Er is een fout opgetreden bij het aanvragen van de afspraak. Probeer het opnieuw.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToStart = () => {
    setShowSuccessScreen(false);
    setStep(1);
    setSubStep(1);
    setAppointmentData({
      treatment: "",
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setSelectedTreatment("");
    onStepChange?.(1);
  };

  const selectedTreatmentData = treatments.find(t => t.value === selectedTreatment);

  const QuickSelectComponent = () => {
    if (loadingQuickSlots) {
      return (
        <div className="bg-white p-4 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Snelle opties</h3>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full p-4 rounded-lg bg-gray-100 animate-pulse h-[68px]" />
            ))}
          </div>
        </div>
      );
    }

    if (!loadingQuickSlots && quickSelectSlots.length === 0) return null;

    return (
      <div className="bg-white p-4 rounded-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Snelle opties</h3>
        <div className="space-y-2">
          {quickSelectSlots.map((slot) => (
            <motion.button
              key={slot.date + slot.time}
              type="button"
              onClick={() => handleQuickSelect(slot)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-[#899B90] hover:bg-gray-50 transition-all duration-200"
            >
              <div className="font-medium text-gray-800">{slot.label}</div>
              <div className="text-sm text-gray-500">
                {new Date(slot.date + 'T00:00:00').toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })} om {slot.time}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div
              className={`rounded-xl shadow-lg p-4 border ${
                notification.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {notification.type === 'success' ? (
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                </div>
                <button
                  onClick={() => setNotification(null)}
                  className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <span className="sr-only">Sluiten</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 rounded-2xl p-4 lg:p-6">
          
          {/* Progress Indicator - Hide on success screen */}
          {!showSuccessScreen && (
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  step >= 1 ? 'bg-[#899B90] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`h-0.5 w-12 transition-colors duration-200 ${
                  step >= 2 ? 'bg-[#899B90]' : 'bg-gray-200'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  step >= 2 ? 'bg-[#899B90] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  {/* Sub-step 1: Treatment Selection */}
                  {subStep === 1 && (
                    <motion.div
                      key="treatment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="flex items-center mb-6">
                        <Calendar className="w-6 h-6 text-[#899B90] mr-3" />
                        <h2 className="text-2xl font-light text-gray-900">Kies behandeling</h2>
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Gewenste behandeling *
                        </label>
                        <select
                          value={selectedTreatment}
                          onChange={(e) => handleTreatmentChange(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#899B90] focus:border-transparent transition-colors duration-200"
                        >
                          <option value="">Kies behandeling</option>
                          {treatments.map((treatment) => (
                            <option key={treatment.value} value={treatment.value}>
                              {treatment.label} ({treatment.duration} min)
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedTreatment && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-6"
                        >
                          <div className="border border-[#b8c5bb] rounded-xl p-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 text-[#899B90] mr-2" />
                              <span className="text-sm text-gray-700 font-medium">
                                Behandelduur: {selectedTreatmentData?.duration} minuten
                              </span>
                            </div>
                          </div>

                          {/* Next Button */}
                          <div className="flex justify-center">
                            <button
                              onClick={handleTreatmentNext}
                              className="inline-flex items-center px-8 py-3 bg-[#899B90] text-white rounded-xl hover:bg-[#6d7c74] transition-colors duration-200 font-medium shadow-sm"
                            >
                              Volgende: Datum kiezen
                              <ArrowRight className="ml-3 w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Separator with "of" */}
                      <div className="my-8">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">of</span>
                          </div>
                        </div>
                      </div>

                      {/* E-mail Contact Section */}
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <Mail className="w-6 h-6 text-[#899B90] mr-3" />
                          <h3 className="text-xl font-light text-gray-900">Stuur een e-mail</h3>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">
                          Stuur een e-mail met uw vraag of gewenste afspraakdatum. Ik neem zo spoedig mogelijk contact met u op.
                        </p>
                        
                        <div className="bg-[#FFFFFF] rounded-xl p-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Vermeld in uw e-mail:</h4>
                              <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-[#899B90] rounded-full mr-3 flex-shrink-0"></div>
                                  Uw naam en telefoonnummer
                                </li>
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-[#899B90] rounded-full mr-3 flex-shrink-0"></div>
                                  Gewenste behandeling (orthomoleculair/homeopathie)
                                </li>
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-[#899B90] rounded-full mr-3 flex-shrink-0"></div>
                                  Voorkeursdata en -tijd
                                </li>
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-[#899B90] rounded-full mr-3 flex-shrink-0"></div>
                                  Korte omschrijving van uw klacht
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <a
                            href="mailto:info@praktijkkimdreef.nl?subject=Afspraak maken&body=Beste Kim,%0D%0A%0D%0AIk zou graag een afspraak maken voor:%0D%0A%0D%0ANaam:%0D%0ATelefoonnummer:%0D%0ABehandeling:%0D%0AVoorkeursdata:%0D%0AVoorkeurtijd:%0D%0AKlacht/vraag:%0D%0A%0D%0AMet vriendelijke groet,"
                            className="inline-flex items-center px-8 py-3 bg-[#899B90] text-white rounded-full hover:bg-[#6d7c74] transition-colors duration-200 font-medium"
                          >
                            E-mail sturen
                            <ArrowUpRight className="ml-3 w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Sub-step 2: Date Selection */}
                  {subStep === 2 && (
                    <motion.div
                      key="date"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <Calendar className="w-6 h-6 text-[#899B90] mr-3" />
                          <h2 className="text-2xl font-light text-gray-900">
                            {appointmentData.date ? 'Beschikbare data en tijden' : 'Beschikbare data'}
                          </h2>
                        </div>
                        <button
                          onClick={handleBackToTreatment}
                          className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4 mr-1" />
                          Terug
                        </button>
                      </div>

                      <div className="border border-[#b8c5bb] rounded-xl p-4 mb-6">
                        <div className="text-sm text-gray-700 font-medium">
                          {selectedTreatmentData?.label} ({selectedTreatmentData?.duration} min)
                        </div>
                      </div>

                      <div className={`grid gap-8 ${appointmentData.date ? 'grid-cols-1 lg:grid-cols-2' : ''}`}>
                        {/* Calendar */}
                        <div>
                          {/* Calendar Header */}
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              {currentMonth.toLocaleDateString('nl-NL', { 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={handlePreviousMonth}
                                disabled={!canGoPrevious()}
                                className={`p-2 rounded-lg border transition-all duration-200 ${
                                  canGoPrevious()
                                    ? 'text-gray-600 border-gray-300 hover:text-[#899B90] hover:border-[#899B90] hover:bg-gray-50 cursor-pointer'
                                    : 'text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50'
                                }`}
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={handleNextMonth}
                                disabled={!canGoNext()}
                                className={`p-2 rounded-lg border transition-all duration-200 ${
                                  canGoNext()
                                    ? 'text-gray-600 border-gray-300 hover:text-[#899B90] hover:border-[#899B90] hover:bg-gray-50 cursor-pointer'
                                    : 'text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50'
                                }`}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Days of week header */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
                              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Grid */}
                          <div className="grid grid-cols-7 gap-1">
                            {loading ? (
                              // Loading skeleton
                              Array.from({ length: 35 }).map((_, index) => (
                                <div 
                                  key={`skeleton-${index}`}
                                  className="aspect-square flex items-center justify-center rounded-lg bg-gray-100 animate-pulse"
                                />
                              ))
                            ) : (
                              calendarData.map((dateItem, index) => {
                              const isSelected = appointmentData.date === dateItem.date;
                              const isAvailable = dateItem.hasAvailability;
                              const isInCurrentMonth = dateItem.isCurrentMonth;
                              
                              // Only render dates from current month
                              if (!isInCurrentMonth) {
                                return (
                                  <div 
                                    key={`${dateItem.date}-${index}`} 
                                    className="aspect-square"
                                  />
                                );
                              }
                              
                              return (
                                <motion.button
                                  key={`${dateItem.date}-${index}`}
                                  type="button"
                                  onClick={() => isAvailable ? handleDateSelect(dateItem.date) : null}
                                  disabled={!isAvailable}
                                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                                  className={`
                                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
                                    ${isSelected
                                      ? 'bg-[#899B90] text-white font-medium'
                                      : isAvailable
                                      ? 'text-gray-900 hover:bg-[#899B90] hover:text-white border border-gray-200 hover:border-[#899B90]'
                                      : 'text-gray-400 cursor-not-allowed bg-gray-50 border border-gray-200'
                                    }
                                    ${dateItem.isToday ? 'ring-2 ring-[#899B90] ring-opacity-50' : ''}
                                  `}
                                >
                                  {dateItem.day}
                                </motion.button>
                              );
                            })
                            )}
                          </div>
                          
                          {/* Location 2: Quick select under calendar if date is selected */}
                          {appointmentData.date && (
                            <div className="mt-8">
                              <QuickSelectComponent />
                            </div>
                          )}
                        </div>

                        {/* Right Column: Time Selection or Quick Select */}
                        <div>
                           {appointmentData.date ? (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="flex items-center mb-4">
                                <Clock className="w-5 h-5 text-[#899B90] mr-2" />
                                <h3 className="text-lg font-medium text-gray-900">
                                  Beschikbare tijden voor {(() => {
                                    const [year, month, day] = appointmentData.date.split('-').map(Number);
                                    const date = new Date(year, month - 1, day);
                                    return date.toLocaleDateString('nl-NL', { 
                                      weekday: 'short', 
                                      day: 'numeric', 
                                      month: 'short' 
                                    });
                                  })()}
                                </h3>
                              </div>
                              
                              <div className="relative">
                                <div 
                                  ref={timeSlotsContainerRef}
                                  onScroll={handleTimeSlotsScroll}
                                  className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto scroll-smooth"
                                >
                                  {timeSlots.map((slot) => (
                                    <motion.button
                                      key={slot.time}
                                      type="button"
                                      onClick={() => handleTimeSelect(slot.time)}
                                      disabled={!slot.available}
                                      whileHover={slot.available ? { scale: 1.05 } : {}}
                                      whileTap={slot.available ? { scale: 0.95 } : {}}
                                      className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        appointmentData.time === slot.time
                                          ? 'bg-[#899B90] text-white font-medium'
                                          : slot.available
                                          ? 'text-gray-900 hover:bg-[#899B90] hover:text-white border border-gray-200 hover:border-[#899B90]'
                                          : 'text-gray-400 cursor-not-allowed bg-gray-50 border border-gray-200'
                                      }`}
                                    >
                                      {slot.time}
                                    </motion.button>
                                  ))}
                                </div>
                                
                                {/* Scroll Indicator */}
                                <AnimatePresence>
                                  {showScrollIndicator && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                                    >
                                      {/* Gradient fade */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                                      
                                      {/* Scroll hint */}
                                      <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center">
                                        <motion.div
                                          animate={{ y: [0, 4, 0] }}
                                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                          className="flex flex-col items-center"
                                        >
                                          <span className="text-xs text-gray-500 mb-1 font-medium">Meer tijden</span>
                                          <ChevronDown className="w-4 h-4 text-[#899B90]" />
                                        </motion.div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Next button when time is selected */}
                              {appointmentData.time && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="mt-6"
                                >
                                  <button
                                    onClick={handleNextStep}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#899B90] text-white rounded-xl hover:bg-[#6d7c74] transition-colors duration-200 font-medium cursor-pointer"
                                  >
                                    Volgende
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                  </button>
                                </motion.div>
                              )}
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="w-full"
                            >
                              <QuickSelectComponent />
                            </motion.div>
                          )}
                        </div>

                        {/* Debug Information Toggle - Only show in development */}
                        {process.env.NODE_ENV === 'development' && (
                          <div className="mt-4 flex justify-center lg:col-span-2">
                            <button
                              type="button"
                              onClick={() => setShowDebugInfo(!showDebugInfo)}
                              className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              {showDebugInfo ? 'Hide' : 'Show'} Debug Info
                              <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${showDebugInfo ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                        )}

                        {/* Debug Information Panel - Only show in development */}
                        {process.env.NODE_ENV === 'development' && showDebugInfo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50 lg:col-span-2"
                          >
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Debug Information</h4>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {calendarData
                                .filter(day => day.isCurrentMonth)
                                .map((day) => {
                                  const dayDebugInfo = debugInfo[day.date];
                                  if (!dayDebugInfo) return null;
                                  
                                  return (
                                    <div key={day.date} className="border border-gray-200 rounded p-3 bg-white">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-sm">
                                          {new Date(day.date).toLocaleDateString('nl-NL', { 
                                            weekday: 'short', 
                                            day: 'numeric', 
                                            month: 'short' 
                                          })}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded ${
                                          day.hasAvailability 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                          {day.hasAvailability ? 'Available' : 'Not Available'}
                                        </span>
                                      </div>
                                      
                                      {dayDebugInfo.error ? (
                                        <p className="text-xs text-red-600">{dayDebugInfo.error}</p>
                                      ) : (
                                        <div className="space-y-2 text-xs">
                                          <div>
                                            <span className="font-medium">Day of Week:</span> {dayDebugInfo.dayOfWeek}
                                          </div>
                                          <div>
                                            <span className="font-medium">Base Hours:</span> {dayDebugInfo.baseHoursInfo}
                                          </div>
                                          <div>
                                            <span className="font-medium">Extended Hours:</span> {dayDebugInfo.extendedHours}
                                          </div>
                                          
                                          {dayDebugInfo.vrijEvents && dayDebugInfo.vrijEvents.length > 0 && (
                                            <div>
                                              <span className="font-medium">VRIJ Events:</span>
                                              <ul className="ml-2 mt-1">
                                                {dayDebugInfo.vrijEvents.map((event: any, idx: number) => (
                                                  <li key={idx} className="text-green-600">
                                                    {event.summary} ({typeof event.start === 'string' ? event.start : event.start?.dateTime || 'N/A'} - {typeof event.end === 'string' ? event.end : event.end?.dateTime || 'N/A'})
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                          
                                          {dayDebugInfo.events && dayDebugInfo.events.length > 0 && (
                                            <div>
                                              <span className="font-medium">All Events:</span>
                                              <ul className="ml-2 mt-1 max-h-20 overflow-y-auto">
                                                {dayDebugInfo.events.map((event: any, idx: number) => (
                                                  <li key={idx} className="text-gray-600">
                                                    {event.summary} ({typeof event.start === 'string' ? event.start : event.start?.dateTime || 'N/A'} - {typeof event.end === 'string' ? event.end : event.end?.dateTime || 'N/A'})
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                          
                                          <div>
                                            <span className="font-medium">Available Slots:</span> {dayDebugInfo.slots?.filter((slot: any) => slot.available).length || 0} / {dayDebugInfo.slots?.length || 0}
                                          </div>
                                          
                                          {dayDebugInfo.slots && dayDebugInfo.slots.filter((slot: any) => slot.available).length > 0 && (
                                            <div>
                                              <span className="font-medium">Available Times:</span>
                                              <ul className="ml-2 mt-1">
                                                {dayDebugInfo.slots
                                                  .filter((slot: any) => slot.available)
                                                  .map((slot: any, idx: number) => (
                                                    <li key={idx} className="text-green-600">
                                                      {slot.time}
                                                    </li>
                                                  ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            )}

            {step === 2 && !showSuccessScreen && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex items-center mb-6">
                  <User className="w-6 h-6 text-[#899B90] mr-3" />
                  <h2 className="text-2xl font-light text-gray-900">Uw gegevens</h2>
                </div>

                {/* Appointment Summary */}
                <div className="border border-[#b8c5bb] rounded-xl p-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Uw afspraak</h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>{treatments.find(t => t.value === appointmentData.treatment)?.label}</div>
                    <div>{(() => {
                      const [year, month, day] = appointmentData.date.split('-').map(Number);
                      const date = new Date(year, month - 1, day);
                      return date.toLocaleDateString('nl-NL', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      });
                    })()}</div>
                    <div>{appointmentData.time}</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={appointmentData.name}
                      onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#899B90] focus:border-transparent transition-colors duration-200"
                      placeholder="Uw volledige naam"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={appointmentData.email}
                      onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#899B90] focus:border-transparent transition-colors duration-200"
                      placeholder="uw.email@voorbeeld.nl"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefoonnummer *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={appointmentData.phone}
                      onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#899B90] focus:border-transparent transition-colors duration-200"
                      placeholder="06 - 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Vraag of klachtomschrijving
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={appointmentData.message}
                      onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#899B90] focus:border-transparent transition-colors duration-200 resize-vertical"
                      placeholder="Beschrijf kort uw klacht of vraag..."
                    />
                  </div>

                  <div className="bg-[#FFFFFF] rounded-xl p-4">
                    <p className="text-sm text-gray-600">
                      <strong>Let op:</strong> Dit is een aanvraag. Kim zal contact met u opnemen om de afspraak te bevestigen.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        onStepChange?.(1); // Notify parent component about step change
                      }}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium cursor-pointer"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Terug
                    </button>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-[#899B90] text-white rounded-xl hover:bg-[#6d7c74] transition-colors duration-200 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Aanvragen...' : 'Afspraak aanvragen'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Success Screen */}
            {showSuccessScreen && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-12"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center max-w-md"
                >
                  <h2 className="text-3xl font-light text-gray-900 mb-4">
                    Afspraak aangevraagd!
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Bedankt voor uw aanvraag. Kim zal zo spoedig mogelijk contact met u opnemen om de afspraak te bevestigen.
                  </p>

                  {/* Appointment Details */}
                  <div className="bg-[#FFFFFF] rounded-xl p-6 mb-8 text-left">
                    <h3 className="font-medium text-gray-900 mb-3">Uw afspraakgegevens</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Behandeling:</span>
                        <span className="font-medium">{treatments.find(t => t.value === appointmentData.treatment)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Datum:</span>
                        <span className="font-medium">
                          {(() => {
                            const [year, month, day] = appointmentData.date.split('-').map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.toLocaleDateString('nl-NL', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            });
                          })()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tijd:</span>
                        <span className="font-medium">{appointmentData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Naam:</span>
                        <span className="font-medium">{appointmentData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">E-mail:</span>
                        <span className="font-medium">{appointmentData.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Back to Start Button */}
                  <button
                    onClick={handleBackToStart}
                    className="inline-flex items-center px-8 py-3 bg-[#899B90] text-white rounded-xl hover:bg-[#6d7c74] transition-colors duration-200 font-medium shadow-sm"
                  >
                    Nieuwe afspraak maken
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
