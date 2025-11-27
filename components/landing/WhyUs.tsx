import { Award, Heart, Shield, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Design Premium",
    description: "Template-uri create de designeri profesioniști, elegant și modern",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Creat cu Dragoste",
    description: "Înțelegem importanța momentelor tale speciale și ne pasă de fiecare detaliu",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Securitate Garantată",
    description: "Datele tale sunt protejate cu cele mai moderne tehnologii de securitate",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Headphones,
    title: "Suport Non-Stop",
    description: "Echipa noastră este disponibilă 24/7 pentru a te ajuta cu orice întrebare",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              De Ce
            </span>{" "}
            <span className="text-gray-800">Weday?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Suntem mai mult decât o platformă - suntem partenerii tăi în crearea momentelor memorabile
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>

              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${reason.gradient} mb-6`}>
                  <reason.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Alătură-te celor 500+ clienți mulțumiți!</h3>
          <p className="text-xl mb-8 opacity-90">
            Peste 10,000 de invitați au primit invitații create cu Weday
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/auth/register"
              className="bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Creează Invitația Ta
            </a>
            <a
              href="#templates"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Vezi Exemple
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
