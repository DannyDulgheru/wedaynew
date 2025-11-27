"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Simulate success
      setIsSuccess(true);
    } catch (err) {
      setError("A apărut o eroare. Vă rugăm încercați din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email trimis cu succes!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Am trimis instrucțiuni de resetare a parolei la <strong>{email}</strong>. 
              Vă rugăm verificați inbox-ul și spam-ul.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💡 Sfat:</strong> Linkul de resetare este valabil 1 oră. 
                Dacă nu primiți emailul în 5 minute, verificați folderul spam.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="block w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-purple-700 transition-all"
              >
                Înapoi la Login
              </Link>
              
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                className="block w-full px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all"
              >
                Trimite alt email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Back Button */}
          <Link
            href="/auth/login"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Înapoi</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Resetare Parolă
            </h1>
            <p className="text-gray-600">
              Introduceți adresa de email și vă vom trimite instrucțiuni pentru resetarea parolei
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Adresa de Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="numele@exemplu.md"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Se trimite...</span>
                </>
              ) : (
                <span>Trimite Link de Resetare</span>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Vă amintiți parola?{" "}
              <Link
                href="/auth/login"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Conectați-vă aici
              </Link>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Aveți probleme? Contactați-ne la{" "}
            <a href="mailto:support@weday.md" className="text-purple-600 hover:underline">
              support@weday.md
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
