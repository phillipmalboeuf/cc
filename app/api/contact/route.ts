import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const data: {
    [key: string]: string
  } = {}
  formData.forEach((d: any, k: string) => data[k] = d )

  const transporter = nodemailer.createTransport({
    host: "smtp.postmarkapp.com",
    port: 587,
    secure: false,
    headers: {
      'X-PM-Message-Stream': 'outbound'
    },
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD, 
    },
  });

  const mail = await transporter.sendMail({
    from: 'phil@phils.computer',
    to: "phil@phils.computer",
    subject: `Contact from ${data.first_name} ${data.last_name}`,
    text: JSON.stringify(data, null, 2),
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
  });

  return NextResponse.json(mail)
}
