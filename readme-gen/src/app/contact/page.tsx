import type { NextPage } from "next";
import { FiMail, FiHelpCircle, FiChevronDown } from "react-icons/fi";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Topbar />
      {/* Header */}
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-gray-500 mt-2">
          Have questions about Readme Hub? We're here to help.
        </p>
      </div>

      {/* Contact Form */}
      <div className="flex justify-center mt-12 px-6 flex-1">
        <form className="w-full max-w-xl bg-white rounded-lg flex flex-col gap-6">
          {/* First + Last Name */}
          <div className="flex gap-6">
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-sm font-medium">First name</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="First name"
                  className="flex-1 outline-none text-gray-700"
                />
                <FiHelpCircle className="text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <label className="text-sm font-medium">Last name</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Last name"
                  className="flex-1 outline-none text-gray-700"
                />
                <FiHelpCircle className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 outline-none text-gray-700"
              />
              <FiHelpCircle className="text-gray-400" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Phone number</label>
            <div className="flex items-center border rounded-lg bg-white shadow-sm">
              <div className="flex items-center px-3 py-2 border-r">
                <span className="mr-2">US</span>
                <FiChevronDown />
              </div>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className="flex-1 px-3 py-2 outline-none text-gray-700"
              />
              <FiHelpCircle className="text-gray-400 mr-2" />
            </div>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Subjects</label>
            <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-white shadow-sm">
              <span className="text-gray-400">Select Subjects</span>
              <FiChevronDown />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Message</label>
            <textarea
              placeholder="Include a message..."
              className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm"
              rows={5}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300"
            />
            <span>
              You agree to our friendly{" "}
              <a href="#" className="underline">
                privacy policy
              </a>
              .
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 shadow hover:bg-blue-700"
          >
            Send message
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
