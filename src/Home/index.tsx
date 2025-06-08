import React from "react";
import Step from "../components/Step";
import FeatureCard from "../components/FeatureCard";
import EmailIcon from "@mui/icons-material/Email";
import TextsmsIcon from "@mui/icons-material/Textsms";
import LinkIcon from "@mui/icons-material/Link";
import {
  heroStyles,
  featuresStyles,
  ctaStyles,
  howItWorksStyles,
} from "../styles/homeStyles";
import { navigateTo } from "../utils/navigation";

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className={heroStyles.section}>
        <div className="text-center">
          <h1 className={heroStyles.heading}>
            <span className="text-emerald-500">Dynamic QR Codes</span> Made
            Simple
          </h1>
          <p className={heroStyles.paragraph}>
            Create smart QR codes for emails, SMS, and URLs that you can update
            anytime - no need to reprint or redistribute!
          </p>
          <div className="mt-10">
            <a href="#features" className={heroStyles.ctaButton}>
              Get Started Free
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={featuresStyles.section}>
        <div className={featuresStyles.container}>
          <div className="text-center mb-16">
            <h2 className={featuresStyles.heading}>
              Create Dynamic QR Codes For
            </h2>
          </div>
          <div className={featuresStyles.grid}>
            <FeatureCard
              icon={EmailIcon}
              title="Email"
              description="Generate QR codes that automatically open email drafts with pre-filled recipients, subjects and messages."
            />
            <FeatureCard
              icon={TextsmsIcon}
              title="SMS/Text"
              description="Create codes that prompt users to send text messages to specific numbers with your predefined content."
            />
            <FeatureCard
              icon={LinkIcon}
              title="Website URLs"
              description="Point to any webpage and update the destination URL anytime without changing the printed QR code."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={howItWorksStyles.section}>
        <div className="text-center">
          <h2 className={howItWorksStyles.heading}>How HoloQR Works</h2>
          <p className={howItWorksStyles.subheading}>
            Three simple steps to create your dynamic QR codes
          </p>
        </div>
        <div className="mt-16">
          <div className={howItWorksStyles.stepsContainer}>
            <Step
              number={1}
              title="Choose Content Type"
              description="Select whether you need a QR for email, SMS, URL, or other options."
            />
            <Step
              number={2}
              title="Customize Your QR Code"
              description="Add your content."
            />
            <Step
              number={3}
              title="Download & Track"
              description="Download your QR code and monitor scans in real-time through our dashboard."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={ctaStyles.section}>
        <div className={ctaStyles.container}>
          <h2 className={ctaStyles.heading}>
            <span className="block">
              Ready to create your first dynamic QR?
            </span>
            <span className={ctaStyles.subheading}>Start free today.</span>
          </h2>
          <div
            className={ctaStyles.buttonContainer}
            onClick={() => navigateTo("/signup")}
          >
            <div className="inline-flex rounded-md shadow">
              <div className={ctaStyles.button}>Sign Up Free</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
