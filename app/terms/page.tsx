import { business } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms of Service | ${business.name}`,
  description: `Terms of service and conditions for ${business.name}.`,
};

export default function TermsPage() {
  return (
    <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120, maxWidth: "65ch", margin: "0 auto" }}>
      <h1 className="h2" style={{ marginBottom: 40 }}>Terms of Service</h1>
      
      <div className="prose">
        <p><strong>Last Updated:</strong> {new Date().getFullYear()}</p>
        
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing our website and using the services provided by {business.name}, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>

        <h2>2. Services</h2>
        <p>
          {business.name} provides curb address painting services. While we strive for the highest quality, curb textures and weather conditions can affect the final appearance and longevity of the paint. Standard paint typically lasts 2-3 years under normal conditions.
        </p>

        <h2>3. Payment</h2>
        <p>
          Payment is due upon completion of the service. We accept cash and Venmo. We do not require upfront deposits for standard residential curb painting.
        </p>

        <h2>4. Property Permissions</h2>
        <p>
          By requesting our service, you confirm that you have the legal right or permission to have the curb painted at the provided address. We are not responsible for HOA disputes regarding curb painting rules.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall {business.name} be liable for any indirect, incidental, or consequential damages arising out of the use of our services.
        </p>
      </div>
    </div>
  );
}
