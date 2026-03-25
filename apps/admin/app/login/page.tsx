"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center 
      justify-center p-4">

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 
        w-96 h-96 bg-brand-primary/8 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative"
      >
        <div className="text-center mb-8">
          <img 
            src="/logo.webp" 
            alt="Exvion" 
            className="h-16 w-auto mx-auto mb-6" 
          />
          <p className="text-text-muted text-sm mt-1">
            Lead Intelligence Panel
          </p>
        </div>

        <form onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 border border-white/8 
            shadow-glass space-y-5">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 
              rounded-xl p-3 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-text-muted text-xs font-medium 
              uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@exvionglobal.com"
              required
              className="w-full glass rounded-xl p-4 text-white text-sm
                placeholder:text-text-muted border border-white/8
                focus:border-brand-primary/40 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-text-muted text-xs font-medium 
              uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full glass rounded-xl p-4 text-white text-sm
                placeholder:text-text-muted border border-white/8
                focus:border-brand-primary/40 focus:outline-none transition-all"
            />
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full py-4 rounded-xl justify-center
              text-base shadow-glow disabled:opacity-50">
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-4 h-4 border-2 border-white 
                  border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : "Sign In →"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
