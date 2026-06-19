import { business } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Disclaimer | ${business.name}`,
  description: `General disclaimer for ${business.name}.`,
};

export default function DisclaimerPage() {
  return (
    <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120, maxWidth: "65ch", margin: "0 auto" }}>
      <h1 className="h2" style={{ marginBottom: 40 }}>Disclaimer</h1>
      
      <div className="prose">
        <p><strong>Last Updated:</strong> {new Date().getFullYear()}</p>
        
        <h2>1. General Information</h2>
        <p>
          The information provided by {business.name} on {business.domain} is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>

        <h2>2. Professional Advice</h2>
        <p>
          The site cannot and does not contain legal or HOA advice. The curb painting information is provided for general informational and educational purposes only and is not a substitute for professional advice or your local neighborhood regulations.
        </p>

        <h2>3. External Links</h2>
        <p>
          The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
        </p>
      </div>
    </div>
  );
}
