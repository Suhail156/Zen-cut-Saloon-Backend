import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
// import logger from '../utils/logger/logger';
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadTemplate = (email, data) => {
  const filePath = path.join(__dirname, "../View", `${email}.html`);
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
};

export const sendmail = async (data) => {
  const htmlContent = loadTemplate("email", data);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.email_password,
    },
  });

  const mailOptions = {
    from: process.env.email,
    to: data.email,
    subject: data.subject,
    text: data.text,
    html: htmlContent,
  };

 // transporter.sendMail(mailOptions, function (error, info) {
   // if (error) {
   //   logger.error(error);
   // } else {
    //  logger.info("Email sent: " + info.response);
    //}

    transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);  // Replaced logger.error
    } else {
      console.info("Email sent:", info.response);    // Replaced logger.info
    }
  });

  });
};
