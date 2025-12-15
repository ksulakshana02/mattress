import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { client } from '@/lib/sanity';
import { siteSettingsQuery } from '@/lib/queries';
import { SiteSettings } from '@/lib/types';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
  productId: z.string().optional(),
  productName: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // Fetch SMTP settings from Sanity
    const settings: SiteSettings = await client.fetch(siteSettingsQuery);
    const smtp = settings?.smtpSettings;

    // Use Sanity settings if available, otherwise fallback to Env vars
    const transporter = nodemailer.createTransport({
      host: smtp?.host || process.env.EMAIL_HOST,
      port: Number(smtp?.port || process.env.EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtp?.user || process.env.EMAIL_USER,
        pass: smtp?.password || process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const subject = validatedData.productName ? `Inquiry about ${validatedData.productName}` : 'New Contact Form Submission';

    const mailOptions = {
      from: smtp?.fromEmail || process.env.EMAIL_FROM || '"Dimuthu Mattress" <noreply@dimuthumattress.com>',
      to: process.env.EMAIL_TO,
      subject: `Dimuthu Mattress - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e293b;">New ${validatedData.productName ? 'Product Inquiry' : 'Message'}</h1>
          <p>You have received a new message from the Dimuthu Mattress contact form.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            ${validatedData.productName ? `<p><strong>Interested Product:</strong> ${validatedData.productName}</p>` : ''}
          </div>

          <div style="margin-top: 20px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap; color: #475569;">${validatedData.message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
