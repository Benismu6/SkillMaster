const nodemailer = require('nodemailer');
const twilio = require('twilio');

class NotificationService {
  constructor() {
    // Email transporter setup
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Twilio SMS setup (optional)
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID, 
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  // Send email notification
  async sendEmailNotification(options) {
    const mailOptions = {
      from: 'SkillShare <noreply@skillshare.com>',
      to: options.to,
      subject: options.subject,
      html: this.constructEmailTemplate(options)
    };

    try {
      await this.emailTransporter.sendMail(mailOptions);
      console.log(`Email sent to ${options.to}`);
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  // Send SMS notification
  async sendSMSNotification(phoneNumber, message) {
    try {
      await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
      console.log(`SMS sent to ${phoneNumber}`);
    } catch (error) {
      console.error('SMS sending failed:', error);
    }
  }

  // Email template constructor
  constructEmailTemplate(options) {
    return `
      <!DOCTYPE html>
      <html>
        <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>${options.subject}</h1>
            <p>${options.content}</p>
            ${options.actionButton ? `
              <a href="${options.actionButton.link}" style="
                display: inline-block; 
                padding: 10px 20px; 
                background-color: #007bff; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px;
              ">
                ${options.actionButton.text}
              </a>
            ` : ''}
          </div>
        </body>
      </html>
    `;
  }
  // Helper function to check if a course starts soon
  isCourseSoon(startDate) {
    const now = new Date();
    const courseStart = new Date(startDate);
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return (courseStart - now) <= oneDayInMs && courseStart > now;
  }

  // Scheduled Notifications
  scheduleNotifications(user) {
    // Example: Course reminder
    const upcomingCourses = user.enrolledCourses.filter(course => 
      this.isCourseSoon(course.startDate)
    );

    for (const course of upcomingCourses) {
        // Send email notification
        this.sendEmailNotification({
          to: user.email,
          subject: `Reminder: ${course.name} starts soon!`,
          content: `Hi ${user.name}, just a reminder that your course "${course.name}" starts on ${new Date(course.startDate).toLocaleDateString()}.`,
          actionButton: {
            text: 'View Course',
            link: `https://skillshare.com/courses/${course.id}`
          }
        });
  
        // Send SMS notification
        if (user.phoneNumber) {
          this.sendSMSNotification(
            user.phoneNumber,
            `Reminder: Your course "${course.name}" starts on ${new Date(course.startDate).toLocaleDateString()}.`
          );
        }
      }
    }
  }