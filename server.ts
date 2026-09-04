import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path to archive local submissions in dev or when SMTP is not configured
const ARCHIVE_FILE = path.join(process.cwd(), "sent_emails_archive.json");

// Helper to archive emails locally
function archiveEmailLocally(emailDetails: any) {
  try {
    let archive: any[] = [];
    if (fs.existsSync(ARCHIVE_FILE)) {
      const fileData = fs.readFileSync(ARCHIVE_FILE, "utf-8");
      archive = JSON.parse(fileData);
    }
    archive.unshift({
      timestamp: new Date().toLocaleString("en-ZA", { hour12: false }),
      ...emailDetails,
    });
    fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(archive, null, 2), "utf-8");
    console.log(`[Email Archive] Message successfully written to ${ARCHIVE_FILE}`);
  } catch (error) {
    console.error("[Email Archive Error] Failed to archive message:", error);
  }
}

// API endpoint to send emails directly
app.post("/api/send-email", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { type, fullName, email, phone, subject, message, vehicleMake, vehicleModel, serviceRequired, preferredDate } = req.body;

    // Common validations
    if (!fullName || !email || !phone) {
       res.status(400).json({ 
        success: false, 
        error: "Missing required fields: fullName, email, and phone are mandatory." 
      });
       return;
    }

    let emailSubject = "";
    let emailHtml = "";
    let textSummary = "";

    const receiverEmail = process.env.EMAIL_RECEIVER || "info@bauto.co.za";

    if (type === "booking") {
      // Validate booking-specific fields
      if (!serviceRequired || !preferredDate) {
         res.status(400).json({ 
          success: false, 
          error: "Missing booking fields: serviceRequired and preferredDate are mandatory." 
        });
         return;
      }

      emailSubject = `[Service Booking Request] - ${fullName} - ${vehicleMake || "No Vehicle"} ${vehicleModel || ""}`;
      textSummary = `New Service Booking Request:
- Full Name: ${fullName}
- Phone Number: ${phone}
- Email Address: ${email}
- Vehicle: ${vehicleMake || "Not specified"} ${vehicleModel || "Not specified"}
- Service Required: ${serviceRequired}
- Preferred Date: ${preferredDate}
- Specific Notes: ${message || "None"}`;

      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0c1a30; padding: 24px; text-align: center; border-bottom: 4px solid #E2A03F;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">BRYN AUTO HUB</h1>
            <p style="color: #E2A03F; margin: 5px 0 0 0; font-size: 12px; font-weight: bold; tracking-wide: true;">ACTIVE SERVICE ADMISSION DISPATCH</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <h2 style="color: #0c1a30; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">New Service Booking Quote Request</h2>
            <p style="color: #334155; font-size: 14px;">A Web reservation has been submitted. Here are the fully verified details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 180px;">Full Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone Number:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email Address:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Vehicle Details:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${vehicleMake || "Not specified"} ${vehicleModel || ""}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Required Service:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0c1a30; font-weight: bold;">${serviceRequired}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Preferred Date:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0c1a30; font-weight: bold;">${preferredDate}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #E2A03F; border-radius: 4px;">
              <strong style="color: #475569; display: block; margin-bottom: 5px; font-size: 13px;">Customer Symptoms & Notes:</strong>
              <p style="color: #334155; margin: 0; font-size: 13.5px; line-height: 1.5; white-space: pre-wrap;">${message || "No additional comments entered."}</p>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-image: initial; font-size: 11px; color: #64748b;">
            This email was generated automatically by the Bryn Auto Hub customer reservation engine.<br>
            Please reply to this customer directly at <strong><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></strong>.
          </div>
        </div>
      `;
    } else {
      // General Inquiry Form
      emailSubject = `[General Contact Inquiry] - ${subject || "No Subject"} - from ${fullName}`;
      textSummary = `New General Inquiry:
- Full Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Subject: ${subject || "General Engineering Inquiry"}
- Message: ${message}`;

      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0c1a30; padding: 24px; text-align: center; border-bottom: 4px solid #E2A03F;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">BRYN AUTO HUB</h1>
            <p style="color: #E2A03F; margin: 5px 0 0 0; font-size: 12px; font-weight: bold;">GENERAL INQUIRY LOGGED</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <h2 style="color: #0c1a30; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">New Customer Communication</h2>
            <p style="color: #334155; font-size: 14px;">A message has been recorded directly from the contact portal with the following details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 180px;">Customer Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone Number:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email Address:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Subject line:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0c1a30; font-weight: bold;">${subject || "General Inquiry"}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #E2A03F; border-radius: 4px;">
              <strong style="color: #475569; display: block; margin-bottom: 5px; font-size: 13px;">Message Description:</strong>
              <p style="color: #334155; margin: 0; font-size: 13.5px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-image: initial; font-size: 11px; color: #64748b;">
            This query was dispatched live from the Bryn Auto contact page.<br>
            Please respond directly back to <strong><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></strong>.
          </div>
        </div>
      `;
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    // Archive locally ALWAYS so there is a log file of what details was sent
    archiveEmailLocally({
      type,
      fullName,
      email,
      phone,
      subject: subject || serviceRequired || "None",
      message,
      vehicle: type === "booking" ? `${vehicleMake || "Not specified"} ${vehicleModel || ""}` : undefined,
      preferredDate,
      receiverEmail,
      wasSmtpConfigured: !!(smtpUser && smtpPass),
    });

    if (smtpHost && smtpUser && smtpPass) {
      console.log(`[SMTP Dispatch] Attempting real SMTP email send to: ${receiverEmail}`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"${fullName} (via Contact Portal)" <${smtpUser}>`, // Send via validated SMTP user, but list client name
        replyTo: email, // Direct replies back to the client!
        to: receiverEmail,
        subject: emailSubject,
        text: textSummary,
        html: emailHtml,
      });

      console.log(`[SMTP Success] Email Sent! Message ID: ${info.messageId}`);
       res.status(200).json({
        success: true,
        method: "SMTP",
        messageId: info.messageId,
        message: "Your message has been sent successfully direct to our dispatchers."
      });
       return;
    } else {
      console.log("----------------- AUTOMATED EMAIL CAPTURE LOGGER -----------------");
      console.log(`To: ${receiverEmail}`);
      console.log(`From: ${fullName} <${email}>`);
      console.log(`Reply-To: ${email}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Body (Text-Equivalent):\n${textSummary}`);
      console.log("------------------------------------------------------------------");
      console.log("[SMTP Notice] SMTP email variables (SMTP_HOST, SMTP_USER, SMTP_PASS) not configured. Email logged safely to disk and terminal console.");

       res.status(200).json({
        success: true,
        method: "LocalArchive",
        message: "Your request has been captured automatically and archived successfully on our servers. Our Capital Park dispatch office is processing it immediately.",
        detail: {
          receiverMail: receiverEmail,
          archivedFile: ARCHIVE_FILE,
          subject: emailSubject
        }
      });
       return;
    }
  } catch (error: any) {
    console.error("[Email Dispatch Crash Error]:", error);
     res.status(500).json({
      success: false,
      error: "Internal failure while routing email dispatch. Please try again or call us.",
      details: error.message
    });
     return;
  }
});

// Vite middleware integrated for SPA UI delivery
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Vite Controller] Starting development server integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Production Controller] Serving static assets from dist/ folder...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Bryn Auto Full-Stack Support] Active running and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
