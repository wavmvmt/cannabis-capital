import { NextRequest, NextResponse } from "next/server";

function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
function err(code: string, message: string, status = 400) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, license_type, annual_revenue, monthly_revenue, financing_type, amount, message } = body;

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/landing_inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          source: "cannabis-capital",
          name: name || null, email: email || null, phone: phone || null,
          company: company || null, license_type: license_type || null,
          annual_revenue: annual_revenue || null, monthly_revenue: monthly_revenue || null,
          financing_type: financing_type || null, amount: amount || null,
          message: message || null,
        }),
      });
    }

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const fields = [
        name && `<strong>Name:</strong> ${name}`,
        email && `<strong>Email:</strong> ${email}`,
        phone && `<strong>Phone:</strong> ${phone}`,
        company && `<strong>Business:</strong> ${company}`,
        license_type && `<strong>License Type:</strong> ${license_type}`,
        annual_revenue && `<strong>Annual Revenue:</strong> ${annual_revenue}`,
        monthly_revenue && `<strong>Monthly Revenue:</strong> ${monthly_revenue}`,
        financing_type && `<strong>Financing:</strong> ${financing_type}`,
        amount && `<strong>Amount:</strong> ${amount}`,
        message && `<strong>Message:</strong><br/>${message}`,
      ].filter(Boolean);

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "SET OS <alerts@updates.setventures.com>",
          to: ["wavmvmt@gmail.com"],
          subject: `New Cannabis Capital Inquiry${name ? ` from ${name}` : ""}`,
          html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px">
            <div style="background:#2D5016;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
              <h2 style="margin:0">New Cannabis Capital Inquiry</h2>
              <p style="margin:4px 0 0;font-size:13px;opacity:.8">${new Date().toLocaleString("en-US",{timeZone:"America/Toronto"})}</p>
            </div>
            <div style="background:#fff;border:1px solid #e5e5e5;border-top:none;padding:24px;border-radius:0 0 12px 12px">
              ${fields.map(f => `<p style="margin:8px 0;font-size:15px;color:#333">${f}</p>`).join("")}
            </div>
          </div>`,
        }),
      });
    }

    return ok({ received: true }, 201);
  } catch (e) {
    console.error("Landing inquiry error:", e);
    return err("SERVER_ERROR", "Failed to process inquiry", 500);
  }
}
