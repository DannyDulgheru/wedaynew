import { Palette, Zap, Share2, Users, Lock, Smartphone } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Personalizare Completă",
    description: "Editează culori, texte, fonturi și imagini exact cum îți dorești",
    color: "rose",
  },
  {
    icon: Zap,
    title: "Creare Rapidă",
    description: "Creează invitația în doar câteva minute cu editorul nostru intuitiv",
    color: "purple",
  },
  {
    icon: Share2,
    title: "Share Instant",
    description: "Trimite link-ul unic invitației tale pe WhatsApp, Email sau Social Media",
    color: "pink",
  },
  {
    icon: Users,
    title: "Sistem RSVP",
    description: "Primește confirmări de participare direct în panoul tău",
    color: "rose",
  },
  {
    icon: Lock,
    title: "Securitate",
    description: "Datele tale sunt în siguranță cu autentificare securizată",
    color: "purple",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Invitațiile arată perfect pe orice dispozitiv - telefon, tabletă sau desktop",
    color: "pink",
  },
];

const colorMap: Record<string, string> = {
  rose: "text-rose-500 bg-rose-50",
  purple: "text-purple-500 bg-purple-50",
  pink: "text-pink-500 bg-pink-50",
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Caracteristici
            </span>{" "}
            <span className="text-gray-800">Premium</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tot ce ai nevoie pentru o invitație digitală perfectă
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`inline-flex p-4 rounded-2xl ${
                  colorMap[feature.color]
                } mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
