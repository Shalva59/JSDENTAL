// Multilingual email templates for appointment notifications
// Supported languages: en (English), ka (Georgian), ru (Russian), he (Hebrew)

export function getAppointmentCreatedEmailForPatient({ patientName, doctorName, service, requestedDate, requestedTime, language = 'en' }) {
  const templates = {
    en: {
      subject: "Appointment Request Submitted - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #ffa500; color: white; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>Appointment Request Submitted</h2>
                <p>Dear ${patientName},</p>
                <p>Your appointment request has been successfully submitted and is currently <span class="status">Pending</span> doctor approval.</p>
                <div class="details">
                  <h3>Appointment Details:</h3>
                  <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Requested Date:</strong> ${requestedDate}</p>
                  <p><strong>Requested Time:</strong> ${requestedTime}</p>
                </div>
                <p>You will receive a notification once the doctor reviews your request. You can also check the status of your appointment by logging into your account.</p>
                <p>If you need to make any changes or have questions, please contact us.</p>
              </div>
              <div class="footer">
                <p>JC Dental Clinic<br>
                Email: Jcdental07@gmail.com<br>
                Website: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Dear ${patientName},\n\nYour appointment request has been successfully submitted and is currently pending doctor approval.\n\nAppointment Details:\n- Doctor: Dr. ${doctorName}\n- Service: ${service}\n- Requested Date: ${requestedDate}\n- Requested Time: ${requestedTime}\n\nYou will receive a notification once the doctor reviews your request.\n\nJC Dental Clinic\nEmail: Jcdental07@gmail.com\nWebsite: https://www.jcdental.ge`
    },
    ka: {
      subject: "ვიზიტის მოთხოვნა გაგზავნილია - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #ffa500; color: white; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>ვიზიტის მოთხოვნა გაგზავნილია</h2>
                <p>ძვირფასო ${patientName},</p>
                <p>თქვენი ვიზიტის მოთხოვნა წარმატებით გაიგზავნა და ამჟამად <span class="status">ელოდება</span> ექიმის დადასტურებას.</p>
                <div class="details">
                  <h3>ვიზიტის დეტალები:</h3>
                  <p><strong>ექიმი:</strong> დოქტ. ${doctorName}</p>
                  <p><strong>სერვისი:</strong> ${service}</p>
                  <p><strong>მოთხოვნილი თარიღი:</strong> ${requestedDate}</p>
                  <p><strong>მოთხოვნილი დრო:</strong> ${requestedTime}</p>
                </div>
                <p>თქვენ მიიღებთ შეტყობინებას, როდესაც ექიმი განიხილავს თქვენს მოთხოვნას. თქვენ ასევე შეგიძლიათ შეამოწმოთ ვიზიტის სტატუსი თქვენს ანგარიშში შესვლით.</p>
                <p>თუ გჭირდებათ რაიმე ცვლილების შეტანა ან გაქვთ კითხვები, გთხოვთ დაგვიკავშირდეთ.</p>
              </div>
              <div class="footer">
                <p>JC Dental კლინიკა<br>
                ელფოსტა: Jcdental07@gmail.com<br>
                ვებსაიტი: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `ძვირფასო ${patientName},\n\nთქვენი ვიზიტის მოთხოვნა წარმატებით გაიგზავნა და ამჟამად ელოდება ექიმის დადასტურებას.\n\nვიზიტის დეტალები:\n- ექიმი: დოქტ. ${doctorName}\n- სერვისი: ${service}\n- მოთხოვნილი თარიღი: ${requestedDate}\n- მოთხოვნილი დრო: ${requestedTime}\n\nთქვენ მიიღებთ შეტყობინებას, როდესაც ექიმი განიხილავს თქვენს მოთხოვნას.\n\nJC Dental კლინიკა\nელფოსტა: Jcdental07@gmail.com\nვებსაიტი: https://www.jcdental.ge`
    },
    ru: {
      subject: "Запрос на прием отправлен - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #ffa500; color: white; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>Запрос на прием отправлен</h2>
                <p>Уважаемый(ая) ${patientName},</p>
                <p>Ваш запрос на прием был успешно отправлен и в настоящее время <span class="status">ожидает</span> подтверждения врача.</p>
                <div class="details">
                  <h3>Детали приема:</h3>
                  <p><strong>Врач:</strong> Доктор ${doctorName}</p>
                  <p><strong>Услуга:</strong> ${service}</p>
                  <p><strong>Запрошенная дата:</strong> ${requestedDate}</p>
                  <p><strong>Запрошенное время:</strong> ${requestedTime}</p>
                </div>
                <p>Вы получите уведомление после того, как врач рассмотрит вашу заявку. Вы также можете проверить статус вашего приема, войдя в свой аккаунт.</p>
                <p>Если вам нужно внести изменения или у вас есть вопросы, пожалуйста, свяжитесь с нами.</p>
              </div>
              <div class="footer">
                <p>Клиника JC Dental<br>
                Email: Jcdental07@gmail.com<br>
                Сайт: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Уважаемый(ая) ${patientName},\n\nВаш запрос на прием был успешно отправлен и в настоящее время ожидает подтверждения врача.\n\nДетали приема:\n- Врач: Доктор ${doctorName}\n- Услуга: ${service}\n- Запрошенная дата: ${requestedDate}\n- Запрошенное время: ${requestedTime}\n\nВы получите уведомление после того, как врач рассмотрит вашу заявку.\n\nКлиника JC Dental\nEmail: Jcdental07@gmail.com\nСайт: https://www.jcdental.ge`
    },
    he: {
      subject: "בקשת תור נשלחה - JC Dental",
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-right: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #ffa500; color: white; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>בקשת תור נשלחה</h2>
                <p>${patientName} היקר/ה,</p>
                <p>בקשת התור שלך נשלחה בהצלחה והיא כעת <span class="status">ממתינה</span> לאישור הרופא.</p>
                <div class="details">
                  <h3>פרטי התור:</h3>
                  <p><strong>רופא:</strong> ד"ר ${doctorName}</p>
                  <p><strong>שירות:</strong> ${service}</p>
                  <p><strong>תאריך מבוקש:</strong> ${requestedDate}</p>
                  <p><strong>שעה מבוקשת:</strong> ${requestedTime}</p>
                </div>
                <p>תקבל/י הודעה לאחר שהרופא יבדוק את הבקשה שלך. ניתן גם לבדוק את מצב התור שלך על ידי כניסה לחשבון שלך.</p>
                <p>אם יש צורך בשינויים או יש לך שאלות, אנא צור/י קשר איתנו.</p>
              </div>
              <div class="footer">
                <p>מרפאת JC Dental<br>
                דוא"ל: Jcdental07@gmail.com<br>
                אתר: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${patientName} היקר/ה,\n\nבקשת התור שלך נשלחה בהצלחה והיא כעת ממתינה לאישור הרופא.\n\nפרטי התור:\n- רופא: ד"ר ${doctorName}\n- שירות: ${service}\n- תאריך מבוקש: ${requestedDate}\n- שעה מבוקשת: ${requestedTime}\n\nתקבל/י הודעה לאחר שהרופא יבדוק את הבקשה שלך.\n\nמרפאת JC Dental\nדוא"ל: Jcdental07@gmail.com\nאתר: https://www.jcdental.ge`
    }
  };

  return templates[language] || templates['en'];
}

