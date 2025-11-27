"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  X,
  Check,
  Clock,
  DollarSign,
  Leaf,
  BarChart,
  Mail,
  Smartphone,
  Zap,
  Heart,
} from "lucide-react";

export default function Hero() {
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    // Show comparison table after 1 second
    const timer = setTimeout(() => setShowComparison(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <Sparkles className="h-5 w-5 text-rose-500" />
            <span className="text-sm font-medium text-gray-700">
              Cele mai elegante invitații digitale
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair mb-6 leading-tight">
            <span className="bg-gradient-to-r from-rose-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Invitații Digitale
            </span>
            <br />
            <span className="text-gray-800">vs Tradiționale</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Descoperă avantajele invitațiilor online: economisești timp și bani, protejezi mediul
            și ai control total asupra evenimentului tău.
          </p>
        </div>

        {/* Split-Screen Comparison */}
        <div
          className={`grid lg:grid-cols-2 gap-8 mb-12 transition-all duration-1000 transform ${
            showComparison
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Traditional Invitations - Left Side */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                📨 Invitații Tradiționale
              </h3>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <X className="h-6 w-6 text-red-600" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-600">
                <Clock className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Timp îndelungat</div>
                  <div className="text-sm">Design, tipărire, distribuire (2-4 săptămâni)</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-600">
                <DollarSign className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Cost ridicat</div>
                  <div className="text-sm">2,000-10,000 MDL (design, print, livrare)</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-600">
                <Leaf className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Impact asupra mediului</div>
                  <div className="text-sm">Hârtie, cerneală, transport = deșeuri</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-600">
                <BarChart className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Fără tracking</div>
                  <div className="text-sm">Nu știi cine a primit sau a citit invitația</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-600">
                <Mail className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Greu de actualizat</div>
                  <div className="text-sm">Modificări = retipărire și redistribuire</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-600">
                <Smartphone className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">RSVP manual</div>
                  <div className="text-sm">Telefoane, mesaje, evidență pe hârtie</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center text-red-600 font-bold text-lg">
                ❌ Costisitor și complicat
              </div>
            </div>
          </div>

          {/* Digital Invitations - Right Side */}
          <div className="bg-gradient-to-br from-rose-500 to-purple-600 rounded-3xl p-8 shadow-2xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">💎 Invitații Digitale Weday</h3>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Rapid și instant</div>
                  <div className="text-sm opacity-90">
                    Creează și distribuie în 10 minute
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Preț fix accesibil</div>
                  <div className="text-sm opacity-90">
                    Doar 999 MDL - economisești până la 90%
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Leaf className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">100% Eco-Friendly</div>
                  <div className="text-sm opacity-90">
                    Zero hârtie, zero deșeuri, salvează natura
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <BarChart className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Statistici în timp real</div>
                  <div className="text-sm opacity-90">
                    Vezi cine a deschis, RSVP instant, analytics
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Actualizări instant</div>
                  <div className="text-sm opacity-90">
                    Modifici oricând fără costuri suplimentare
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Smartphone className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">RSVP automat</div>
                  <div className="text-sm opacity-90">
                    Invitații confirmă online, lista se actualizează
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="text-center font-bold text-lg flex items-center justify-center space-x-2">
                <Heart className="h-6 w-6" fill="currentColor" />
                <span>✨ Smart, modern și eficient</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/auth/register"
            className="group bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Începe Acum - 999 MDL</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#templates"
            className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all border-2 border-gray-200 hover:border-rose-300"
          >
            Vezi Template-uri
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-500 transform ${
            showComparison
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-rose-500 mb-2">500+</div>
            <div className="text-gray-600 text-sm">Evenimente Create</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-500 mb-2">16+</div>
            <div className="text-gray-600 text-sm">Template-uri</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-pink-500 mb-2">98%</div>
            <div className="text-gray-600 text-sm">Clienți Mulțumiți</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-rose-500 mb-2">90%</div>
            <div className="text-gray-600 text-sm">Economii vs Tradiționale</div>
          </div>
        </div>
      </div>
    </section>
  );
}
