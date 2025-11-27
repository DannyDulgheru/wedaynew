import { UserPlus, Palette, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Creează Cont",
    description: "Înregistrează-te rapid și alege pachetul de 999 MDL",
    step: "01",
  },
  {
    icon: Palette,
    title: "Personalizează",
    description: "Alege template-ul preferat și customizează-l după preferințe",
    step: "02",
  },
  {
    icon: Send,
    title: "Trimite Invitația",
    description: "Primești un link unic pe care îl poți distribui oricui",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Primește RSVP",
    description: "Urmărește confirmările de participare în timp real",
    step: "04",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            <span className="text-gray-800">Cum</span>{" "}
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Funcționează
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            4 pași simpli până la invitația perfectă
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-rose-300 to-purple-300 z-0"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-purple-50 mb-6">
                  <step.icon className="h-8 w-8 text-rose-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/auth/register"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            <span>Începe Acum</span>
          </a>
        </div>
      </div>
    </section>
  );
}
