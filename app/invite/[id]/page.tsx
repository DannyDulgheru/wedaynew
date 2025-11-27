"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Heart, CheckCircle, XCircle } from "lucide-react";

export default function PublicInvitationPage() {
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    status: "ATTENDING" as "ATTENDING" | "NOT_ATTENDING" | "MAYBE",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement RSVP submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative text-center px-4">
          <div className="mb-8">
            <Heart className="h-20 w-20 text-rose-500 mx-auto mb-6" fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-4">
            <span className="text-gray-800">Ana</span>
            <span className="text-rose-500 mx-4">&</span>
            <span className="text-gray-800">Mihai</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8">
            Vă invită la nunta lor
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-gray-700">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-rose-500" />
              <span className="font-semibold">15 Iunie 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-rose-500" />
              <span className="font-semibold">17:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Event Details */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold font-playfair text-gray-800 mb-6 text-center">
            Detalii Eveniment
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Data & Ora</div>
                <p className="text-gray-600">
                  Sâmbătă, 15 Iunie 2024 • 17:00
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Locația</div>
                <p className="text-gray-600 mb-2">
                  Restaurant "La Taifas"<br />
                  Str. Ștefan cel Mare 123, Chișinău
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-500 hover:text-rose-600 font-semibold text-sm"
                >
                  Vezi pe hartă →
                </a>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold font-playfair text-gray-800 mb-4">
              Povestea Noastră
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Ne-am întâlnit acum 5 ani într-o seară de vară magică. De atunci, fiecare zi
              împreună a fost o aventură plină de dragoste, râsete și amintiri frumoase. 
              Vrem să împărtășim această bucurie cu voi, cei mai dragi oameni din viața noastră!
            </p>
          </div>
        </div>

        {/* RSVP Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold font-playfair text-gray-800 mb-2 text-center">
            Confirmă Prezența
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Te așteptăm cu drag! Te rugăm să confirmi participarea până pe 1 Iunie
          </p>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Mulțumim pentru confirmare!
              </h3>
              <p className="text-gray-600">
                Ne bucurăm că vei fi alături de noi în această zi specială!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nume Complet *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpForm.name}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  placeholder="Ion Popescu"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={rsvpForm.email}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  placeholder="ion@email.md"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={rsvpForm.phone}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  placeholder="+373 60 123 456"
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Număr de Persoane
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rsvpForm.guests}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Voi participa *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setRsvpForm({ ...rsvpForm, status: "ATTENDING" })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      rsvpForm.status === "ATTENDING"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-green-300"
                    }`}
                  >
                    <CheckCircle
                      className={`h-6 w-6 mx-auto mb-2 ${
                        rsvpForm.status === "ATTENDING" ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <div className="text-sm font-semibold">Da, vin</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRsvpForm({ ...rsvpForm, status: "MAYBE" })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      rsvpForm.status === "MAYBE"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300 hover:border-yellow-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">🤔</div>
                    <div className="text-sm font-semibold">Poate</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRsvpForm({ ...rsvpForm, status: "NOT_ATTENDING" })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      rsvpForm.status === "NOT_ATTENDING"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-red-300"
                    }`}
                  >
                    <XCircle
                      className={`h-6 w-6 mx-auto mb-2 ${
                        rsvpForm.status === "NOT_ATTENDING" ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                    <div className="text-sm font-semibold">Nu pot veni</div>
                  </button>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mesaj pentru Miri (Opțional)
                </label>
                <textarea
                  rows={4}
                  value={rsvpForm.message}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
                  placeholder="Lasă un mesaj frumos pentru miri..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Confirmă Prezența
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="mb-2">Cu drag,</p>
          <p className="text-2xl font-playfair font-bold text-gray-800">Ana & Mihai</p>
          <div className="mt-8 text-sm">
            <p>
              Creat cu{" "}
              <Heart className="inline h-4 w-4 text-rose-500" fill="currentColor" />{" "}
              de{" "}
              <a href="/" className="text-rose-500 hover:text-rose-600 font-semibold">
                WedayInvite
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
