import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { OrderEmail } from "@/components/orderEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { items, billingInfo } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const orderDate = new Date().toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const emailHtml = await render(
    <OrderEmail
      items={items}
      customerName={`${billingInfo.name} ${billingInfo.surname}`}
      orderDate={orderDate}
      billingInfo={billingInfo}
    />,
  );

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: "kuhaku.blank.rd@gmail.com",
    replyTo: billingInfo.email,
    subject: `New Order from ${billingInfo.name} ${billingInfo.surname} — ${orderDate}`,
    html: emailHtml,
  });

  return NextResponse.json({ success: true });
}
