import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { OrderEmail } from "@/components/orderEmail";
import { BillingInfo } from "@/lib/types/types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail({
  items,
  customerName,
  customerEmail,
  billingInfo,
}: {
  items: any[];
  customerName: string;
  customerEmail: string;
  billingInfo: BillingInfo;
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
      billingInfo={billingInfo}
    />,
  );

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "kuhaku.blank.rd@gmail.com",
    replyTo: customerEmail,
    subject: `New Order from ${customerName} — ${orderDate}`,
    html: emailHtml,
  });
}
