import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { OrderEmail } from "@/components/orderEmail";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail({
  items,
  customerName,
  customerEmail,
}: {
  items: any[];
  customerName: string;
  customerEmail: string;
}) {
  const orderDate = new Date().toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const emailHtml = await render(
    <OrderEmail
      items={items}
      customerName={customerName}
      orderDate={orderDate}
    />,
  );

  await transporter.sendMail({
    from: process.env.SMTP_FROM, // e.g. orders@yourbakery.com
    to: "kuhaku.blank.rd@gmail.com", // baker's email
    replyTo: customerEmail, // so baker can reply to customer
    subject: `New Order from ${customerName} — ${orderDate}`,
    html: emailHtml,
  });
}
