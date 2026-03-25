"use client";

import { useState } from "react";
import { FormField as FormFieldType } from "@exvion/types";

interface FormFieldProps {
  field: FormFieldType;
  value: string | string[];
  error?: string;
  onChange: (id: string, value: string | string[]) => void;
  accentColor: string;
}

export function FormField({ field, value, error, onChange, accentColor }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false); // For select

  const safeValue = value || (field.type === "multiselect" ? [] : "");

  const handleMultiselect = (optionVal: string) => {
    const currentList = Array.isArray(safeValue) ? [...safeValue] : [];
    if (currentList.includes(optionVal)) {
      onChange(field.id, currentList.filter(v => v !== optionVal));
    } else {
      onChange(field.id, [...currentList, optionVal]);
    }
  };

  const hasError = !!error;

  return (
    <div className="mb-6 w-full">
      <label className="block text-sm font-semibold text-white mb-1">
        {field.label} {field.required && <span className="text-red-400">*</span>}
      </label>
      {field.sublabel && (
        <p className="text-xs text-white/50 mb-3 leading-relaxed">{field.sublabel}</p>
      )}

      {/* TEXT / EMAIL / PHONE / URL / NUMBER */}
      {["text", "email", "phone", "url", "number"].includes(field.type) && (
        <div className="relative">
          {field.type === "phone" && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">+91</span>
          )}
          <input
            type={field.type === "phone" ? "tel" : field.type}
            value={safeValue as string}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder || "Your answer..."}
            className={`w-full bg-white/5 border ${hasError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all ${field.type === 'phone' ? 'pl-12' : ''}`}
            style={{
              outlineColor: accentColor,
              boxShadow: safeValue ? `0 0 0 1px ${accentColor}40` : '',
            }}
          />
        </div>
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <div className="relative">
          <textarea
            value={safeValue as string}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder || "Type your detailed answer..."}
            rows={4}
            className={`w-full bg-white/5 border ${hasError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all resize-y`}
            style={{
              outlineColor: accentColor,
              boxShadow: safeValue ? `0 0 0 1px ${accentColor}40` : '',
            }}
          />
          {field.minLength && (
            <p className="text-[10px] text-white/30 text-right mt-1 font-medium">
              {(safeValue as string).length} / {field.minLength} min chars
            </p>
          )}
        </div>
      )}

      {/* CUSTOM SELECT */}
      {field.type === "select" && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between bg-white/5 border ${hasError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-left transition-all hover:bg-white/10`}
            style={{
              borderColor: isOpen ? accentColor : undefined,
              boxShadow: safeValue && !isOpen ? `0 0 0 1px ${accentColor}40` : '',
            }}
          >
            <span className={safeValue ? "text-white font-medium" : "text-white/40"}>
              {safeValue ? field.options?.find(o => o.value === safeValue)?.label : field.placeholder || "Choose an option..."}
            </span>
            <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-white/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#1a1c23]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[50] overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
              <div className="py-2">
                {field.options?.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(field.id, opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${safeValue === opt.value ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    style={{ color: safeValue === opt.value ? accentColor : undefined }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* RADIO CARDS */}
      {field.type === "radio" && (
        <div className="flex flex-col gap-2">
          {field.options?.map((opt) => {
            const isSelected = safeValue === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(field.id, opt.value)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border flex items-center justify-between transition-all duration-200
                  ${isSelected ? 'bg-white/5 shadow-lg' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 text-white/70 hover:text-white'}
                  ${hasError && !isSelected ? 'border-red-500/50' : ''}
                `}
                style={{ 
                  borderColor: isSelected ? accentColor : undefined,
                  backgroundColor: isSelected ? `${accentColor}10` : undefined,
                  color: isSelected ? '#fff' : undefined,
                }}
              >
                <span className="font-medium text-sm">{opt.label}</span>
                <div 
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-transparent' : 'border-white/20'}`}
                  style={{ backgroundColor: isSelected ? accentColor : 'transparent' }}
                >
                  {isSelected && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* MULTISELECT CARDS */}
      {field.type === "multiselect" && (
        <div className="flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Select all that apply</p>
          {field.options?.map((opt) => {
            const isSelected = Array.isArray(safeValue) && safeValue.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleMultiselect(opt.value)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border flex items-center justify-between transition-all duration-200
                  ${isSelected ? 'bg-white/5 shadow-lg' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 text-white/70 hover:text-white'}
                  ${hasError && !isSelected && (!Array.isArray(safeValue) || safeValue.length === 0) ? 'border-red-500/50' : ''}
                `}
                style={{ 
                  borderColor: isSelected ? accentColor : undefined,
                  backgroundColor: isSelected ? `${accentColor}10` : undefined,
                  color: isSelected ? '#fff' : undefined,
                }}
              >
                <span className="font-medium text-sm">{opt.label}</span>
                <div 
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-transparent' : 'border-white/20'}`}
                  style={{ backgroundColor: isSelected ? accentColor : 'transparent' }}
                >
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {hasError && (
        <p className="text-red-400 text-xs font-medium mt-2 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
