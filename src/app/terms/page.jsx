"use client"
import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import Link from "next/link"

export default function TermsAndConditionsPage() {
  const { currentLanguage, direction } = useLanguage()
  const isRTL = direction === "rtl"

  // Phone number with special handling for RTL languages
  const phoneNumber = "+995 500 50 20 62"
  const email = "jcdental07@gmail.com"

  // Translations for all supported languages
  const texts = {
    ka: {
      title: "წესები და პირობები",
      lastUpdated: "ბოლო განახლება:",
      backToHome: "მთავარ გვერდზე დაბრუნება",
      phone: "ტელეფონი:",
      email: "ელ-ფოსტა:",
      sections: [
        {
          title: "1. შესავალი",
          content: [
            "მოგესალმებით JCDental-ში. ჩვენი ვებგვერდის გამოყენებით, თქვენ ეთანხმებით ამ წესებსა და პირობებს. გთხოვთ, ყურადღებით წაიკითხოთ ისინი.",
            "JCDental-ის ვებგვერდი და მომსახურება განკუთვნილია მხოლოდ საინფორმაციო მიზნებისთვის. ჩვენი ვებგვერდის გამოყენება არ ქმნის ექიმი-პაციენტის ურთიერთობას.",
          ],
        },
        {
          title: "2. ჯავშნის პოლიტიკა",
          content: [
            "ჯავშნები შეიძლება გაკეთდეს ონლაინ, ტელეფონით ან პირადად.",
            "გთხოვთ, მოგვაწოდოთ მინიმუმ 24 საათიანი შეტყობინება, თუ ვერ ახერხებთ დანიშნულ შეხვედრაზე დასწრებას.",
            "განმეორებითი გაუქმებები ან გამოუცხადებლობა შეიძლება გამოიწვიოს გაუქმების საფასურის დაკისრება.",
            "ვცდილობთ დავიცვათ დანიშნული დროები, მაგრამ ზოგჯერ შეიძლება მოხდეს დაგვიანება გადაუდებელი შემთხვევების გამო. ასეთ შემთხვევებში, ჩვენ შეგატყობინებთ რაც შეიძლება სწრაფად.",
          ],
        },
        {
          title: "3. გადახდის პირობები",
          content: [
            "გადახდა მოითხოვება მომსახურების გაწევის დროს, თუ სხვაგვარად არ არის შეთანხმებული.",
            "ჩვენ ვიღებთ ნაღდ ფულს, საკრედიტო ბარათებს და სადაზღვევო გეგმებს.",
            "სადაზღვევო მოთხოვნები წარედგინება თქვენი სახელით, მაგრამ საბოლოო პასუხისმგებლობა ნებისმიერი გადაუხდელი ბალანსისთვის არის პაციენტის.",
            "გადახდის გეგმები ხელმისაწვდომია კვალიფიციური პაციენტებისთვის. გთხოვთ, დაუკავშირდეთ ჩვენს ოფისს დეტალებისთვის.",
          ],
        },
        {
          title: "4. პაციენტის პასუხისმგებლობები",
          content: [
            "პაციენტებმა უნდა მოგვაწოდონ ზუსტი და სრული სამედიცინო ისტორია.",
            "გთხოვთ, შეგვატყობინოთ ნებისმიერი ცვლილების შესახებ თქვენს ჯანმრთელობის მდგომარეობაში, მედიკამენტებში ან საკონტაქტო ინფორმაციაში.",
            "პაციენტებმა უნდა მისდიონ მკურნალობის გეგმებს და მოვლის ინსტრუქციებს, რომლებიც მოწოდებულია ჩვენი სტომატოლოგების მიერ.",
            "არასრულწლოვნები უნდა იყვნენ თანხლებით მშობლის ან მეურვის მიერ ყველა ვიზიტზე.",
          ],
        },
        {
          title: "5. კონფიდენციალურობის პოლიტიკა",
          content: [
            "ჩვენ ვიცავთ თქვენს პირად და სამედიცინო ინფორმაციას მოქმედი კანონმდებლობის შესაბამისად.",
            "თქვენი ინფორმაცია შეიძლება გაზიარდეს სხვა სამედიცინო პროვაიდერებთან მხოლოდ თქვენი თანხმობით ან როგორც მოითხოვს კანონი.",
            "ჩვენ შეიძლება გამოვიყენოთ თქვენი საკონტაქტო ინფორმაცია შეხსენებების გასაგზავნად ან თქვენი მკურნალობის შესახებ ინფორმაციის მოსაწოდებლად.",
            "დამატებითი ინფორმაციისთვის, გთხოვთ, იხილოთ ჩვენი სრული კონფიდენციალურობის პოლიტიკა.",
          ],
        },
        {
          title: "6. პასუხისმგებლობის შეზღუდვა",
          content: [
            "მიუხედავად იმისა, რომ ჩვენ ვცდილობთ მივაწოდოთ ზუსტი ინფორმაცია, ჩვენ არ ვიძლევით გარანტიას ჩვენს ვებგვერდზე არსებული ინფორმაციის სისრულეზე ან სიზუსტეზე.",
            "JCDental არ არის პასუხისმგებელი ნებისმიერ პირდაპირ, არაპირდაპირ, შემთხვევით ან შედეგობრივ ზიანზე, რომელიც წარმოიშობა ჩვენი ვებგვერდის გამოყენებიდან.",
            "სტომატოლოგიური მკურნალობა მოიცავს რისკებს, რომლებიც განხილული იქნება თქვენთან მკურნალობის დაწყებამდე. ჩვენ არ ვართ პასუხისმგებელი გაუთვალისწინებელ შედეგებზე, როდესაც მკურნალობა ჩატარდა პროფესიული სტანდარტების შესაბამისად.",
          ],
        },
        {
          title: "7. ინტელექტუალური საკუთრება",
          content: [
            "ყველა შინაარსი ჩვენს ვებგვერდზე, მათ შორის ტექსტი, გრაფიკა, ლოგოები და გამოსახულებები, არის JCDental-ის საკუთრება და დაცულია საავტორო უფლებებით.",
            "თქვენ არ შეგიძლიათ გამოიყენოთ, გადააკოპიროთ ან გაავრცელოთ ჩვენი შინაარსი ჩვენი წინასწარი წერილობითი თანხმობის გარეშე.",
          ],
        },
        {
          title: "8. ცვლილებები წესებში",
          content: [
            "ჩვენ შეგვიძლია შევცვალოთ ეს წესები და პირობები ნებისმიერ დროს. ცვლილებები ძალაში შევა მათი ვებგვერდზე გამოქვეყნებისთანავე.",
            "თქვენი ვებგვერდის გამოყენების გაგრძელება ნებისმიერი ცვლილების შემდეგ ნიშნავს თქვენს თანხმობას განახლებულ წესებზე.",
          ],
        },
        {
          title: "9. მოქმედი კანონმდებლობა",
          content: [
            "ეს წესები და პირობები რეგულირდება საქართველოს კანონებით.",
            "ნებისმიერი დავა, რომელიც წარმოიშობა ამ წესებიდან, ექვემდებარება საქართველოს სასამართლოების ექსკლუზიურ იურისდიქციას.",
          ],
        },
        {
          title: "10. კონტაქტი",
          content: [
            "თუ გაქვთ კითხვები ამ წესებისა და პირობების შესახებ, გთხოვთ, დაგვიკავშირდეთ:",
            "JCDental",
            "მისამართი: ნავთლუღის ქ. 10 არქი-ისანი, C ბლოკი, 1 სადარბაზო, 1, სართული 0190",
          ],
        },
      ],
    },
    en: {
      title: "Terms and Conditions",
      lastUpdated: "Last Updated:",
      backToHome: "Back to Home",
      phone: "Phone:",
      email: "Email:",
      sections: [
        {
          title: "1. Introduction",
          content: [
            "Welcome to JCDental. By using our website, you agree to these terms and conditions. Please read them carefully.",
            "The JCDental website and services are for informational purposes only. Use of our website does not create a doctor-patient relationship.",
          ],
        },
        {
          title: "2. Appointment Policy",
          content: [
            "Appointments can be made online, by phone, or in person.",
            "Please provide at least 24 hours' notice if you are unable to attend a scheduled appointment.",
            "Repeated cancellations or no-shows may result in a cancellation fee.",
            "We strive to keep to appointment times, but occasionally delays may occur due to emergencies. In such cases, we will notify you as soon as possible.",
          ],
        },
        {
          title: "3. Payment Terms",
          content: [
            "Payment is required at the time of service unless otherwise arranged.",
            "We accept cash, credit cards, and insurance plans.",
            "Insurance claims will be submitted on your behalf, but ultimate responsibility for any unpaid balance is the patient's.",
            "Payment plans are available for qualified patients. Please contact our office for details.",
          ],
        },
        {
          title: "4. Patient Responsibilities",
          content: [
            "Patients must provide accurate and complete medical history.",
            "Please inform us of any changes to your health status, medications, or contact information.",
            "Patients should follow treatment plans and care instructions provided by our dentists.",
            "Minors must be accompanied by a parent or guardian for all visits.",
          ],
        },
        {
          title: "5. Privacy Policy",
          content: [
            "We protect your personal and medical information in accordance with applicable laws.",
            "Your information may be shared with other healthcare providers only with your consent or as required by law.",
            "We may use your contact information to send reminders or provide information about your treatment.",
            "For more information, please see our full Privacy Policy.",
          ],
        },
        {
          title: "6. Limitation of Liability",
          content: [
            "While we strive to provide accurate information, we make no warranties about the completeness or accuracy of information on our website.",
            "JCDental is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website.",
            "Dental treatment involves risks which will be discussed with you before treatment begins. We are not responsible for unforeseen outcomes when treatment has been performed according to professional standards.",
          ],
        },
        {
          title: "7. Intellectual Property",
          content: [
            "All content on our website, including text, graphics, logos, and images, is the property of JCDental and is protected by copyright.",
            "You may not use, copy, or distribute our content without our prior written consent.",
          ],
        },
        {
          title: "8. Changes to Terms",
          content: [
            "We may modify these terms and conditions at any time. Changes will be effective immediately upon posting to the website.",
            "Your continued use of the website after any changes constitutes your acceptance of the updated terms.",
          ],
        },
        {
          title: "9. Governing Law",
          content: [
            "These terms and conditions are governed by the laws of Georgia.",
            "Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Georgia.",
          ],
        },
        {
          title: "10. Contact Us",
          content: [
            "If you have any questions about these terms and conditions, please contact us:",
            "JCDental",
            "Address: Navtlughi St. 10, Archi-Isani, Block C, Entrance 1, Floor 1, 0190",
          ],
        },
      ],
    },
    ru: {
      title: "Правила и условия",
      lastUpdated: "Последнее обновление:",
      backToHome: "Вернуться на главную",
      phone: "Телефон:",
      email: "Электронная почта:",
      sections: [
        {
          title: "1. Введение",
          content: [
            "Добро пожаловать в JCDental. Используя наш веб-сайт, вы соглашаетесь с этими правилами и условиями. Пожалуйста, внимательно прочитайте их.",
            "Веб-сайт и услуги JCDental предназначены только для информационных целей. Использование нашего веб-сайта не создает отношений врач-пациент.",
          ],
        },
        {
          title: "2. Политика записи на прием",
          content: [
            "Записаться на прием можно онлайн, по телефону или лично.",
            "Пожалуйста, предупредите нас не менее чем за 24 часа, если вы не можете прийти на запланированный прием.",
            "Повторные отмены или неявки могут привести к взиманию платы за отмену.",
            "Мы стараемся соблюдать время приема, но иногда могут возникать задержки из-за экстренных случаев. В таких случаях мы уведомим вас как можно скорее.",
          ],
        },
        {
          title: "3. Условия оплаты",
          content: [
            "Оплата требуется во время оказания услуги, если не оговорено иное.",
            "Мы принимаем наличные, кредитные карты и страховые планы.",
            "Страховые претензии будут поданы от вашего имени, но окончательная ответственность за любой неоплаченный баланс лежит на пациенте.",
            "Планы оплаты доступны для квалифицированных пациентов. Пожалуйста, свяжитесь с нашим офисом для получения подробной информации.",
          ],
        },
        {
          title: "4. Обязанности пациента",
          content: [
            "Пациенты должны предоставить точную и полную историю болезни.",
            "Пожалуйста, информируйте нас о любых изменениях в состоянии вашего здоровья, лекарствах или контактной информации.",
            "Пациенты должны следовать планам лечения и инструкциям по уходу, предоставленным нашими стоматологами.",
            "Несовершеннолетние должны сопровождаться родителем или опекуном на все визиты.",
          ],
        },
        {
          title: "5. Политика конфиденциальности",
          content: [
            "Мы защищаем вашу личную и медицинскую информацию в соответствии с применимыми законами.",
            "Ваша информация может быть передана другим поставщикам медицинских услуг только с вашего согласия или в соответствии с требованиями закона.",
            "Мы можем использовать вашу контактную информацию для отправки напоминаний или предоставления информации о вашем лечении.",
            "Для получения дополнительной информации, пожалуйста, ознакомьтесь с нашей полной Политикой конфиденциальности.",
          ],
        },
        {
          title: "6. Ограничение ответственности",
          content: [
            "Хотя мы стремимся предоставлять точную информацию, мы не даем гарантий относительно полноты или точности информации на нашем веб-сайте.",
            "JCDental не несет ответственности за любые прямые, косвенные, случайные или косвенные убытки, возникающие в результате использования нашего веб-сайта.",
            "Стоматологическое лечение связано с рисками, которые будут обсуждены с вами до начала лечения. Мы не несем ответственности за непредвиденные результаты, когда лечение было проведено в соответствии с профессиональными стандартами.",
          ],
        },
        {
          title: "7. Интеллектуальная собственность",
          content: [
            "Весь контент на нашем веб-сайте, включая текст, графику, логотипы и изображения, является собственностью JCDental и защищен авторским правом.",
            "Вы не можете использовать, копировать или распространять наш контент без нашего предварительного письменного согласия.",
          ],
        },
        {
          title: "8. Изменения в условиях",
          content: [
            "Мы можем изменять эти правила и условия в любое время. Изменения вступают в силу немедленно после публикации на веб-сайте.",
            "Продолжение использования веб-сайта после любых изменений означает ваше согласие с обновленными условиями.",
          ],
        },
        {
          title: "9. Применимое право",
          content: [
            "Эти правила и условия регулируются законами Грузии.",
            "Любые споры, возникающие из этих условий, подлежат исключительной юрисдикции судов Грузии.",
          ],
        },
        {
          title: "10. Свяжитесь с нами",
          content: [
            "Если у вас есть вопросы об этих правилах и условиях, пожалуйста, свяжитесь с нами:",
            "JCDental",
            "Адрес: ул. Навтлуги 10, Арчи-Исани, Блок C, Подъезд 1, Этаж 1, 0190",
          ],
        },
      ],
    },
    he: {
      title: "תנאים והגבלות",
      lastUpdated: "עודכן לאחרונה:",
      backToHome: "חזרה לדף הבית",
      phone: "טלפון:",
      email: 'דוא"ל:',
      sections: [
        {
          title: "1. מבוא",
          content: [
            "ברוכים הבאים ל-JCDental. בשימוש באתר שלנו, אתם מסכימים לתנאים והגבלות אלה. אנא קראו אותם בעיון.",
            "אתר JCDental והשירותים הם למטרות מידע בלבד. השימוש באתר שלנו אינו יוצר יחסי רופא-מטופל.",
          ],
        },
        {
          title: "2. מדיניות תורים",
          content: [
            "ניתן לקבוע תורים באופן מקוון, בטלפון או באופן אישי.",
            "אנא ספקו הודעה של לפחות 24 שעות אם אינכם יכולים להגיע לתור מתוכנן.",
            "ביטולים חוזרים או אי-הופעה עלולים לגרור דמי ביטול.",
            "אנו משתדלים לשמור על זמני התורים, אך לעתים עלולים להיווצר עיכובים בשל מקרי חירום. במקרים כאלה, נודיע לכם בהקדם האפשרי.",
          ],
        },
        {
          title: "3. תנאי תשלום",
          content: [
            "התשלום נדרש בזמן השירות אלא אם כן הוסדר אחרת.",
            "אנו מקבלים מזומן, כרטיסי אשראי ותוכניות ביטוח.",
            "תביעות ביטוח יוגשו בשמכם, אך האחריות הסופית לכל יתרה שלא שולמה היא של המטופל.",
            "תוכניות תשלום זמינות למטופלים מתאימים. אנא צרו קשר עם המשרד שלנו לפרטים.",
          ],
        },
        {
          title: "4. אחריות המטופל",
          content: [
            "המטופלים חייבים לספק היסטוריה רפואית מדויקת ומלאה.",
            "אנא עדכנו אותנו על כל שינוי במצב הבריאות שלכם, בתרופות או בפרטי הקשר.",
            "המטופלים צריכים לעקוב אחר תוכניות הטיפול והוראות הטיפול שניתנו על ידי רופאי השיניים שלנו.",
            "קטינים חייבים להיות מלווים על ידי הורה או אפוטרופוס בכל הביקורים.",
          ],
        },
        {
          title: "5. מדיניות פרטיות",
          content: [
            "אנו מגנים על המידע האישי והרפואי שלכם בהתאם לחוקים החלים.",
            "המידע שלכם עשוי להיות משותף עם ספקי שירותי בריאות אחרים רק בהסכמתכם או כנדרש על פי חוק.",
            "אנו עשויים להשתמש בפרטי הקשר שלכם כדי לשלוח תזכורות או לספק מידע על הטיפול שלכם.",
            "למידע נוסף, אנא עיינו במדיניות הפרטיות המלאה שלנו.",
          ],
        },
        {
          title: "6. הגבלת אחריות",
          content: [
            "למרות שאנו שואפים לספק מידע מדויק, איננו נותנים אחריות לגבי שלמות או דיוק המידע באתר שלנו.",
            "JCDental אינה אחראית לכל נזק ישיר, עקיף, מקרי או תוצאתי הנובע מהשימוש שלכם באתר שלנו.",
            "טיפול שיניים כרוך בסיכונים שיידונו איתכם לפני תחילת הטיפול. איננו אחראים לתוצאות בלתי צפויות כאשר הטיפול בוצע בהתאם לסטנדרטים מקצועיים.",
          ],
        },
        {
          title: "7. קניין רוחני",
          content: [
            "כל התוכן באתר שלנו, כולל טקסט, גרפיקה, לוגואים ותמונות, הוא רכושה של JCDental ומוגן בזכויות יוצרים.",
            "אינכם רשאים להשתמש, להעתיק או להפיץ את התוכן שלנו ללא הסכמתנו בכתב מראש.",
          ],
        },
        {
          title: "8. שינויים בתנאים",
          content: [
            "אנו עשויים לשנות את התנאים וההגבלות האלה בכל עת. השינויים יכנסו לתוקף מיד עם פרסומם באתר.",
            "המשך השימוש שלכם באתר לאחר כל שינוי מהווה את הסכמתכם לתנאים המעודכנים.",
          ],
        },
        {
          title: "9. חוק שולט",
          content: [
            "תנאים והגבלות אלה מוסדרים על ידי חוקי גאורגיה.",
            "כל מחלוקת הנובעת מתנאים אלה תהיה כפופה לסמכות השיפוט הבלעדית של בתי המשפט בגאורגיה.",
          ],
        },
        {
          title: "10. צרו קשר",
          content: [
            "אם יש לכם שאלות לגבי תנאים והגבלות אלה, אנא צרו איתנו קשר:",
            "JCDental",
            "כתובת: רחוב נבטלוגי 10, ארצ'י-איסני, בלוק C, כניסה 1, קומה 1, 0190",
          ],
        },
      ],
    },
  }

  // Get translations for current language
  const t = texts[currentLanguage] || texts.ka

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Function to render phone number with special handling for all languages
  const renderPhoneNumber = () => {
    return (
      <div className="flex items-center">
        <span className={isRTL ? "ml-1" : "mr-1"}>{t.phone}</span>
        <a
          href={`tel:${phoneNumber}`}
          className="text-blue-600 hover:underline"
          style={{ direction: "ltr", unicodeBidi: "embed", display: "inline-block" }}
        >
          {phoneNumber}
        </a>
      </div>
    )
  }

  // Function to render email with special handling for all languages
  const renderEmail = () => {
    return (
      <div className="flex items-center">
        <span className={isRTL ? "ml-1" : "mr-1"}>{t.email}</span>
        <a
          href={`mailto:${email}`}
          className="text-blue-600 hover:underline"
          style={{ direction: "ltr", unicodeBidi: "embed", display: "inline-block" }}
        >
          {email}
        </a>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8" dir={direction}>
      <div className="container mx-auto px-4">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 transition-colors font-medium ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            {t.backToHome}
          </Link>
        </motion.div>

        {/* Main content */}
        <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
          <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden p-8" variants={slideUp}>
            <motion.h1
              className="text-3xl font-bold text-gray-800 mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.title}
            </motion.h1>

            <motion.p className="text-sm text-gray-500 mb-8 text-center" variants={slideUp}>
              {t.lastUpdated} May 15, 2024
            </motion.p>

            <motion.div className="space-y-8" variants={staggerContainer} initial="hidden" animate="visible">
              {t.sections.map((section, index) => (
                <motion.div key={index} className="space-y-3" variants={slideUp}>
                  <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                  <div className="space-y-2">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700">
                        {paragraph}
                      </p>
                    ))}

                    {/* Add special handling for contact section */}
                    {index === 9 && (
                      <>
                        {renderPhoneNumber()}
                        {renderEmail()}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
