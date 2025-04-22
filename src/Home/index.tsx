import React from "react";
import Step from "../components/Step";
import FeatureCard from "../components/FeatureCard";
import EmailIcon from "@mui/icons-material/Email";
import TextsmsIcon from "@mui/icons-material/Textsms";
import LinkIcon from "@mui/icons-material/Link";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-emerald-500">Dynamic QR Codes</span> Made
            Simple
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create smart QR codes for emails, SMS, and URLs that you can update
            anytime - no need to reprint or redistribute!
          </p>
          <div className="mt-10">
            <a
              href="#features"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Create Dynamic QR Codes For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How HoloQR Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to create your dynamic QR codes
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
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
      <section className="bg-emerald-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">
              Ready to create your first dynamic QR?
            </span>
            <span className="block text-emerald-100">Start free today.</span>
          </h2>
          <div
            className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            <div className="inline-flex rounded-md shadow">
              <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50 transition-colors duration-200">
                Sign Up Free
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
