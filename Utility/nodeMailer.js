import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
// import logger from '../utils/logger/logger';
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const \_\_filename = fileURLToPath(import.meta.url);
const \_\_dirname = path.dirname(\_\_filename);

const loadTemplate = (email, data) => {
const filePath = path.join(\_\_dirname, "../View", `${email}.html`);
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
pass: process.env.email\_password,
},
});

const mailOptions = {
from: process.env.email,
to: data.email,
subject: data.subject,
text: data.text,
html: htmlContent,
};

transporter.sendMail(mailOptions, function (error, info) {
if (error) {
console.log(error)
} else {
console.log(error)
}
});
};
