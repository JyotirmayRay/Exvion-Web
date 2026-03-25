"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { 
  Icon, 
  Button,
  Card 
} from "@exvion/ui";
import { StatusBadge } from "@/components/leads/StatusBadge";
import { api } from "@/lib/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await api.getBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Scheduled Sessions</h1>
          <p className="text-text-secondary text-sm">Manage your upcoming strategy calls.</p>
        </div>
        <Button onClick={fetchBookings} className="bg-white/5 border border-white/10 hover:bg-white/10">
          <Icon name="refresh" size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
          ))
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden group hover:border-brand-primary/30 transition-all" hover={false}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex flex-col items-center justify-center text-brand-primary border border-brand-primary/20">
                    <span className="text-[10px] font-black uppercase leading-none mb-1">{format(parseISO(booking.startTime), "MMM")}</span>
                    <span className="text-lg font-black leading-none">{format(parseISO(booking.startTime), "dd")}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">
                      {booking.lead.name}
                    </h3>
                    <div className="flex items-center gap-3 text-text-secondary text-sm mt-1">
                      <span className="flex items-center gap-1">
                        <Icon name="clock" size={14} />
                        {format(parseISO(booking.startTime), "h:mm a")} - {format(parseISO(booking.endTime), "h:mm a")}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-brand-primary font-medium">{booking.lead.serviceType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-text-muted mb-1 font-black uppercase tracking-tighter opacity-40">Status</p>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="h-10 w-[1px] bg-white/5 hidden md:block" />
                  <Button className="bg-white/5 hover:bg-white/10 text-white text-xs py-2 px-4 h-auto">
                    View Lead
                  </Button>
                  <Button 
                    className="bg-brand-primary text-black font-black text-xs py-2 px-4 h-auto uppercase tracking-wider shadow-glow"
                    onClick={() => {
                      if (booking.meetLink) {
                        window.open(booking.meetLink, "_blank");
                      } else {
                        alert("No Meet link generated yet. You can still join a manual link or wait for the Google Calendar integration.");
                      }
                    }}
                  >
                    Join Meet
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-text-muted">
              <Icon name="calendar" size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No bookings found</h3>
            <p className="text-text-secondary text-sm">When clients schedule calls, they'll appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
