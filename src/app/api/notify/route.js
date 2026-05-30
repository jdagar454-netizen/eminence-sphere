import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const candidate = await request.json();
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("RESEND_API_KEY environment variable is not configured. Email notification skipped.");
      return NextResponse.json({ 
        success: true, 
        message: "Candidate logged. Configure RESEND_API_KEY in Vercel environment variables to activate email alerts." 
      });
    }

    const emailBody = `
      <h2>New Candidate Registration!</h2>
      <p>A new applicant has completed the AI chatbot screening process.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr style="background-color: #0d1230; color: white;">
          <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Field</th>
          <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Details</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${candidate.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${candidate.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${candidate.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Role Selected</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${candidate.role}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Experience</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${candidate.experience}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Resume / Skills</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${candidate.resume}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">
        View details in your recruitment pipeline dashboard: 
        <a href="https://www.eminencesphere.online/pipeline" style="color: #d4af37; font-weight: bold;">Administration Pipeline Console</a>
      </p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Eminence Sphere AI <onboarding@resend.dev>',
        to: ['nikul240601@gmail.com'],
        subject: `New Application: ${candidate.name} - ${candidate.role}`,
        html: emailBody,
      }),
    });

    const resData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resData);
      return NextResponse.json({ success: false, error: resData.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: resData });
  } catch (error) {
    console.error("Notification API failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
