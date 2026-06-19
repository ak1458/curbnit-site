import { business } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Policy | ${business.name}`,
  description: `Privacy policy and data collection practices for ${business.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120, maxWidth: "65ch", margin: "0 auto" }}>
      <h1 className="h2" style={{ marginBottom: 40 }}>Privacy Policy</h1>
      
      <div className="prose">
        <p><strong>Last Updated:</strong> {new Date().getFullYear()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>
          When you request a quote or join our team, we collect your name, address, phone number, and email address. We also collect any additional information you provide in your messages.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information exclusively to provide our services, calculate quotes, schedule jobs, and communicate with you regarding your service request.
        </p>

        <h2>3. SMS & TCPA Compliance</h2>
        <p>
          By providing your phone number to {business.name}, you consent to receive text messages and phone calls regarding your inquiry or booked service. We will not send promotional SMS spam. You may opt-out at any time by replying "STOP". Standard message and data rates may apply.
        </p>

        <h2>4. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell, rent, or lease your personal data to third parties. Your information is kept strictly confidential and only shared with our immediate team members necessary to complete your job.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us at {business.email} or call {business.phone}.
        </p>
      </div>
    </div>
  );
}
