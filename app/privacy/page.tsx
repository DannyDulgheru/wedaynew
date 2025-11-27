import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
              <span className="text-2xl font-bold font-playfair bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                Weday
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Înapoi Acasă</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Politica de Confidențialitate
          </h1>
          <p className="text-gray-600 mb-8">
            Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. Introducere
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bine ați venit la Weday! Confidențialitatea dvs. este foarte importantă pentru noi. 
                Această Politică de Confidențialitate explică modul în care colectăm, utilizăm, divulgăm 
                și protejăm informațiile dvs. personale atunci când utilizați platforma noastră de invitații online.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Informații pe care le Colectăm
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Colectăm următoarele tipuri de informații:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>
                  <strong>Informații de cont:</strong> nume, adresă de email, număr de telefon, parolă
                </li>
                <li>
                  <strong>Informații despre evenimente:</strong> detalii despre evenimentele dvs., invitați, 
                  date, locații
                </li>
                <li>
                  <strong>Informații de plată:</strong> detalii despre tranzacțiile efectuate pentru 
                  achiziționarea pachetelor noastre
                </li>
                <li>
                  <strong>Informații de utilizare:</strong> modul în care interacționați cu platforma, 
                  paginile vizitate, timpul petrecut pe site
                </li>
                <li>
                  <strong>Informații tehnice:</strong> adresă IP, tip de browser, sistem de operare
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. Cum Utilizăm Informațiile
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizăm informațiile colectate pentru:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Furnizarea și îmbunătățirea serviciilor noastre</li>
                <li>Crearea și gestionarea contului dvs.</li>
                <li>Procesarea plăților și tranzacțiilor</li>
                <li>Trimiterea de notificări și actualizări despre evenimentele dvs.</li>
                <li>Oferirea de suport clienți</li>
                <li>Îmbunătățirea experienței utilizatorului și personalizarea conținutului</li>
                <li>Prevenirea fraudei și asigurarea securității platformei</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. Partajarea Informațiilor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nu vindem, închiriem sau partajăm informațiile dvs. personale cu terțe părți, cu excepția:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>
                  <strong>Procesatori de plăți:</strong> pentru procesarea tranzacțiilor financiare
                </li>
                <li>
                  <strong>Furnizori de servicii:</strong> care ne ajută să operăm platforma 
                  (hosting, email, SMS)
                </li>
                <li>
                  <strong>Cerințe legale:</strong> atunci când este necesar să respectăm legea sau 
                  să răspundem la cereri legale
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. Securitatea Datelor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja 
                informațiile dvs. personale împotriva accesului neautorizat, modificării, 
                divulgării sau distrugerii. Acestea includ:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Criptarea datelor în tranzit și în repaus (SSL/TLS)</li>
                <li>Autentificare securizată și gestionarea parolelor</li>
                <li>Monitorizare constantă a sistemelor pentru detectarea vulnerabilităților</li>
                <li>Backup-uri regulate ale datelor</li>
                <li>Acces restricționat la informații personale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. Drepturile Dvs.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Aveți următoarele drepturi în legătură cu informațiile dvs. personale:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>
                  <strong>Dreptul de acces:</strong> să solicitați o copie a informațiilor 
                  pe care le deținem despre dvs.
                </li>
                <li>
                  <strong>Dreptul de rectificare:</strong> să solicitați corectarea 
                  informațiilor inexacte
                </li>
                <li>
                  <strong>Dreptul la ștergere:</strong> să solicitați ștergerea 
                  informațiilor dvs. personale
                </li>
                <li>
                  <strong>Dreptul la portabilitate:</strong> să primiți informațiile dvs. 
                  într-un format structurat
                </li>
                <li>
                  <strong>Dreptul de opoziție:</strong> să vă opuneți prelucrării 
                  informațiilor dvs.
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pentru a exercita aceste drepturi, vă rugăm să ne contactați la{" "}
                <a href="mailto:privacy@Weday.md" className="text-rose-500 hover:underline">
                  privacy@Weday.md
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. Cookie-uri și Tehnologii Similare
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizăm cookie-uri și tehnologii similare pentru a îmbunătăți experiența dvs. 
                pe platformă. Cookie-urile sunt fișiere text mici stocate pe dispozitivul dvs. 
                care ne ajută să:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Să vă păstrăm autentificat</li>
                <li>Să ne amintim preferințele dvs.</li>
                <li>Să analizăm traficul și utilizarea site-ului</li>
                <li>Să personalizăm conținutul</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Puteți gestiona preferințele cookie-urilor din setările browser-ului dvs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. Retenția Datelor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Păstrăm informațiile dvs. personale atât timp cât contul dvs. este activ sau 
                cât este necesar pentru a vă furniza serviciile. Dacă doriți să vă ștergeți 
                contul, vom șterge sau anonimiza informațiile dvs., cu excepția cazurilor în 
                care suntem obligați legal să le păstrăm.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                9. Protecția Datelor Minorilor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Serviciile noastre sunt destinate persoanelor cu vârsta de peste 18 ani. 
                Nu colectăm cu bună știință informații personale de la copii sub 18 ani. 
                Dacă aflăm că am colectat astfel de informații, vom lua măsuri pentru a 
                le șterge cât mai curând posibil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                10. Modificări ale Politicii de Confidențialitate
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ne rezervăm dreptul de a actualiza această Politică de Confidențialitate 
                periodic. Orice modificări vor fi publicate pe această pagină cu o dată 
                de actualizare revizuită. Vă recomandăm să verificați periodic această 
                pagină pentru a fi la curent cu modul în care vă protejăm informațiile.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                11. Contact
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Dacă aveți întrebări sau preocupări cu privire la această Politică de 
                Confidențialitate sau la modul în care gestionăm informațiile dvs., 
                vă rugăm să ne contactați:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@Weday.md" className="text-rose-500 hover:underline">
                    privacy@Weday.md
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Telefon:</strong>{" "}
                  <a href="tel:+37360123456" className="text-rose-500 hover:underline">
                    +373 60 123 456
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Adresă:</strong> Chișinău, Moldova
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Weday. Toate drepturile rezervate.
          </p>
        </div>
      </footer>
    </div>
  );
}
