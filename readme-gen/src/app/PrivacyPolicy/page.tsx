"use client";
import React, { FunctionComponent } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const PrivacyPolicy: FunctionComponent = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Topbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <article className="space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            This Privacy Policy ("Policy") explains how GitDocify ("we," "us," or "our") collects, uses, discloses, and protects your
            personal data when you use our web application. By using the Application, you consent to the practices outlined in this Policy.
            If you disagree with the terms of this Policy, please refrain from using the platform.
          </p>

          <section>
            <h2 className="text-xl font-semibold mt-4">INFORMATION WE COLLECT</h2>
            <p className="mt-2">We collect various types of personal information depending on how you interact with the platform:</p>
            <div className="mt-3">
              <strong>GitHub Login Data:</strong>
              <p className="mt-2">When you log in via your GitHub account, we may collect the following information from your GitHub profile, with your consent:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Username</li>
                <li>Profile Picture</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-4">USE OF INFORMATION</h2>
            <p className="mt-2">We may use the data we collect from you to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>Provide and enhance the web application:</strong> We may use the data we collect to operate and maintain the web application, and to improve its features and functionality.</li>
              <li><strong>Communicate with you:</strong> We may use the data we collect to send you updates about the platform and to respond to your inquiries and comments.</li>
              <li><strong>Analyze and understand user behavior:</strong> We may use the data we collect to analyze and understand how users interact with the web application and to develop new features and functionality.</li>
              <li><strong>Comply with legal obligations:</strong> We may use the data we collect to comply with any applicable laws, regulations, or legal requests.</li>
            </ul>
            <p className="mt-3">In addition, if you connect private repositories or submit code (including proprietary code) for generating documentation files, we use such code solely to provide the requested functionality. We do not permanently store or share this code with third parties beyond what is necessary to operate and maintain our Services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-4">SHARING INFORMATION</h2>
            <p className="mt-2">We do not share or transfer your personal information to any third parties except as described below, or in circumstances where you give consent:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>Public authorities:</strong> We may disclose your information to government, regulatory, judicial, or law enforcement bodies if required to comply with legal obligations, processes, or to protect security or prevent fraud.</li>
              <li><strong>Service providers:</strong> We may share your data with service providers like data storage providers and payment processors who assist in providing the Services.</li>
              <li><strong>Third-party integrations:</strong> If you allow third-party integrations (e.g., GitHub), we may share or retrieve data as part of those integrations.</li>
            </ul>
            <p className="mt-2">We do not sell personal information and have not done so in the past.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-4">THIRD-PARTY SERVICES</h2>
            <p className="mt-2">We may utilize third-party services to facilitate certain features within the web application and our Services. These third-party platforms may provide us with data based on your interaction with their services, subject to your consent and their respective privacy policies. Specifically, we may collect information through the following platforms:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>GitHub Login:</strong> If you log in using your GitHub account, we may collect your name, email address, profile picture, and other basic profile information, with your permission.</li>
              <li><strong>Tracking and Analytics:</strong> We may collect certain data automatically about your usage of the web application to improve functionality and user experience. This may include data such as your device type, IP address, browser type, and interactions with the app. We use tools such as Google Analytics to help us understand how users engage with our services. By using the web application, you consent to the collection of this data for these purposes. You may opt out of certain tracking by adjusting your device or browser settings.</li>
            </ul>
            <p className="mt-2">Please note that the information shared with these third-party services is governed by their respective privacy policies, and we recommend reviewing them to understand how your personal data is handled by these services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-4">DATA RETENTION</h2>
            <p className="mt-2">We will retain your personal data for as long as necessary to fulfill the purposes for which it was collected, as outlined in this Policy. We will also retain your personal data as required by applicable laws or regulations.</p>
            <p className="mt-2"><strong>Consent for Data Usage:</strong> By using the web application, you consent to the collection, use, and sharing of your data as described in this Privacy Policy. If we intend to use your data for additional purposes beyond those described, we will seek your explicit consent before doing so.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-4">YOUR DATA PROTECTION RIGHTS</h2>
            <p className="mt-2">Depending on your location and applicable laws, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>Access:</strong> You have the right to request access to the personal data we hold about you.</li>
              <li><strong>Correction:</strong> You can correct any inaccuracies in your personal data.</li>
              <li><strong>Deletion:</strong> You can request the deletion of your personal data (subject to certain legal exceptions).</li>
              <li><strong>Objection or Restriction:</strong> You can object to or request the restriction of certain data processing activities.</li>
              <li><strong>Data Portability:</strong> You can request to receive your personal data in a structured, machine-readable format and transmit it to another service provider.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us at <a className="text-blue-600 underline" href="mailto:support@gitdocify.com">support@gitdocify.com</a>. We will respond to your request in accordance with applicable data protection laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-4">CHANGES TO THE POLICY</h2>
            <p className="mt-2">We may update this Policy from time to time to reflect changes in our data practices or for other operational, legal, or regulatory reasons. When we update this Policy, we will notify you through the web application or by other means. Your continued use of the web application after any changes constitutes your acceptance of the updated Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-4">CONTACT INFORMATION</h2>
            <p className="mt-2">If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at: <a className="text-blue-600 underline" href="mailto:support@gitdocify.com">support@gitdocify.com</a>.</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
