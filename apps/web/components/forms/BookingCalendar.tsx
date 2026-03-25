"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isSameDay, parseISO } from "date-fns";
import { useFormStore } from "@/store/useFormStore";

interface Slot {
  start: string;
  end: string;
}

export function BookingCalendar({ accentColor, serviceTitle }: { accentColor: string; serviceTitle: string }) {
  const { leadId, closeModal } = useFormStore();
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "confirmed">("idle");

  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i + 1));

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/available?date=${selectedDate.toISOString()}`);
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !leadId) return;
    setBookingStatus("submitting");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          startTime: selectedSlot.start,
          startTimeEnd: selectedSlot.end,
        }),
      });
      if (res.ok) {
        setBookingStatus("confirmed");
      } else {
        setBookingStatus("idle");
      }
    } catch (err) {
      console.error("Booking failed", err);
      setBookingStatus("idle");
    }
  };

  if (bookingStatus === "confirmed") {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 rounded-full bg-green-500/10 border-4 border-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
        <p className="text-white/60 mb-8">A calendar invite has been sent to your email.</p>
        <button onClick={closeModal} className="px-8 py-3 rounded-xl font-bold text-black" style={{ backgroundColor: accentColor }}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 ">
        <h3 className="text-2xl font-bold text-white mb-2">Schedule Strategy Session</h3>
        <p className="text-white/60">Choose a convenient time for your {serviceTitle} blueprint call.</p>
      </div>

      {/* Date Picker */}
      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar mb-8">
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className={`flex flex-col items-center justify-center min-w-[80px] p-4 rounded-2xl border transition-all
              ${isSameDay(date, selectedDate) 
                ? "bg-white/10 border-white/20 text-white" 
                : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"}`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest mb-1">{format(date, "EEE")}</span>
            <span className="text-lg font-bold">{format(date, "d")}</span>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="col-span-full py-10 flex justify-center">
              <div className="w-6 h-6 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
            </div>
          ) : slots.length > 0 ? (
            slots.map((slot) => (
              <button
                key={slot.start}
                onClick={() => setSelectedSlot(slot)}
                className={`p-4 rounded-xl border text-sm font-bold transition-all
                  ${selectedSlot?.start === slot.start 
                    ? "bg-white text-black border-white" 
                    : "bg-white/5 border-white/10 text-white hover:border-white/20"}`}
              >
                {format(parseISO(slot.start), "h:mm a")}
              </button>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-white/40 font-medium">
              No available slots for this day.
            </div>
          )}
        </AnimatePresence>
      </div>

      <button
        disabled={!selectedSlot || !leadId || bookingStatus === "submitting"}
        onClick={handleBooking}
        className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
        style={{ backgroundColor: accentColor }}
      >
        {bookingStatus === "submitting" ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
