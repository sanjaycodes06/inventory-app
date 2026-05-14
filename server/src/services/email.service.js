import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  jsonTransport: true,
});

export async function sendMail({ to, subject, text }) {
  return transporter.sendMail({ from: "inventory@localhost", to, subject, text });
}
