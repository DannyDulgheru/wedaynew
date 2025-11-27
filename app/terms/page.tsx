import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
            Termeni și Condiții
          </h1>
          <p className="text-gray-600 mb-8">
            Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. Acceptarea Termenilor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bine ați venit la Weday! Prin accesarea și utilizarea platformei noastre, 
                confirmați că ați citit, înțeles și sunteți de acord să respectați acești Termeni 
                și Condiții. Dacă nu sunteți de acord cu vreunul dintre acești termeni, vă rugăm 
                să nu utilizați serviciile noastre.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Descrierea Serviciilor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Weday oferă o platformă online pentru crearea, personalizarea și distribuirea 
                de invitații digitale pentru diverse evenimente, inclusiv:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Nunți</li>
                <li>Botezuri</li>
                <li>Zile de naștere</li>
                <li>Aniversări</li>
                <li>Alte evenimente speciale</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Platforma include template-uri profesionale, funcționalități de personalizare, 
                gestionarea RSVP-urilor și raportare statistică.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. Crearea Contului
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pentru a utiliza serviciile noastre, trebuie să creați un cont. Sunteți responsabil pentru:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Furnizarea de informații exacte și actualizate</li>
                <li>Menținerea securității parolei și a contului dvs.</li>
                <li>Toate activitățile care au loc sub contul dvs.</li>
                <li>Notificarea imediată a oricărei utilizări neautorizate</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Trebuie să aveți cel puțin 18 ani pentru a crea un cont. Ne rezervăm dreptul de 
                a refuza sau suspenda accesul la servicii în orice moment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. Pachete și Prețuri
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Weday oferă un pachet unic la prețul de <strong>999 MDL</strong>, care include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Acces la toate template-urile disponibile</li>
                <li>Personalizare completă a invitației</li>
                <li>Link public unic și permanent pentru invitație</li>
                <li>Gestionare nelimitată a RSVP-urilor</li>
                <li>Statistici și rapoarte în timp real</li>
                <li>Suport tehnic prioritar</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Prețurile pot fi modificate în viitor, dar orice modificare nu va afecta 
                pachetele deja achiziționate.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. Plăți și Rambursări
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Plăți:</strong> Acceptăm plăți prin card bancar, transfer bancar și 
                alte metode de plată disponibile pe platformă. Toate tranzacțiile sunt procesate 
                în siguranță prin furnizori de servicii de plată certificați.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Rambursări:</strong> Oferi o politică de rambursare de 14 zile de la 
                achiziție, cu condiția ca serviciul să nu fi fost utilizat integral. Pentru a 
                solicita o rambursare, contactați-ne la{" "}
                <a href="mailto:support@Weday.md" className="text-rose-500 hover:underline">
                  support@Weday.md
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. Proprietate Intelectuală
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Toate materialele de pe Weday, inclusiv dar fără a se limita la text, 
                grafică, logo-uri, imagini, template-uri și software, sunt proprietatea 
                Weday sau a licențiatorilor săi și sunt protejate de legile privind 
                drepturile de autor și proprietatea intelectuală.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vi se acordă o licență limitată, neexclusivă și netransferabilă de utilizare 
                a platformei pentru scopurile personale ale evenimentelor dvs. Nu puteți:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Reproduce, distribui sau modifica conținutul fără permisiune</li>
                <li>Utiliza template-urile în scopuri comerciale</li>
                <li>Revinde sau redistribui serviciile noastre</li>
                <li>Copia sau imita designul și funcționalitatea platformei</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. Conținut Generat de Utilizatori
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Prin încărcarea de conținut pe platformă (text, imagini, detalii despre evenimente), 
                vă asumați responsabilitatea pentru:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Deținerea drepturilor asupra conținutului încărcat</li>
                <li>Asigurarea că conținutul nu încalcă drepturi de autor sau alte drepturi</li>
                <li>Conținutul care nu este ofensator, defăimător sau ilegal</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ne rezervăm dreptul de a elimina orice conținut care încalcă acești termeni 
                sau care este considerat inadecvat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. Comportament Interzis
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sunteți de acord să NU:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Utilizați platforma în scopuri ilegale sau neautorizate</li>
                <li>Încercați să accesați conturi sau date ale altor utilizatori</li>
                <li>Transmiteți viruși, malware sau cod dăunător</li>
                <li>Încărcați conținut ofensator, discriminatoriu sau obscen</li>
                <li>Interferați cu funcționarea normală a platformei</li>
                <li>Folosiți roboți, scripturi sau alte metode automate</li>
                <li>Faceți inginerie inversă sau să decompilați software-ul</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                9. Disponibilitatea Serviciilor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ne străduim să oferim servicii continue și fiabile, dar nu putem garanta că 
                platforma va fi disponibilă 100% din timp. Serviciile pot fi temporar indisponibile 
                din cauza:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Lucrări de mentenanță programate sau neplanificate</li>
                <li>Probleme tehnice sau defecțiuni de sistem</li>
                <li>Forță majoră sau evenimente în afara controlului nostru</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nu suntem responsabili pentru pierderi sau daune rezultate din indisponibilitatea 
                temporară a serviciilor.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                10. Limitarea Răspunderii
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                În măsura permisă de lege, Weday și reprezentanții săi nu vor fi 
                răspunzători pentru:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Daune indirecte, speciale, incidentale sau consecutive</li>
                <li>Pierderi de profituri, venituri sau date</li>
                <li>Erori sau omisiuni în conținutul platformei</li>
                <li>Acțiunile sau omisiunile utilizatorilor terți</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                Răspunderea noastră totală nu va depăși valoarea pachetului achiziționat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                11. Încetarea Serviciilor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Puteți închide contul în orice moment prin accesarea setărilor contului. 
                Ne rezervăm dreptul de a suspenda sau închide contul dvs. fără notificare 
                prealabilă dacă:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Încălcați acești Termeni și Condiții</li>
                <li>Furnizați informații false sau înșelătoare</li>
                <li>Angajați în activități frauduloase sau ilegale</li>
                <li>Nu plătiți pentru serviciile comandate</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                12. Legea Aplicabilă
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Acești Termeni și Condiții sunt guvernați de legile Republicii Moldova. 
                Orice dispută legată de acești termeni va fi soluționată în instanțele 
                competente din Chișinău, Moldova.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                13. Modificări ale Termenilor
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ne rezervăm dreptul de a actualiza sau modifica acești Termeni și Condiții 
                în orice moment. Modificările vor intra în vigoare imediat după publicarea 
                lor pe platformă. Utilizarea continuă a serviciilor după modificare constituie 
                acceptarea noilor termeni.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vă recomandăm să verificați periodic această pagină pentru a rămâne informat 
                despre orice schimbări.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                14. Disposiții Generale
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Întregul acord:</strong> Acești termeni constituie întregul acord 
                între dvs. și Weday.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Severabilitate:</strong> Dacă orice prevedere este considerată 
                nevalidă, celelalte prevederi rămân în vigoare.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Renunțare:</strong> Neexercitarea unui drept nu constituie renunțare 
                la acel drept.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                15. Contact
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pentru întrebări sau preocupări legate de acești Termeni și Condiții, 
                vă rugăm să ne contactați:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:legal@Weday.md" className="text-rose-500 hover:underline">
                    legal@Weday.md
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Suport:</strong>{" "}
                  <a href="mailto:support@Weday.md" className="text-rose-500 hover:underline">
                    support@Weday.md
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="text-sm text-blue-800">
                <strong>Notă Importantă:</strong> Prin utilizarea serviciilor Weday, 
                confirmați că ați citit, înțeles și sunteți de acord cu acești Termeni și 
                Condiții, precum și cu{" "}
                <Link href="/privacy" className="text-rose-500 hover:underline font-semibold">
                  Politica noastră de Confidențialitate
                </Link>
                .
              </p>
            </div>
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