export function getAppointmentCreatedEmailForDoctor({ doctorName, patientName, patientPhone, patientEmail, service, requestedDate, requestedTime, notes, isUrgent, language = 'en' }) {
  const templates = {
    en: {
      subject: `${isUrgent ? 'URGENT: ' : ''}New Appointment Request - JC Dental`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .urgent { background-color: #ff0000; color: white; padding: 10px; text-align: center; font-weight: bold; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              ${isUrgent ? '<div class="urgent">⚠️ URGENT APPOINTMENT REQUEST ⚠️</div>' : ''}
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>New Appointment Request</h2>
                <p>Dear Dr. ${doctorName},</p>
                <p>You have received a new appointment request that requires your review.</p>
                <div class="details">
                  <h3>Patient Information:</h3>
                  <p><strong>Name:</strong> ${patientName}</p>
                  <p><strong>Phone:</strong> ${patientPhone}</p>
                  <p><strong>Email:</strong> ${patientEmail}</p>
                </div>
                <div class="details">
                  <h3>Appointment Details:</h3>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Requested Date:</strong> ${requestedDate}</p>
                  <p><strong>Requested Time:</strong> ${requestedTime}</p>
                  ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
                  ${isUrgent ? '<p style="color: #ff0000;"><strong>⚠️ This is marked as URGENT</strong></p>' : ''}
                </div>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">Review Appointment</a>
                </p>
                <p>Please log in to your account to approve, decline, or suggest an alternative time.</p>
              </div>
              <div class="footer">
                <p>JC Dental Clinic<br>
                Email: Jcdental07@gmail.com<br>
                Website: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${isUrgent ? '⚠️ URGENT APPOINTMENT REQUEST ⚠️\n\n' : ''}Dear Dr. ${doctorName},\n\nYou have received a new appointment request that requires your review.\n\nPatient Information:\n- Name: ${patientName}\n- Phone: ${patientPhone}\n- Email: ${patientEmail}\n\nAppointment Details:\n- Service: ${service}\n- Requested Date: ${requestedDate}\n- Requested Time: ${requestedTime}\n${notes ? `- Notes: ${notes}\n` : ''}${isUrgent ? '⚠️ This is marked as URGENT\n' : ''}\nPlease log in to your account at https://www.jcdental.ge/appointments to approve, decline, or suggest an alternative time.\n\nJC Dental Clinic\nEmail: Jcdental07@gmail.com\nWebsite: https://www.jcdental.ge`
    },
    ka: {
      subject: `${isUrgent ? 'სასწრაფო: ' : ''}ახალი ვიზიტის მოთხოვნა - JC Dental`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .urgent { background-color: #ff0000; color: white; padding: 10px; text-align: center; font-weight: bold; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              ${isUrgent ? '<div class="urgent">⚠️ სასწრაფო ვიზიტის მოთხოვნა ⚠️</div>' : ''}
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>ახალი ვიზიტის მოთხოვნა</h2>
                <p>ძვირფასო დოქტ. ${doctorName},</p>
                <p>თქვენ მიიღეთ ახალი ვიზიტის მოთხოვნა, რომელიც საჭიროებს თქვენს განხილვას.</p>
                <div class="details">
                  <h3>პაციენტის ინფორმაცია:</h3>
                  <p><strong>სახელი:</strong> ${patientName}</p>
                  <p><strong>ტელეფონი:</strong> ${patientPhone}</p>
                  <p><strong>ელფოსტა:</strong> ${patientEmail}</p>
                </div>
                <div class="details">
                  <h3>ვიზიტის დეტალები:</h3>
                  <p><strong>სერვისი:</strong> ${service}</p>
                  <p><strong>მოთხოვნილი თარიღი:</strong> ${requestedDate}</p>
                  <p><strong>მოთხოვნილი დრო:</strong> ${requestedTime}</p>
                  ${notes ? `<p><strong>შენიშვნები:</strong> ${notes}</p>` : ''}
                  ${isUrgent ? '<p style="color: #ff0000;"><strong>⚠️ ეს მონიშნულია როგორც სასწრაფო</strong></p>' : ''}
                </div>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">ვიზიტის განხილვა</a>
                </p>
                <p>გთხოვთ, შეხვიდეთ თქვენს ანგარიშში დასადასტურებლად, უარსაყოფად ან ალტერნატიული დროის შესათავაზებლად.</p>
              </div>
              <div class="footer">
                <p>JC Dental კლინიკა<br>
                ელფოსტა: Jcdental07@gmail.com<br>
                ვებსაიტი: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${isUrgent ? '⚠️ სასწრაფო ვიზიტის მოთხოვნა ⚠️\n\n' : ''}ძვირფასო დოქტ. ${doctorName},\n\nთქვენ მიიღეთ ახალი ვიზიტის მოთხოვნა, რომელიც საჭიროებს თქვენს განხილვას.\n\nპაციენტის ინფორმაცია:\n- სახელი: ${patientName}\n- ტელეფონი: ${patientPhone}\n- ელფოსტა: ${patientEmail}\n\nვიზიტის დეტალები:\n- სერვისი: ${service}\n- მოთხოვნილი თარიღი: ${requestedDate}\n- მოთხოვნილი დრო: ${requestedTime}\n${notes ? `- შენიშვნები: ${notes}\n` : ''}${isUrgent ? '⚠️ ეს მონიშნულია როგორც სასწრაფო\n' : ''}\nგთხოვთ, შეხვიდეთ თქვენს ანგარიშში https://www.jcdental.ge/appointments დასადასტურებლად, უარსაყოფად ან ალტერნატიული დროის შესათავაზებლად.\n\nJC Dental კლინიკა\nელფოსტა: Jcdental07@gmail.com\nვებსაიტი: https://www.jcdental.ge`
    },
    ru: {
      subject: `${isUrgent ? 'СРОЧНО: ' : ''}Новый запрос на прием - JC Dental`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .urgent { background-color: #ff0000; color: white; padding: 10px; text-align: center; font-weight: bold; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              ${isUrgent ? '<div class="urgent">⚠️ СРОЧНЫЙ ЗАПРОС НА ПРИЕМ ⚠️</div>' : ''}
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>Новый запрос на прием</h2>
                <p>Уважаемый доктор ${doctorName},</p>
                <p>Вы получили новый запрос на прием, который требует вашего рассмотрения.</p>
                <div class="details">
                  <h3>Информация о пациенте:</h3>
                  <p><strong>Имя:</strong> ${patientName}</p>
                  <p><strong>Телефон:</strong> ${patientPhone}</p>
                  <p><strong>Email:</strong> ${patientEmail}</p>
                </div>
                <div class="details">
                  <h3>Детали приема:</h3>
                  <p><strong>Услуга:</strong> ${service}</p>
                  <p><strong>Запрошенная дата:</strong> ${requestedDate}</p>
                  <p><strong>Запрошенное время:</strong> ${requestedTime}</p>
                  ${notes ? `<p><strong>Примечания:</strong> ${notes}</p>` : ''}
                  ${isUrgent ? '<p style="color: #ff0000;"><strong>⚠️ Отмечено как СРОЧНО</strong></p>' : ''}
                </div>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">Просмотреть прием</a>
                </p>
                <p>Пожалуйста, войдите в свой аккаунт, чтобы подтвердить, отклонить или предложить альтернативное время.</p>
              </div>
              <div class="footer">
                <p>Клиника JC Dental<br>
                Email: Jcdental07@gmail.com<br>
                Сайт: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${isUrgent ? '⚠️ СРОЧНЫЙ ЗАПРОС НА ПРИЕМ ⚠️\n\n' : ''}Уважаемый доктор ${doctorName},\n\nВы получили новый запрос на прием, который требует вашего рассмотрения.\n\nИнформация о пациенте:\n- Имя: ${patientName}\n- Телефон: ${patientPhone}\n- Email: ${patientEmail}\n\nДетали приема:\n- Услуга: ${service}\n- Запрошенная дата: ${requestedDate}\n- Запрошенное время: ${requestedTime}\n${notes ? `- Примечания: ${notes}\n` : ''}${isUrgent ? '⚠️ Отмечено как СРОЧНО\n' : ''}\nПожалуйста, войдите в свой аккаунт на https://www.jcdental.ge/appointments, чтобы подтвердить, отклонить или предложить альтернативное время.\n\nКлиника JC Dental\nEmail: Jcdental07@gmail.com\nСайт: https://www.jcdental.ge`
    },
    he: {
      subject: `${isUrgent ? 'דחוף: ' : ''}בקשת תור חדשה - JC Dental`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-right: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .urgent { background-color: #ff0000; color: white; padding: 10px; text-align: center; font-weight: bold; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              ${isUrgent ? '<div class="urgent">⚠️ בקשת תור דחופה ⚠️</div>' : ''}
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>בקשת תור חדשה</h2>
                <p>ד"ר ${doctorName} היקר/ה,</p>
                <p>קיבלת בקשת תור חדשה הדורשת את עיונך.</p>
                <div class="details">
                  <h3>מידע על המטופל/ת:</h3>
                  <p><strong>שם:</strong> ${patientName}</p>
                  <p><strong>טלפון:</strong> ${patientPhone}</p>
                  <p><strong>דוא"ל:</strong> ${patientEmail}</p>
                </div>
                <div class="details">
                  <h3>פרטי התור:</h3>
                  <p><strong>שירות:</strong> ${service}</p>
                  <p><strong>תאריך מבוקש:</strong> ${requestedDate}</p>
                  <p><strong>שעה מבוקשת:</strong> ${requestedTime}</p>
                  ${notes ? `<p><strong>הערות:</strong> ${notes}</p>` : ''}
                  ${isUrgent ? '<p style="color: #ff0000;"><strong>⚠️ מסומן כדחוף</strong></p>' : ''}
                </div>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">עיון בתור</a>
                </p>
                <p>נא להתחבר לחשבונך כדי לאשר, לדחות או להציע זמן חלופי.</p>
              </div>
              <div class="footer">
                <p>מרפאת JC Dental<br>
                דוא"ל: Jcdental07@gmail.com<br>
                אתר: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${isUrgent ? '⚠️ בקשת תור דחופה ⚠️\n\n' : ''}ד"ר ${doctorName} היקר/ה,\n\nקיבלת בקשת תור חדשה הדורשת את עיונך.\n\nמידע על המטופל/ת:\n- שם: ${patientName}\n- טלפון: ${patientPhone}\n- דוא"ל: ${patientEmail}\n\nפרטי התור:\n- שירות: ${service}\n- תאריך מבוקש: ${requestedDate}\n- שעה מבוקשת: ${requestedTime}\n${notes ? `- הערות: ${notes}\n` : ''}${isUrgent ? '⚠️ מסומן כדחוף\n' : ''}\nנא להתחבר לחשבונך בכתובת https://www.jcdental.ge/appointments כדי לאשר, לדחות או להציע זמן חלופי.\n\nמרפאת JC Dental\nדוא"ל: Jcdental07@gmail.com\nאתר: https://www.jcdental.ge`
    }
  };

  return templates[language] || templates['en'];
}

export function getAppointmentCreatedEmailForClinic({ patientName, doctorName, service, requestedDate, requestedTime, patientPhone, patientEmail, language = 'en' }) {
  const templates = {
    en: {
      subject: "New Appointment Request - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental - Admin Notification</h1>
              </div>
              <div class="content">
                <h2>New Appointment Request</h2>
                <p>A new appointment has been requested through the online booking system.</p>
                <div class="details">
                  <h3>Appointment Details:</h3>
                  <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Date:</strong> ${requestedDate}</p>
                  <p><strong>Time:</strong> ${requestedTime}</p>
                </div>
                <div class="details">
                  <h3>Patient Details:</h3>
                  <p><strong>Name:</strong> ${patientName}</p>
                  <p><strong>Phone:</strong> ${patientPhone}</p>
                  <p><strong>Email:</strong> ${patientEmail}</p>
                </div>
                <p>The appointment is pending doctor approval.</p>
              </div>
              <div class="footer">
                <p>JC Dental Clinic Admin Notification System</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New Appointment Request - JC Dental\n\nA new appointment has been requested through the online booking system.\n\nAppointment Details:\n- Doctor: Dr. ${doctorName}\n- Service: ${service}\n- Date: ${requestedDate}\n- Time: ${requestedTime}\n\nPatient Details:\n- Name: ${patientName}\n- Phone: ${patientPhone}\n- Email: ${patientEmail}\n\nThe appointment is pending doctor approval.`
    },
    ka: {
      subject: "ახალი ვიზიტის მოთხოვნა - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental - ადმინისტრატორის შეტყობინება</h1>
              </div>
              <div class="content">
                <h2>ახალი ვიზიტის მოთხოვნა</h2>
                <p>ახალი ვიზიტი მოთხოვნილია ონლაინ ჯავშნის სისტემის მეშვეობით.</p>
                <div class="details">
                  <h3>ვიზიტის დეტალები:</h3>
                  <p><strong>ექიმი:</strong> დოქტ. ${doctorName}</p>
                  <p><strong>სერვისი:</strong> ${service}</p>
                  <p><strong>თარიღი:</strong> ${requestedDate}</p>
                  <p><strong>დრო:</strong> ${requestedTime}</p>
                </div>
                <div class="details">
                  <h3>პაციენტის დეტალები:</h3>
                  <p><strong>სახელი:</strong> ${patientName}</p>
                  <p><strong>ტელეფონი:</strong> ${patientPhone}</p>
                  <p><strong>ელფოსტა:</strong> ${patientEmail}</p>
                </div>
                <p>ვიზიტი ელოდება ექიმის დადასტურებას.</p>
              </div>
              <div class="footer">
                <p>JC Dental კლინიკა - ადმინისტრატორის შეტყობინებების სისტემა</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `ახალი ვიზიტის მოთხოვნა - JC Dental\n\nახალი ვიზიტი მოთხოვნილია ონლაინ ჯავშნის სისტემის მეშვეობით.\n\nვიზიტის დეტალები:\n- ექიმი: დოქტ. ${doctorName}\n- სერვისი: ${service}\n- თარიღი: ${requestedDate}\n- დრო: ${requestedTime}\n\nპაციენტის დეტალები:\n- სახელი: ${patientName}\n- ტელეფონი: ${patientPhone}\n- ელფოსტა: ${patientEmail}\n\nვიზიტი ელოდება ექიმის დადასტურებას.`
    },
    ru: {
      subject: "Новый запрос на прием - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental - Уведомление администратора</h1>
              </div>
              <div class="content">
                <h2>Новый запрос на прием</h2>
                <p>Новый прием был запрошен через систему онлайн-бронирования.</p>
                <div class="details">
                  <h3>Детали приема:</h3>
                  <p><strong>Врач:</strong> Доктор ${doctorName}</p>
                  <p><strong>Услуга:</strong> ${service}</p>
                  <p><strong>Дата:</strong> ${requestedDate}</p>
                  <p><strong>Время:</strong> ${requestedTime}</p>
                </div>
                <div class="details">
                  <h3>Данные пациента:</h3>
                  <p><strong>Имя:</strong> ${patientName}</p>
                  <p><strong>Телефон:</strong> ${patientPhone}</p>
                  <p><strong>Email:</strong> ${patientEmail}</p>
                </div>
                <p>Прием ожидает подтверждения врача.</p>
              </div>
              <div class="footer">
                <p>Система уведомлений администратора клиники JC Dental</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Новый запрос на прием - JC Dental\n\nНовый прием был запрошен через систему онлайн-бронирования.\n\nДетали приема:\n- Врач: Доктор ${doctorName}\n- Услуга: ${service}\n- Дата: ${requestedDate}\n- Время: ${requestedTime}\n\nДанные пациента:\n- Имя: ${patientName}\n- Телефон: ${patientPhone}\n- Email: ${patientEmail}\n\nПрием ожидает подтверждения врача.`
    },
    he: {
      subject: "בקשת תור חדשה - JC Dental",
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-right: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental - הודעת מנהל</h1>
              </div>
              <div class="content">
                <h2>בקשת תור חדשה</h2>
                <p>תור חדש התבקש דרך מערכת ההזמנות המקוונת.</p>
                <div class="details">
                  <h3>פרטי התור:</h3>
                  <p><strong>רופא:</strong> ד"ר ${doctorName}</p>
                  <p><strong>שירות:</strong> ${service}</p>
                  <p><strong>תאריך:</strong> ${requestedDate}</p>
                  <p><strong>שעה:</strong> ${requestedTime}</p>
                </div>
                <div class="details">
                  <h3>פרטי המטופל/ת:</h3>
                  <p><strong>שם:</strong> ${patientName}</p>
                  <p><strong>טלפון:</strong> ${patientPhone}</p>
                  <p><strong>דוא"ל:</strong> ${patientEmail}</p>
                </div>
                <p>התור ממתין לאישור הרופא.</p>
              </div>
              <div class="footer">
                <p>מערכת הודעות מנהל מרפאת JC Dental</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `בקשת תור חדשה - JC Dental\n\nתור חדש התבקש דרך מערכת ההזמנות המקוונת.\n\nפרטי התור:\n- רופא: ד"ר ${doctorName}\n- שירות: ${service}\n- תאריך: ${requestedDate}\n- שעה: ${requestedTime}\n\nפרטי המטופל/ת:\n- שם: ${patientName}\n- טלפון: ${patientPhone}\n- דוא"ל: ${patientEmail}\n\nהתור ממתין לאישור הרופא.`
    }
  };

  return templates[language] || templates['en'];
}

export function getAppointmentApprovedEmail({ patientName, doctorName, service, appointmentDate, appointmentTime, language = 'en' }) {
  const templates = {
    en: {
      subject: "Appointment Approved - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #28a745; color: white; border-radius: 3px; }
              .highlight { background-color: #fffbcc; padding: 15px; margin: 15px 0; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>✅ Your Appointment is Confirmed!</h2>
                <p>Dear ${patientName},</p>
                <p>Good news! Your appointment request has been <span class="status">Approved</span> by Dr. ${doctorName}.</p>
                <div class="details">
                  <h3>Confirmed Appointment Details:</h3>
                  <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Date:</strong> ${appointmentDate}</p>
                  <p><strong>Time:</strong> ${appointmentTime}</p>
                </div>
                <div class="highlight">
                  <p><strong>Important Reminders:</strong></p>
                  <ul>
                    <li>Please arrive 10-15 minutes before your scheduled time</li>
                    <li>Bring any relevant medical documents or previous dental records</li>
                    <li>If you need to cancel or reschedule, please contact us at least 24 hours in advance</li>
                  </ul>
                </div>
                <p>We look forward to seeing you!</p>
              </div>
              <div class="footer">
                <p>JC Dental Clinic<br>
                Email: Jcdental07@gmail.com<br>
                Website: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Dear ${patientName},\n\n✅ Your Appointment is Confirmed!\n\nGood news! Your appointment request has been approved by Dr. ${doctorName}.\n\nConfirmed Appointment Details:\n- Doctor: Dr. ${doctorName}\n- Service: ${service}\n- Date: ${appointmentDate}\n- Time: ${appointmentTime}\n\nImportant Reminders:\n- Please arrive 10-15 minutes before your scheduled time\n- Bring any relevant medical documents or previous dental records\n- If you need to cancel or reschedule, please contact us at least 24 hours in advance\n\nWe look forward to seeing you!\n\nJC Dental Clinic\nEmail: Jcdental07@gmail.com\nWebsite: https://www.jcdental.ge`
    },
    ka: {
      subject: "ვიზიტი დამტკიცებულია - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #28a745; color: white; border-radius: 3px; }
              .highlight { background-color: #fffbcc; padding: 15px; margin: 15px 0; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>✅ თქვენი ვიზიტი დადასტურებულია!</h2>
                <p>ძვირფასო ${patientName},</p>
                <p>კარგი ამბავი! თქვენი ვიზიტის მოთხოვნა <span class="status">დამტკიცდა</span> დოქტ. ${doctorName}-ის მიერ.</p>
                <div class="details">
                  <h3>დადასტურებული ვიზიტის დეტალები:</h3>
                  <p><strong>ექიმი:</strong> დოქტ. ${doctorName}</p>
                  <p><strong>სერვისი:</strong> ${service}</p>
                  <p><strong>თარიღი:</strong> ${appointmentDate}</p>
                  <p><strong>დრო:</strong> ${appointmentTime}</p>
                </div>
                <div class="highlight">
                  <p><strong>მნიშვნელოვანი შეხსენებები:</strong></p>
                  <ul>
                    <li>გთხოვთ, მობრძანდეთ დანიშნულ დროზე 10-15 წუთით ადრე</li>
                    <li>წამოიღეთ რელევანტური სამედიცინო დოკუმენტები ან წინა სტომატოლოგიური ჩანაწერები</li>
                    <li>თუ გჭირდებათ ვიზიტის გაუქმება ან გადატანა, გთხოვთ დაგვიკავშირდეთ მინიმუმ 24 საათით ადრე</li>
                  </ul>
                </div>
                <p>ველით თქვენს ვიზიტს!</p>
              </div>
              <div class="footer">
                <p>JC Dental კლინიკა<br>
                ელფოსტა: Jcdental07@gmail.com<br>
                ვებსაიტი: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `ძვირფასო ${patientName},\n\n✅ თქვენი ვიზიტი დადასტურებულია!\n\nკარგი ამბავი! თქვენი ვიზიტის მოთხოვნა დამტკიცდა დოქტ. ${doctorName}-ის მიერ.\n\nდადასტურებული ვიზიტის დეტალები:\n- ექიმი: დოქტ. ${doctorName}\n- სერვისი: ${service}\n- თარიღი: ${appointmentDate}\n- დრო: ${appointmentTime}\n\nმნიშვნელოვანი შეხსენებები:\n- გთხოვთ, მობრძანდეთ დანიშნულ დროზე 10-15 წუთით ადრე\n- წამოიღეთ რელევანტური სამედიცინო დოკუმენტები ან წინა სტომატოლოგიური ჩანაწერები\n- თუ გჭირდებათ ვიზიტის გაუქმება ან გადატანა, გთხოვთ დაგვიკავშირდეთ მინიმუმ 24 საათით ადრე\n\nველით თქვენს ვიზიტს!\n\nJC Dental კლინიკა\nელფოსტა: Jcdental07@gmail.com\nვებსაიტი: https://www.jcdental.ge`
    },
    ru: {
      subject: "Прием подтвержден - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #28a745; color: white; border-radius: 3px; }
              .highlight { background-color: #fffbcc; padding: 15px; margin: 15px 0; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>✅ Ваш прием подтвержден!</h2>
                <p>Уважаемый(ая) ${patientName},</p>
                <p>Хорошие новости! Ваш запрос на прием был <span class="status">одобрен</span> доктором ${doctorName}.</p>
                <div class="details">
                  <h3>Подтвержденные детали приема:</h3>
                  <p><strong>Врач:</strong> Доктор ${doctorName}</p>
                  <p><strong>Услуга:</strong> ${service}</p>
                  <p><strong>Дата:</strong> ${appointmentDate}</p>
                  <p><strong>Время:</strong> ${appointmentTime}</p>
                </div>
                <div class="highlight">
                  <p><strong>Важные напоминания:</strong></p>
                  <ul>
                    <li>Пожалуйста, приходите за 10-15 минут до назначенного времени</li>
                    <li>Принесите соответствующие медицинские документы или предыдущие стоматологические записи</li>
                    <li>Если вам нужно отменить или перенести прием, пожалуйста, свяжитесь с нами минимум за 24 часа</li>
                  </ul>
                </div>
                <p>С нетерпением ждем встречи с вами!</p>
              </div>
              <div class="footer">
                <p>Клиника JC Dental<br>
                Email: Jcdental07@gmail.com<br>
                Сайт: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Уважаемый(ая) ${patientName},\n\n✅ Ваш прием подтвержден!\n\nХорошие новости! Ваш запрос на прием был одобрен доктором ${doctorName}.\n\nПодтвержденные детали приема:\n- Врач: Доктор ${doctorName}\n- Услуга: ${service}\n- Дата: ${appointmentDate}\n- Время: ${appointmentTime}\n\nВажные напоминания:\n- Пожалуйста, приходите за 10-15 минут до назначенного времени\n- Принесите соответствующие медицинские документы или предыдущие стоматологические записи\n- Если вам нужно отменить или перенести прием, пожалуйста, свяжитесь с нами минимум за 24 часа\n\nС нетерпением ждем встречи с вами!\n\nКлиника JC Dental\nEmail: Jcdental07@gmail.com\nСайт: https://www.jcdental.ge`
    },
    he: {
      subject: "התור אושר - JC Dental",
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-right: 4px solid #28a745; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .status { display: inline-block; padding: 5px 10px; background-color: #28a745; color: white; border-radius: 3px; }
              .highlight { background-color: #fffbcc; padding: 15px; margin: 15px 0; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>✅ התור שלך אושר!</h2>
                <p>${patientName} היקר/ה,</p>
                <p>חדשות טובות! בקשת התור שלך <span class="status">אושרה</span> על ידי ד"ר ${doctorName}.</p>
                <div class="details">
                  <h3>פרטי התור המאושר:</h3>
                  <p><strong>רופא:</strong> ד"ר ${doctorName}</p>
                  <p><strong>שירות:</strong> ${service}</p>
                  <p><strong>תאריך:</strong> ${appointmentDate}</p>
                  <p><strong>שעה:</strong> ${appointmentTime}</p>
                </div>
                <div class="highlight">
                  <p><strong>תזכורות חשובות:</strong></p>
                  <ul>
                    <li>נא להגיע 10-15 דקות לפני השעה שנקבעה</li>
                    <li>יש להביא מסמכים רפואיים רלוונטיים או רישומים דנטליים קודמים</li>
                    <li>אם יש צורך לבטל או לשנות את התור, נא ליצור קשר לפחות 24 שעות מראש</li>
                  </ul>
                </div>
                <p>מצפים לראותך!</p>
              </div>
              <div class="footer">
                <p>מרפאת JC Dental<br>
                דוא"ל: Jcdental07@gmail.com<br>
                אתר: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${patientName} היקר/ה,\n\n✅ התור שלך אושר!\n\nחדשות טובות! בקשת התור שלך אושרה על ידי ד"ר ${doctorName}.\n\nפרטי התור המאושר:\n- רופא: ד"ר ${doctorName}\n- שירות: ${service}\n- תאריך: ${appointmentDate}\n- שעה: ${appointmentTime}\n\nתזכורות חשובות:\n- נא להגיע 10-15 דקות לפני השעה שנקבעה\n- יש להביא מסמכים רפואיים רלוונטיים או רישומים דנטליים קודמים\n- אם יש צורך לבטל או לשנות את התור, נא ליצור קשר לפחות 24 שעות מראש\n\nמצפים לראותך!\n\nמרפאת JC Dental\nדוא"ל: Jcdental07@gmail.com\nאתר: https://www.jcdental.ge`
    }
  };

  return templates[language] || templates['en'];
}

export function getAppointmentDeclinedEmail({ patientName, doctorName, service, requestedDate, requestedTime, reason, language = 'en' }) {
  const templates = {
    en: {
      subject: "Appointment Request Update - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #dc3545; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .reason-box { background-color: #fff3cd; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #ffc107; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>Appointment Request Update</h2>
                <p>Dear ${patientName},</p>
                <p>We regret to inform you that your appointment request could not be accommodated at this time.</p>
                <div class="details">
                  <h3>Requested Appointment:</h3>
                  <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Requested Date:</strong> ${requestedDate}</p>
                  <p><strong>Requested Time:</strong> ${requestedTime}</p>
                </div>
                <div class="reason-box">
                  <h3>Reason:</h3>
                  <p>${reason}</p>
                </div>
                <p>We apologize for any inconvenience this may cause. We encourage you to:</p>
                <ul>
                  <li>Book another appointment with a different date or time</li>
                  <li>Contact us directly to discuss alternative options</li>
                  <li>Check with another available doctor if urgent care is needed</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/booking" class="action-button">Book Another Appointment</a>
                </p>
              </div>
              <div class="footer">
                <p>JC Dental Clinic<br>
                Email: Jcdental07@gmail.com<br>
                Website: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Dear ${patientName},\n\nAppointment Request Update\n\nWe regret to inform you that your appointment request could not be accommodated at this time.\n\nRequested Appointment:\n- Doctor: Dr. ${doctorName}\n- Service: ${service}\n- Requested Date: ${requestedDate}\n- Requested Time: ${requestedTime}\n\nReason: ${reason}\n\nWe apologize for any inconvenience this may cause. We encourage you to:\n- Book another appointment with a different date or time\n- Contact us directly to discuss alternative options\n- Check with another available doctor if urgent care is needed\n\nVisit https://www.jcdental.ge/booking to book another appointment.\n\nJC Dental Clinic\nEmail: Jcdental07@gmail.com\nWebsite: https://www.jcdental.ge`
    },
    ka: {
      subject: "ვიზიტის მოთხოვნის განახლება - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #dc3545; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .reason-box { background-color: #fff3cd; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #ffc107; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>ვიზიტის მოთხოვნის განახლება</h2>
                <p>ძვირფასო ${patientName},</p>
                <p>სამწუხაროდ, თქვენი ვიზიტის მოთხოვნა ამ დროს ვერ მოხერხდა.</p>
                <div class="details">
                  <h3>მოთხოვნილი ვიზიტი:</h3>
                  <p><strong>ექიმი:</strong> დოქტ. ${doctorName}</p>
                  <p><strong>სერვისი:</strong> ${service}</p>
                  <p><strong>მოთხოვნილი თარიღი:</strong> ${requestedDate}</p>
                  <p><strong>მოთხოვნილი დრო:</strong> ${requestedTime}</p>
                </div>
                <div class="reason-box">
                  <h3>მიზეზი:</h3>
                  <p>${reason}</p>
                </div>
                <p>ვწუხვართ შეფერხებისთვის. გირჩევთ:</p>
                <ul>
                  <li>დაჯავშნოთ სხვა ვიზიტი განსხვავებული თარიღით ან დროით</li>
                  <li>დაგვიკავშირდეთ პირდაპირ ალტერნატიული ვარიანტების განსახილველად</li>
                  <li>შეამოწმოთ სხვა ხელმისაწვდომი ექიმი, თუ სასწრაფო დახმარება გჭირდებათ</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/booking" class="action-button">სხვა ვიზიტის დაჯავშნა</a>
                </p>
              </div>
              <div class="footer">
                <p>JC Dental კლინიკა<br>
                ელფოსტა: Jcdental07@gmail.com<br>
                ვებსაიტი: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `ძვირფასო ${patientName},\n\nვიზიტის მოთხოვნის განახლება\n\nსამწუხაროდ, თქვენი ვიზიტის მოთხოვნა ამ დროს ვერ მოხერხდა.\n\nმოთხოვნილი ვიზიტი:\n- ექიმი: დოქტ. ${doctorName}\n- სერვისი: ${service}\n- მოთხოვნილი თარიღი: ${requestedDate}\n- მოთხოვნილი დრო: ${requestedTime}\n\nმიზეზი: ${reason}\n\nვწუხვართ შეფერხებისთვის. გირჩევთ:\n- დაჯავშნოთ სხვა ვიზიტი განსხვავებული თარიღით ან დროით\n- დაგვიკავშირდეთ პირდაპირ ალტერნატიული ვარიანტების განსახილველად\n- შეამოწმოთ სხვა ხელმისაწვდომი ექიმი, თუ სასწრაფო დახმარება გჭირდებათ\n\nეწვიეთ https://www.jcdental.ge/booking სხვა ვიზიტის დასაჯავშნად.\n\nJC Dental კლინიკა\nელფოსტა: Jcdental07@gmail.com\nვებსაიტი: https://www.jcdental.ge`
    },
    ru: {
      subject: "Обновление запроса на прием - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #dc3545; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .reason-box { background-color: #fff3cd; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #ffc107; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>Обновление запроса на прием</h2>
                <p>Уважаемый(ая) ${patientName},</p>
                <p>К сожалению, ваш запрос на прием не может быть удовлетворен в данное время.</p>
                <div class="details">
                  <h3>Запрошенный прием:</h3>
                  <p><strong>Врач:</strong> Доктор ${doctorName}</p>
                  <p><strong>Услуга:</strong> ${service}</p>
                  <p><strong>Запрошенная дата:</strong> ${requestedDate}</p>
                  <p><strong>Запрошенное время:</strong> ${requestedTime}</p>
                </div>
                <div class="reason-box">
                  <h3>Причина:</h3>
                  <p>${reason}</p>
                </div>
                <p>Приносим извинения за возможные неудобства. Мы рекомендуем вам:</p>
                <ul>
                  <li>Забронировать другой прием на другую дату или время</li>
                  <li>Связаться с нами напрямую для обсуждения альтернативных вариантов</li>
                  <li>Обратиться к другому доступному врачу, если требуется срочная помощь</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/booking" class="action-button">Забронировать другой прием</a>
                </p>
              </div>
              <div class="footer">
                <p>Клиника JC Dental<br>
                Email: Jcdental07@gmail.com<br>
                Сайт: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Уважаемый(ая) ${patientName},\n\nОбновление запроса на прием\n\nК сожалению, ваш запрос на прием не может быть удовлетворен в данное время.\n\nЗапрошенный прием:\n- Врач: Доктор ${doctorName}\n- Услуга: ${service}\n- Запрошенная дата: ${requestedDate}\n- Запрошенное время: ${requestedTime}\n\nПричина: ${reason}\n\nПриносим извинения за возможные неудобства. Мы рекомендуем вам:\n- Забронировать другой прием на другую дату или время\n- Связаться с нами напрямую для обсуждения альтернативных вариантов\n- Обратиться к другому доступному врачу, если требуется срочная помощь\n\nПосетите https://www.jcdental.ge/booking чтобы забронировать другой прием.\n\nКлиника JC Dental\nEmail: Jcdental07@gmail.com\nСайт: https://www.jcdental.ge`
    },
    he: {
      subject: "עדכון בקשת תור - JC Dental",
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-right: 4px solid #dc3545; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .reason-box { background-color: #fff3cd; padding: 15px; margin: 15px 0; border-radius: 5px; border-right: 4px solid #ffc107; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>עדכון בקשת תור</h2>
                <p>${patientName} היקר/ה,</p>
                <p>אנו מצטערים להודיע שלא ניתן לקיים את בקשת התור שלך בזמן זה.</p>
                <div class="details">
                  <h3>התור המבוקש:</h3>
                  <p><strong>רופא:</strong> ד"ר ${doctorName}</p>
                  <p><strong>שירות:</strong> ${service}</p>
                  <p><strong>תאריך מבוקש:</strong> ${requestedDate}</p>
                  <p><strong>שעה מבוקשת:</strong> ${requestedTime}</p>
                </div>
                <div class="reason-box">
                  <h3>סיבה:</h3>
                  <p>${reason}</p>
                </div>
                <p>אנו מתנצלים על אי הנוחות. אנו ממליצים:</p>
                <ul>
                  <li>לקבוע תור נוסף בתאריך או שעה שונים</li>
                  <li>ליצור קשר ישיר איתנו לדיון באפשרויות חלופיות</li>
                  <li>לבדוק עם רופא זמין אחר אם נדרש טיפול דחוף</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/booking" class="action-button">קביעת תור נוסף</a>
                </p>
              </div>
              <div class="footer">
                <p>מרפאת JC Dental<br>
                דוא"ל: Jcdental07@gmail.com<br>
                אתר: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${patientName} היקר/ה,\n\nעדכון בקשת תור\n\nאנו מצטערים להודיע שלא ניתן לקיים את בקשת התור שלך בזמן זה.\n\nהתור המבוקש:\n- רופא: ד"ר ${doctorName}\n- שירות: ${service}\n- תאריך מבוקש: ${requestedDate}\n- שעה מבוקשת: ${requestedTime}\n\nסיבה: ${reason}\n\nאנו מתנצלים על אי הנוחות. אנו ממליצים:\n- לקבוע תור נוסף בתאריך או שעה שונים\n- ליצור קשר ישיר איתנו לדיון באפשרויות חלופיות\n- לבדוק עם רופא זמין אחר אם נדרש טיפול דחוף\n\nבקר/י בכתובת https://www.jcdental.ge/booking לקביעת תור נוסף.\n\nמרפאת JC Dental\nדוא"ל: Jcdental07@gmail.com\nאתר: https://www.jcdental.ge`
    }
  };

  return templates[language] || templates['en'];
}

export function getAppointmentCounterOfferEmail({ patientName, doctorName, service, originalDate, originalTime, counterOfferDate, counterOfferTime, reason, language = 'en' }) {
  const templates = {
    en: {
      subject: "Alternative Time Suggested for Your Appointment - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .counter-offer { background-color: #d4edda; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #28a745; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
              .decline-button { display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>Alternative Time Suggested</h2>
                <p>Dear ${patientName},</p>
                <p>Dr. ${doctorName} has reviewed your appointment request and suggested an alternative time that may work better.</p>
                <div class="details">
                  <h3>Your Original Request:</h3>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Date:</strong> ${originalDate}</p>
                  <p><strong>Time:</strong> ${originalTime}</p>
                </div>
                <div class="counter-offer">
                  <h3>✨ Suggested Alternative:</h3>
                  <p><strong>Date:</strong> ${counterOfferDate}</p>
                  <p><strong>Time:</strong> ${counterOfferTime}</p>
                  ${reason ? `<p><strong>Note:</strong> ${reason}</p>` : ''}
                </div>
                <p><strong>Please review and respond:</strong></p>
                <ul>
                  <li>If the suggested time works for you, please accept the counter offer</li>
                  <li>If it doesn't work, you can decline and book a different appointment</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">Accept Alternative Time</a>
                  <a href="https://www.jcdental.ge/appointments" class="decline-button">Decline</a>
                </p>
                <p>Please respond as soon as possible to secure your appointment.</p>
              </div>
              <div class="footer">
                <p>JC Dental Clinic<br>
                Email: Jcdental07@gmail.com<br>
                Website: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Dear ${patientName},\n\nAlternative Time Suggested\n\nDr. ${doctorName} has reviewed your appointment request and suggested an alternative time that may work better.\n\nYour Original Request:\n- Service: ${service}\n- Date: ${originalDate}\n- Time: ${originalTime}\n\n✨ Suggested Alternative:\n- Date: ${counterOfferDate}\n- Time: ${counterOfferTime}\n${reason ? `Note: ${reason}\n` : ''}\nPlease review and respond:\n- If the suggested time works for you, please accept the counter offer\n- If it doesn't work, you can decline and book a different appointment\n\nVisit https://www.jcdental.ge/appointments to accept or decline.\n\nPlease respond as soon as possible to secure your appointment.\n\nJC Dental Clinic\nEmail: Jcdental07@gmail.com\nWebsite: https://www.jcdental.ge`
    },
    ka: {
      subject: "შემოთავაზებულია ალტერნატიული დრო - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .counter-offer { background-color: #d4edda; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #28a745; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
              .decline-button { display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>შემოთავაზებულია ალტერნატიული დრო</h2>
                <p>ძვირფასო ${patientName},</p>
                <p>დოქტ. ${doctorName}-მა განიხილა თქვენი ვიზიტის მოთხოვნა და შემოგთავაზათ ალტერნატიული დრო, რომელიც შეიძლება უკეთ გამოგადგეთ.</p>
                <div class="details">
                  <h3>თქვენი თავდაპირველი მოთხოვნა:</h3>
                  <p><strong>სერვისი:</strong> ${service}</p>
                  <p><strong>თარიღი:</strong> ${originalDate}</p>
                  <p><strong>დრო:</strong> ${originalTime}</p>
                </div>
                <div class="counter-offer">
                  <h3>✨ შემოთავაზებული ალტერნატივა:</h3>
                  <p><strong>თარიღი:</strong> ${counterOfferDate}</p>
                  <p><strong>დრო:</strong> ${counterOfferTime}</p>
                  ${reason ? `<p><strong>შენიშვნა:</strong> ${reason}</p>` : ''}
                </div>
                <p><strong>გთხოვთ, განიხილოთ და უპასუხოთ:</strong></p>
                <ul>
                  <li>თუ შემოთავაზებული დრო გამოგადგებათ, მიიღეთ ალტერნატიული შეთავაზება</li>
                  <li>თუ არ გამოგადგებათ, შეგიძლიათ უარყოთ და დაჯავშნოთ სხვა ვიზიტი</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">ალტერნატიული დროის მიღება</a>
                  <a href="https://www.jcdental.ge/appointments" class="decline-button">უარყოფა</a>
                </p>
                <p>გთხოვთ, უპასუხოთ რაც შეიძლება მალე თქვენი ვიზიტის დასაცავად.</p>
              </div>
              <div class="footer">
                <p>JC Dental კლინიკა<br>
                ელფოსტა: Jcdental07@gmail.com<br>
                ვებსაიტი: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `ძვირფასო ${patientName},\n\nშემოთავაზებულია ალტერნატიული დრო\n\nდოქტ. ${doctorName}-მა განიხილა თქვენი ვიზიტის მოთხოვნა და შემოგთავაზათ ალტერნატიული დრო, რომელიც შეიძლება უკეთ გამოგადგეთ.\n\nთქვენი თავდაპირველი მოთხოვნა:\n- სერვისი: ${service}\n- თარიღი: ${originalDate}\n- დრო: ${originalTime}\n\n✨ შემოთავაზებული ალტერნატივა:\n- თარიღი: ${counterOfferDate}\n- დრო: ${counterOfferTime}\n${reason ? `შენიშვნა: ${reason}\n` : ''}\nგთხოვთ, განიხილოთ და უპასუხოთ:\n- თუ შემოთავაზებული დრო გამოგადგებათ, მიიღეთ ალტერნატიული შეთავაზება\n- თუ არ გამოგადგებათ, შეგიძლიათ უარყოთ და დაჯავშნოთ სხვა ვიზიტი\n\nეწვიეთ https://www.jcdental.ge/appointments მისაღებად ან უარსაყოფად.\n\nგთხოვთ, უპასუხოთ რაც შეიძლება მალე თქვენი ვიზიტის დასაცავად.\n\nJC Dental კლინიკა\nელფოსტა: Jcdental07@gmail.com\nვებსაიტი: https://www.jcdental.ge`
    },
    ru: {
      subject: "Предложено альтернативное время для вашего приема - JC Dental",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .counter-offer { background-color: #d4edda; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #28a745; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
              .decline-button { display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>Предложено альтернативное время</h2>
                <p>Уважаемый(ая) ${patientName},</p>
                <p>Доктор ${doctorName} рассмотрел ваш запрос на прием и предложил альтернативное время, которое может лучше подойти.</p>
                <div class="details">
                  <h3>Ваш первоначальный запрос:</h3>
                  <p><strong>Услуга:</strong> ${service}</p>
                  <p><strong>Дата:</strong> ${originalDate}</p>
                  <p><strong>Время:</strong> ${originalTime}</p>
                </div>
                <div class="counter-offer">
                  <h3>✨ Предложенная альтернатива:</h3>
                  <p><strong>Дата:</strong> ${counterOfferDate}</p>
                  <p><strong>Время:</strong> ${counterOfferTime}</p>
                  ${reason ? `<p><strong>Примечание:</strong> ${reason}</p>` : ''}
                </div>
                <p><strong>Пожалуйста, рассмотрите и ответьте:</strong></p>
                <ul>
                  <li>Если предложенное время вам подходит, пожалуйста, примите альтернативное предложение</li>
                  <li>Если не подходит, вы можете отклонить и забронировать другой прием</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">Принять альтернативное время</a>
                  <a href="https://www.jcdental.ge/appointments" class="decline-button">Отклонить</a>
                </p>
                <p>Пожалуйста, ответьте как можно скорее, чтобы обеспечить ваш прием.</p>
              </div>
              <div class="footer">
                <p>Клиника JC Dental<br>
                Email: Jcdental07@gmail.com<br>
                Сайт: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Уважаемый(ая) ${patientName},\n\nПредложено альтернативное время\n\nДоктор ${doctorName} рассмотрел ваш запрос на прием и предложил альтернативное время, которое может лучше подойти.\n\nВаш первоначальный запрос:\n- Услуга: ${service}\n- Дата: ${originalDate}\n- Время: ${originalTime}\n\n✨ Предложенная альтернатива:\n- Дата: ${counterOfferDate}\n- Время: ${counterOfferTime}\n${reason ? `Примечание: ${reason}\n` : ''}\nПожалуйста, рассмотрите и ответьте:\n- Если предложенное время вам подходит, пожалуйста, примите альтернативное предложение\n- Если не подходит, вы можете отклонить и забронировать другой прием\n\nПосетите https://www.jcdental.ge/appointments чтобы принять или отклонить.\n\nПожалуйста, ответьте как можно скорее, чтобы обеспечить ваш прием.\n\nКлиника JC Dental\nEmail: Jcdental07@gmail.com\nСайт: https://www.jcdental.ge`
    },
    he: {
      subject: "הוצע זמן חלופי לתור - JC Dental",
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .details { background-color: white; padding: 15px; margin: 15px 0; border-right: 4px solid #0066cc; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .counter-offer { background-color: #d4edda; padding: 15px; margin: 15px 0; border-radius: 5px; border-right: 4px solid #28a745; }
              .action-button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
              .decline-button { display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>JC Dental</h1>
              </div>
              <div class="content">
                <h2>הוצע זמן חלופי</h2>
                <p>${patientName} היקר/ה,</p>
                <p>ד"ר ${doctorName} בדק את בקשת התור שלך והציע זמן חלופי שעשוי להתאים יותר.</p>
                <div class="details">
                  <h3>הבקשה המקורית שלך:</h3>
                  <p><strong>שירות:</strong> ${service}</p>
                  <p><strong>תאריך:</strong> ${originalDate}</p>
                  <p><strong>שעה:</strong> ${originalTime}</p>
                </div>
                <div class="counter-offer">
                  <h3>✨ חלופה מוצעת:</h3>
                  <p><strong>תאריך:</strong> ${counterOfferDate}</p>
                  <p><strong>שעה:</strong> ${counterOfferTime}</p>
                  ${reason ? `<p><strong>הערה:</strong> ${reason}</p>` : ''}
                </div>
                <p><strong>נא לבדוק ולהגיב:</strong></p>
                <ul>
                  <li>אם הזמן המוצע מתאים לך, נא לאשר את ההצעה החלופית</li>
                  <li>אם לא מתאים, ניתן לדחות ולקבוע תור אחר</li>
                </ul>
                <p style="text-align: center;">
                  <a href="https://www.jcdental.ge/appointments" class="action-button">אישור זמן חלופי</a>
                  <a href="https://www.jcdental.ge/appointments" class="decline-button">דחייה</a>
                </p>
                <p>נא להגיב בהקדם האפשרי כדי להבטיח את התור שלך.</p>
              </div>
              <div class="footer">
                <p>מרפאת JC Dental<br>
                דוא"ל: Jcdental07@gmail.com<br>
                אתר: https://www.jcdental.ge</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `${patientName} היקר/ה,\n\nהוצע זמן חלופי\n\nד"ר ${doctorName} בדק את בקשת התור שלך והציע זמן חלופי שעשוי להתאים יותר.\n\nהבקשה המקורית שלך:\n- שירות: ${service}\n- תאריך: ${originalDate}\n- שעה: ${originalTime}\n\n✨ חלופה מוצעת:\n- תאריך: ${counterOfferDate}\n- שעה: ${counterOfferTime}\n${reason ? `הערה: ${reason}\n` : ''}\nנא לבדוק ולהגיב:\n- אם הזמן המוצע מתאים לך, נא לאשר את ההצעה החלופית\n- אם לא מתאים, ניתן לדחות ולקבוע תור אחר\n\nבקר/י בכתובת https://www.jcdental.ge/appointments כדי לאשר או לדחות.\n\nנא להגיב בהקדם האפשרי כדי להבטיח את התור שלך.\n\nמרפאת JC Dental\nדוא"ל: Jcdental07@gmail.com\nאתר: https://www.jcdental.ge`
    }
  };

  return templates[language] || templates['en'];
}
