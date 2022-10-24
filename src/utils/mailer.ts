import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_ADDRESS,
    pass: process.env.MAILER_PASSWORD,
  },
});

export default function sendMessage(
  email: string,
  subject: string,
  html: string
) {
  try {
    if (!email) return;
    let message = {
      from: "Authentication Services <cuireviews5@gmail.com>",
      to: email,
      subject: subject,
      html: html,
    };
    transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
}
