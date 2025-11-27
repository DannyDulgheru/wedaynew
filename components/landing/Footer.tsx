import Link from "next/link";
import { Heart, Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
              <span className="text-2xl font-bold font-playfair">Weday</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Creăm momente memorabile prin invitații digitale elegante și
              personalizate pentru evenimentele tale speciale.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@Weday.md"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Link-uri Rapide</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Caracteristici
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Cum funcționează
                </Link>
              </li>
              <li>
                <Link
                  href="#templates"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Template-uri
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Prețuri
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Servicii</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/templates/wedding"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Invitații Nuntă
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/baptism"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Invitații Botez
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/birthday"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Invitații Zi de Naștere
                </Link>
              </li>
              <li>
                <Link
                  href="/templates/anniversary"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  Invitații Aniversare
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contact@Weday.md"
                  className="hover:text-rose-500 transition-colors"
                >
                  contact@Weday.md
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+37360123456"
                  className="hover:text-rose-500 transition-colors"
                >
                  +373 60 123 456
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">
                Abonează-te pentru oferte speciale
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email-ul tău"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 focus:outline-none focus:border-rose-500 text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 rounded-r-lg hover:shadow-lg transition-all">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Weday. Toate drepturile rezervate.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-rose-500 transition-colors"
              >
                Politica de Confidențialitate
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-rose-500 transition-colors"
              >
                Termeni și Condiții
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
