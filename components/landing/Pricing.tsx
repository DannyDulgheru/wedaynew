import { Check, Sparkles } from "lucide-react";

const features = [
  "Template personalizabil",
  "Link public unic",
  "Sistem RSVP integrat",
  "Design responsive (mobile-friendly)",
  "Editare nelimitată",
  "Suport 24/7",
  "Galerie foto",
  "Informații despre eveniment",
  "Hartă locație",
  "Export listă invitați (CSV)",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Un Singur Pachet
            </span>
            <br />
            <span className="text-gray-800">Toate Funcțiile</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simplitate și transparență - fără costuri ascunse
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative">
            {/* Popular Badge */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold">Cea Mai Bună Ofertă</span>
              </div>
            </div>

            {/* Card */}
            <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-rose-200">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                    999
                  </span>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-700">MDL</div>
                    <div className="text-sm text-gray-500">pachet complet</div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  Plată unică • Fără abonamente • Fără surprize
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="/auth/register"
                className="block w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-center py-4 rounded-full text-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Cumpără Acum
              </a>

              {/* Trust */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  ✓ Plată securizată • ✓ Suport instant • ✓ Satisfacție garantată
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Quick */}
        <div className="mt-16 max-w-2xl mx-auto bg-gradient-to-r from-rose-100 to-purple-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Întrebări Frecvente despre Preț
          </h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800 mb-2">
                Există costuri suplimentare?
              </p>
              <p className="text-gray-600">
                Nu! 999 MDL este prețul final pentru toate funcțiile incluse.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">
                Cât timp este valabil pachetul?
              </p>
              <p className="text-gray-600">
                Pachetul este valabil pe durata evenimentului tău, plus 30 de zile
                pentru descărcarea datelor RSVP.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">
                Pot crea mai multe invitații?
              </p>
              <p className="text-gray-600">
                Fiecare pachet este pentru un eveniment. Pentru mai multe evenimente,
                vei avea nevoie de pachete separate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
