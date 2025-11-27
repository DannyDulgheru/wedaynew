"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Cum funcționează platforma?",
    answer:
      "După înregistrare și plata pachetului de 999 MDL, vei avea acces la editorul nostru unde poți alege un template, personaliza conținutul (text, culori, imagini) și genera un link unic pentru invitația ta. Acest link poate fi distribuit prin WhatsApp, email sau social media.",
  },
  {
    question: "Pot modifica invitația după ce am trimis-o?",
    answer:
      "Da! Poți edita invitația oricând dorești. Toate modificările se vor reflecta instant pe link-ul public, fără să fie nevoie să trimiți un nou link invitaților.",
  },
  {
    question: "Cum primesc confirmările RSVP?",
    answer:
      "Toate confirmările de participare sunt salvate automat în panoul tău client. Poți vedea cine a confirmat, câți invitați vin, și alte detalii. De asemenea, poți exporta lista în format CSV.",
  },
  {
    question: "Ce tipuri de evenimente pot crea?",
    answer:
      "Oferim template-uri pentru nunți, botezuri, zile de naștere și aniversări. Fiecare categorie are 4 template-uri diferite, totalizând 16 opțiuni de design profesional.",
  },
  {
    question: "Este platforma mobile-friendly?",
    answer:
      "Absolut! Toate invitațiile sunt optimizate pentru a arăta perfect pe orice dispozitiv - smartphone, tabletă sau desktop. Atât tu, cât și invitații tăi veți avea o experiență excelentă.",
  },
  {
    question: "Cât timp rămâne activă invitația?",
    answer:
      "Invitația ta rămâne activă pe durata evenimentului plus 30 de zile după, pentru ca tu să poți descărca toate datele RSVP și să accesezi informațiile despre invitați.",
  },
  {
    question: "Pot adăuga mai multe persoane să editeze invitația?",
    answer:
      "Momentan, fiecare invitație are un singur administrator (cel care a creat-o). Totuși, poți schimba parola și distribui accesul cu persoane de încredere dacă dorești.",
  },
  {
    question: "Ce metode de plată acceptați?",
    answer:
      "Acceptăm plăți prin card bancar (Visa, Mastercard) și alte metode populare în Moldova. Toate tranzacțiile sunt securizate și procesate prin gateway-uri certificate.",
  },
  {
    question: "Oferți suport tehnic?",
    answer:
      "Da! Echipa noastră este disponibilă 24/7 pentru a te ajuta cu orice întrebare sau problemă. Poți contacta suportul prin email, telefon sau chat live.",
  },
  {
    question: "Pot primi o rambursare?",
    answer:
      "Oferim rambursare completă în primele 7 zile de la achiziție dacă nu ești mulțumit de serviciu, fără întrebări. După această perioadă, analizăm fiecare caz individual.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Întrebări
            </span>{" "}
            <span className="text-gray-800">Frecvente</span>
          </h2>
          <p className="text-xl text-gray-600">
            Tot ce trebuie să știi despre Weday
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-gray-800 pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-rose-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl">
          <p className="text-lg text-gray-700 mb-4">
            Mai ai întrebări? Suntem aici să te ajutăm!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            <span>Contactează-ne</span>
          </a>
        </div>
      </div>
    </section>
  );
}
