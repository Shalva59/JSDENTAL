import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

export default function AboutPage() {
  // თანმიმდევრული ფერების სქემა
  const colors = {
    primary: "#0284c7", // ღია ლურჯი
    secondary: "#0ea5e9", // ცისფერი
    accent: "#38bdf8", // ღია ცისფერი
    light: "#e0f2fe", // ძალიან ღია ცისფერი
    dark: "#0c4a6e", // მუქი ლურჯი
    text: "#334155", // მუქი ნაცრისფერი ტექსტისთვის
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-700">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://thumbs.dreamstime.com/z/stomatology-24828014.jpg"
            alt="JCDental კლინიკის ინტერიერი"
            className="w-full h-full object-cover brightness-[0.7]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 to-sky-700/50 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ჩვენს შესახებ JCDental</h1>
          <p className="text-xl text-white max-w-2xl">გამორჩეული სტომატოლოგიური მომსახურება.  </p>
          <div className="mt-8">
            <Link
              href="/appointment"
              className="px-6 py-3 bg-white text-sky-600 rounded-full font-medium shadow-lg hover:bg-sky-50 transition-colors"
            >
              დაჯავშნეთ ვიზიტი
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              მოგესალმებათ JCDental
            </h2>
            <p className="text-lg mb-4 leading-relaxed">
              JC Dental-ში გვჯერა, რომ ჯანმრთელი ღიმილი საერთო კეთილდღეობის საფუძველია. ჩვენი თანამედროვე სტომატოლოგიური
              კლინიკა აერთიანებს უახლეს ტექნოლოგიებსა და პროფესიონალებს .
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              მიუხედავად იმისა, გვსტუმრობთ რუტინული შემოწმებისთვის თუ კომპლექსური
              სტომატოლოგიური მკურნალობისთვის, ჩვენი გამოცდილი მაღალკვალიფიციური გუნდი მზადაა უზრუნველყოს თქვენი კომფორტი
              და კმაყოფილება.
            </p>
            <Link
              href="/appointment"
              className="inline-block px-5 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: "white",
              }}
            >
              დაჯავშნეთ ვიზიტი
            </Link>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://ana-dent.ro/wp-content/uploads/2018/04/DSC_2418-1024x621.jpg"
              alt="JCDental მიმღები"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* History & Mission Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8" style={{ backgroundColor: colors.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
              ჩვენი ისტორია და მისია
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.dark }}>
                ჩვენი ისტორია
              </h3>
              <p className="mb-4 leading-relaxed">
                <span className="font-semibold">JCDental დაარსდა  გაბრიელ ჯანაშვილის მიერ</span>, როგორც
                თანამედროვე სტომატოლოგიური ცენტრი, რომელიც მიზნად ისახავს{" "}
                <span className="font-semibold">ინოვაციური და უმაღლესი ხარისხის სტომატოლოგიური მომსახურების</span>{" "}
                მიწოდებას.
              </p>
              <p className="mb-6 leading-relaxed">
                ჩვენი კლინიკა აერთიანებს <span className="font-semibold">თანამედროვე ტექნოლოგიებს</span> და{" "}
                <span className="font-semibold"> მაღალკვალიფიციურ გუნდს</span>, რომელიც მიზნად ისახავს{" "}
                <span className="font-semibold">ჯანმრთელი და ნათელი ღიმილის შექმნას</span>. მიუხედავად იმისა, რომ JC Dental ჩამოყალიბდა 2025 წელს
                , <span className="font-semibold">ჩვენი ხედვა და პაციენტებისადმი ვალდებულება </span>
                გვაძლევს შესაძლებლობას,{" "}
                <span className="font-semibold">სწრაფად გავხდეთ რეგიონის ერთ-ერთი წამყვანი სტომატოლოგიური ცენტრი</span>.
              </p>

              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.dark }}>
                ჩვენი მისია
              </h3>
              <p className="leading-relaxed">
                ჩვენი მისიაა{" "}
                <span className="font-semibold">სტომატოლოგიური მომსახურების მაღალი ხარისხის უზრუნველყოფა</span>
                მინიმალურად ინვაზიური მეთოდებით, თანამედროვე ტექნოლოგიების დანერგვა და {" "}
                <span className="font-semibold">პაციენტების კომფორტის პრიორიტირება.</span>. JCDental-ში ჩვენ გვჯერა,
                რომ <span className="font-semibold">ჯანმრთელი ღიმილი უკეთესი ცხოვრების საწინდარია</span>, ამიტომ
                ვთავაზობთ{" "}
                <span className="font-semibold">თანამედროვე, უსაფრთხო და ხელმისაწვდომ სტომატოლოგიურ მომსახურებას</span>.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden order-1 md:order-2 shadow-xl">
              <img
                src="https://th.bing.com/th/id/OIP.g1oqYGi3VZqJkFihNvcOuAHaE2?w=1747&h=1144&rs=1&pid=ImgDetMain"
                alt="JCDental კლინიკის ისტორიის დროის ხაზი"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - დავამატე ეს სექცია */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
            გაიცანით ჩვენი გუნდი
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-lg max-w-3xl mx-auto">
            ჩვენი მაღალკვალიფიციური სტომატოლოგების გუნდი ვალდებულია მოგაწოდოთ პერსონალიზებული მზრუნველობა კომფორტულ
            გარემოში.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dentist 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-[300px]">
              <img
                src="https://th.bing.com/th/id/R.c8cea7c2e3c3c8a190a652f3d9b79313?rik=91fbcpNU7DhRow&pid=ImgRaw&r=0"
                alt="დოქტორი გაბრიელ ჯანაშვილი"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">დოქტორი გაბრიელ ჯანაშვილი</h3>
              <p className="font-medium mb-3" style={{ color: colors.primary }}>
                დამფუძნებელი და წამყვანი სტომატოლოგი
              </p>
              <p className="mb-4">
                20 წელზე მეტი გამოცდილებით, დოქტორი ჯანაშვილი სპეციალიზდება კოსმეტიკურ სტომატოლოგიაში და კომპლექსურ
                აღდგენით პროცედურებში.
              </p>
            </div>
          </div>

          {/* Dentist 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-[300px]">
              <img
                src="https://th.bing.com/th/id/OIP.TXtt652cB_RZ2KZThaujvwHaE8?rs=1&pid=ImgDetMain"
                alt="დოქტორი ნინო მაისურაძე"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">დოქტორი ნინო მაისურაძე</h3>
              <p className="font-medium mb-3" style={{ color: colors.primary }}>
                ზოგადი სტომატოლოგი
              </p>
              <p className="mb-4">
                დოქტორი მაისურაძე ფოკუსირებულია პრევენციულ მზრუნველობაზე და ცნობილია თავისი ნაზი მიდგომით შფოთვიანი
                პაციენტების მიმართ.
              </p>
            </div>
          </div>

          {/* Specialist */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-[300px]">
              <img
                src="https://img.freepik.com/premium-photo/dentist-doctor_873925-919177.jpg"
                alt="დოქტორი ლევან ბერიძე"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">დოქტორი ლევან ბერიძე</h3>
              <p className="font-medium mb-3" style={{ color: colors.primary }}>
                ორთოდონტი
              </p>
              <p className="mb-4">
                დოქტორი ბერიძე არის ექსპერტი თანამედროვე ორთოდონტიულ მკურნალობაში, მათ შორის გამჭვირვალე კაპებსა და
                ტრადიციულ ბრეკეტებში.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8" style={{ backgroundColor: colors.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
              დაგვიკავშირდით
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
            <p className="text-lg max-w-3xl mx-auto">
              ჩვენ აქ ვართ, რომ ვუპასუხოთ თქვენს კითხვებს და დაგეხმაროთ შემდეგი ვიზიტის დაგეგმვაში.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
                  საკონტაქტო ინფორმაცია
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1">მისამართი</h4>
                      <p>ნავთლუღის ქ. 10 არქი-ისანი , C ბლოკი, 1 სადარბაზო, 1, სართული 0190</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1">ტელეფონი</h4>
                      <p>+995 500 50 20 62</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1">ელ-ფოსტა</h4>
                      <p>jcdental07@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1">სამუშაო საათები</h4>
                      <p>
                        ორშაბათი - პარასკევი: 10:00 - 20:00
                        <br />
                        შაბათი: დახურულია
                        <br />
                        კვირა: 10:00 - 20:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-3">გამოგვყევით</h4>
                  <div className="flex space-x-4">
                    <Link
                      href="https://facebook.com"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${colors.light}` }}
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" style={{ color: colors.primary }} />
                    </Link>
                    <Link
                      href="https://instagram.com"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${colors.light}` }}
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" style={{ color: colors.primary }} />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${colors.light}` }}
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" style={{ color: colors.primary }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
      {/* Google Maps Embed */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1252.8391205735695!2d44.84022233089427!3d41.68230198865621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d3db3f527e1%3A0x626d96f8aff559d8!2sJC%20dental!5e0!3m2!1sen!2sge!4v1742504874462!5m2!1sen!2sge"
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Overlay ღილაკი */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <Link
          href="https://www.google.com/maps/dir/?api=1&destination=41.68230198865621,44.84022233089427"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-lg hover:bg-blue-50 transition-colors"
        >
          📍 მიიღეთ მიმართულებები
        </Link>
      </div>
    </div>
          </div>
        </div>
      </section>


    </div>
  )
}

