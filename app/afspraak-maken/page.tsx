"use client";

import { useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import AppointmentBooking from "@/components/appointment-booking";

export default function AfspraakMakenPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <main className="min-h-screen">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Appointment Booking Form */}
          <div className="mb-12">
            <AppointmentBooking onStepChange={handleStepChange} />
          </div>

        </div>
      </section>
    </main>
  );
}
