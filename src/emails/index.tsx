import { render } from "@react-email/render";
import emailjs from "emailjs-com";
import { JSX } from "react";

export const sendEmail = async (
  userName: string,
  toEmail: string,
  email: JSX.Element
) => {
  const html = render(email);

  const templateParams = {
    to_email: toEmail,
    message_html: html,
  };

  await emailjs.send(
    "your_service_id",
    "your_template_id",
    templateParams,
    "your_public_key"
  );
};
