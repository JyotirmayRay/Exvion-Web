"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@exvion/ui";
import * as Papa from "papaparse";
import { api } from "@/lib/api";

interface ImportLeadsProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ImportLeads = ({ onClose, onSuccess }: ImportLeadsProps) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [importResults, setImportResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      parseFile(selectedFile);
    }
  };

  const parseFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPreviewData(results.data.slice(0, 5));
        setStep(2);
      },
      error: (err) => {
        alert("Error parsing CSV: " + err.message);
      }
    });
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await api.importLeads(file);
      setImportResults(result);
      setStep(3);
      onSuccess();
    } catch (err) {
      alert("Import failed: " + (err as any).message);
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const headers = ["name", "email", "phone", "company", "serviceType", "budget", "description"];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\nJohn Doe,john@example.com,+1234567890,ACME Corp,SaaS MVP,10k-50k,Initial import testing";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exvion_leads_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        className="relative w-full max-w-2xl glass rounded-t-3xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Import Leads</h2>
            <p className="text-text-muted text-xs mt-1 uppercase font-bold tracking-widest">
              Step {step} of 3
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Icon name="close" size={20} className="text-text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-brand-primary/50 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="import" size={32} className="text-brand-primary" />
                  </div>
                  <p className="text-white font-bold text-lg">Upload CSV File</p>
                  <p className="text-text-muted text-sm mt-2">Drag and drop or click to browse</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept=".csv" 
                    className="hidden" 
                  />
                </div>

                <div className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Icon name="export" size={18} className="text-text-muted" />
                    <div>
                      <p className="text-white text-sm font-bold">Download Template</p>
                      <p className="text-text-muted text-[10px]">Use this format for error-free imports</p>
                    </div>
                  </div>
                  <button onClick={downloadTemplate} className="text-brand-primary text-xs font-bold uppercase tracking-widest hover:underline">
                    Download
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                          {Object.keys(previewData[0] || {}).map(header => (
                            <th key={header} className="p-3 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, i) => (
                          <tr key={i} className="border-b border-white/5 last:border-0">
                            {Object.values(row).map((val: any, j) => (
                              <td key={j} className="p-3 text-xs text-text-secondary truncate max-w-[150px]">
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-3">
                  <Icon name="notification" size={18} className="text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-blue-200 text-xs leading-relaxed">
                    Showing top 5 rows for preview. System will automatically map columns based on headers. Emails will be used for duplicate detection.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleImport}
                    disabled={loading}
                    className="flex-[2] btn-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-glow"
                  >
                    {loading ? (
                      <Icon name="refresh" size={18} className="animate-spin" />
                    ) : (
                      <Icon name="check" size={18} />
                    )}
                    Import Now
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Icon name="check" size={40} className="text-green-400" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-white italic">Import Complete</h3>
                  <p className="text-text-muted text-sm mt-1">Found {importResults?.duplicates || 0} duplicates and {importResults?.errors || 0} errors.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="glass p-4 rounded-2xl border border-white/5">
                    <p className="text-green-400 text-2xl font-bold">{importResults?.imported || 0}</p>
                    <p className="text-text-muted text-[10px] uppercase font-bold mt-1">Imported</p>
                  </div>
                  <div className="glass p-4 rounded-2xl border border-white/5">
                    <p className="text-blue-400 text-2xl font-bold">{importResults?.duplicates || 0}</p>
                    <p className="text-text-muted text-[10px] uppercase font-bold mt-1">Skipped</p>
                  </div>
                  <div className="glass p-4 rounded-2xl border border-white/5">
                    <p className="text-red-400 text-2xl font-bold">{importResults?.errors || 0}</p>
                    <p className="text-text-muted text-[10px] uppercase font-bold mt-1">Errors</p>
                  </div>
                </div>

                {importResults?.errorDetails?.length > 0 && (
                  <div className="text-left text-[10px] text-red-400/70 max-h-[100px] overflow-y-auto p-3 glass rounded-xl border border-red-500/10">
                    <p className="font-bold uppercase tracking-widest mb-1 italic">Error Log:</p>
                    {importResults.errorDetails.map((err: string, i: number) => (
                      <p key={i}>• {err}</p>
                    ))}
                  </div>
                )}

                <button 
                  onClick={onClose}
                  className="w-full btn-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  Close & View Leads
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
