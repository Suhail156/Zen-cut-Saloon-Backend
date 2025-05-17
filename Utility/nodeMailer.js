import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

// Fixing __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to load and compile the HTML template using Handlebars
const loadTemplate = (templateName, data) => {
  const filePath = path.join(__dirname, "../View", `${templateName}.html`);
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
};

// Send mail function
export const sendmail = async (data) => {
  try {
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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (err) {
    console.error("Error in sendmail function:", err);
  }
};
