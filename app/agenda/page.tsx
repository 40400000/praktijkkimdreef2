'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAppointments, markAppointmentAsTransferred, unmarkAppointmentAsTransferred, type AppointmentWithTreatment } from '@/lib/actions/agenda';

const CORRECT_PASSWORD = '#Kirwan21';

export default function AgendaPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [appointments, setAppointments] = useState<AppointmentWithTreatment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated in session storage
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('agenda_authenticated') === 'true';
      if (isAuth) {
        setIsAuthenticated(true);
        loadAppointments();
      }
    }
  }, []);

  async function loadAppointments() {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setLoading(false);
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('agenda_authenticated', 'true');
      setError('');
      loadAppointments();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  }

  async function handleMarkAsTransferred(appointmentId: number) {
    try {
      await markAppointmentAsTransferred(appointmentId);
      await loadAppointments();
    } catch (error) {
      console.error('Failed to mark appointment:', error);
    }
  }

  async function handleUnmark(appointmentId: number) {
    try {
      await unmarkAppointmentAsTransferred(appointmentId);
      await loadAppointments();
    } catch (error) {
      console.error('Failed to unmark appointment:', error);
    }
  }

  function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('nl-NL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function formatTransferDate(date: Date): string {
    return new Date(date).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Split appointments into pending and transferred
  const pendingAppointments = appointments.filter(a => !a.transferredToCms);
  const transferredAppointments = appointments.filter(a => a.transferredToCms);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-light text-gray-900 mb-2">Agenda beheer</h1>
            <p className="text-gray-600">Voer wachtwoord in om toegang te krijgen</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wachtwoord"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#899B90] transition-all"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#899B90] text-white py-3 rounded-xl hover:bg-[#6d7c74] transition-colors duration-200 font-medium"
            >
              Inloggen
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2">Afspraken beheer</h1>
              <p className="text-gray-600">Beheer en transfer afspraken naar CMS</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Te verwerken: {pendingAppointments.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-gray-600">Verwerkt: {transferredAppointments.length}</span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#899B90]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pending Appointments */}
            {pendingAppointments.length > 0 && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Te verwerken</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {pendingAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onMarkTransferred={handleMarkAsTransferred}
                        onUnmark={handleUnmark}
                        formatDate={formatDate}
                        formatTransferDate={formatTransferDate}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Transferred Appointments */}
            {transferredAppointments.length > 0 && (
              <div>
                <h2 className="text-xl font-medium text-gray-400 mb-4">Verwerkt</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {transferredAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onMarkTransferred={handleMarkAsTransferred}
                        onUnmark={handleUnmark}
                        formatDate={formatDate}
                        formatTransferDate={formatTransferDate}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {appointments.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Geen afspraken gevonden</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface AppointmentCardProps {
  appointment: AppointmentWithTreatment;
  onMarkTransferred: (id: number) => void;
  onUnmark: (id: number) => void;
  formatDate: (date: string) => string;
  formatTransferDate: (date: Date) => string;
}

function AppointmentCard({ appointment, onMarkTransferred, onUnmark, formatDate, formatTransferDate }: AppointmentCardProps) {
  const isTransferred = appointment.transferredToCms;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 ${
        isTransferred ? 'opacity-60' : ''
      }`}
    >
      {/* Date Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
          isTransferred ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'
        }`}>
          {formatDate(appointment.appointmentDate)}
        </div>
        <div className="text-sm font-medium text-gray-900">{appointment.appointmentTime}</div>
      </div>

      {/* Client Info */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{appointment.clientName}</h3>
        <p className="text-sm text-gray-600 mb-1">{appointment.clientEmail}</p>
        <p className="text-sm text-gray-600">{appointment.clientPhone}</p>
      </div>

      {/* Treatment */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Behandeling</div>
        <div className="text-sm font-medium text-gray-900">
          {appointment.treatment?.label || 'Onbekend'}
        </div>
        <div className="text-xs text-gray-500 mt-1">{appointment.duration} minuten</div>
      </div>

      {/* Message if exists */}
      {appointment.message && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Bericht</div>
          <p className="text-sm text-gray-700">{appointment.message}</p>
        </div>
      )}

      {/* Transfer Info */}
      {isTransferred && appointment.transferredAt && (
        <div className="mb-4 text-xs text-gray-500">
          Verwerkt op {formatTransferDate(appointment.transferredAt)}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        {!isTransferred ? (
          <>
            <button
              onClick={() => onMarkTransferred(appointment.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Verwerkt
            </button>
            {/* Optional: Add a dismiss button if needed
            <button
              onClick={() => onUnmark(appointment.id)}
              className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            */}
          </>
        ) : (
          <button
            onClick={() => onUnmark(appointment.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Ongedaan maken
          </button>
        )}
      </div>
    </motion.div>
  );
}






