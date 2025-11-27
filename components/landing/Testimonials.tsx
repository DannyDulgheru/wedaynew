import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana și Mihai",
    event: "Nuntă",
    image: "AM",
    text: "Am fost impresionați de cât de ușor a fost să creăm invitația perfectă! Toate răspunsurile RSVP au venit direct în panou, super convenabil!",
    rating: 5,
  },
  {
    name: "Elena",
    event: "Botez",
    image: "E",
    text: "Template-urile pentru botez sunt absolut adorabile! Am personalizat totul în câteva minute și toți invitații au iubit invitația digitală.",
    rating: 5,
  },
  {
    name: "Andrei",
    event: "Aniversare",
    image: "A",
    text: "Pentru aniversarea de 50 de ani am vrut ceva special. Weday ne-a oferit exact ce aveam nevoie - elegant și ușor de distribuit!",
    rating: 5,
  },
  {
    name: "Maria și Ion",
    event: "Nuntă",
    image: "MI",
    text: "Prețul de 999 MDL este incredibil pentru toate funcțiile pe care le primești. Suportul clienți a fost mereu disponibil să ne ajute!",
    rating: 5,
  },
  {
    name: "Cristina",
    event: "Zi de Naștere",
    image: "C",
    text: "Am organizat o petrecere surpriză și invitațiile digitale au fost perfecte! Nimeni nu a aflat până la ultima clipă!",
    rating: 5,
  },
  {
    name: "Victor și Diana",
    event: "Aniversare",
    image: "VD",
    text: "Design-ul este superb și funcționează perfect pe telefon! Invitații noștri au apreciat foarte mult experiența modernă.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            <span className="text-gray-800">Ce Spun</span>{" "}
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Clienții Noștri
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Peste 500 de cupluri și familii fericite au ales Weday
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-10 w-10 text-rose-200" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.event}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-500 mb-1">500+</div>
              <div className="text-gray-600 text-sm">Evenimente</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-1">4.9/5</div>
              <div className="text-gray-600 text-sm">Rating Mediu</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500 mb-1">98%</div>
              <div className="text-gray-600 text-sm">Recomandări</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
