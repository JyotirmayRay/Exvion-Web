"use client";

import { useState, useEffect } from "react";
import { Icon, Button, Card, Input } from "@exvion/ui";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [googleJson, setGoogleJson] = useState("");
  const [calendarId, setCalendarId] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.getSettings();
      const jsonSetting = data.find((s: any) => s.key === "GOOGLE_SERVICE_ACCOUNT_JSON");
      const calendarSetting = data.find((s: any) => s.key === "GOOGLE_CALENDAR_ID");
      
      if (jsonSetting) setGoogleJson(jsonSetting.value);
      if (calendarSetting) setCalendarId(calendarSetting.value);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      if (googleJson) await api.setSetting("GOOGLE_SERVICE_ACCOUNT_JSON", googleJson);
      if (calendarId) await api.setSetting("GOOGLE_CALENDAR_ID", calendarId);
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Platform Settings</h1>
        <p className="text-text-secondary text-sm">Configure integrations and system preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card className="overflow-hidden" hover={false}>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <Icon name="calendar" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Google Calendar Integration</h3>
                <p className="text-sm text-text-secondary">Automate Google Meet links for booked sessions.</p>
              </div>
            </div>

            {loading ? (
              <div className="h-40 animate-pulse bg-white/5 rounded-xl block" />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Google Calendar ID (Admin Email)
                  </label>
                  <Input 
                    value={calendarId} 
                    onChange={(e: any) => setCalendarId(e.target.value)} 
                    placeholder="e.g. founder@exvionglobal.com" 
                  />
                  <p className="text-[10px] text-text-muted">The exact email address for the calendar where events will be created. The Service Account must be shared with this calendar with "Make changes to events" permissions.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Service Account JSON
                  </label>
                  <textarea 
                    value={googleJson} 
                    onChange={(e: any) => setGoogleJson(e.target.value)} 
                    placeholder="{&#10;  &#34;type&#34;: &#34;service_account&#34;,&#10;  ...&#10;}" 
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-primary/50 focus:outline-none transition-colors font-mono resize-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                  <p className="text-[10px] text-text-muted">Paste the entire JSON credentials file for your Google Cloud Service Account.</p>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button 
                    onClick={saveSettings} 
                    disabled={saving}
                    className="bg-brand-primary text-black font-black uppercase tracking-wider text-xs px-6 py-3 h-auto"
                  >
                    {saving ? "Saving..." : "Save Google Settings"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
