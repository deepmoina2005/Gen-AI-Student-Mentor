import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="px-5 sm:px-12 lg:px-24 xl:px-32 py-16 bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen flex flex-col justify-center mt-12">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
          We’re here to help you with any questions, feedback, or ideas. Drop a message, and our team will get back to you shortly.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <Mail className="h-10 w-10 text-primary mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Email</h3>
          <p className="text-gray-600 text-sm mt-1">support@vidya.ai</p>
        </div>

        <div className="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <Phone className="h-10 w-10 text-primary mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
          <p className="text-gray-600 text-sm mt-1">+91 6001478031</p>
        </div>

        <div className="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <MapPin className="h-10 w-10 text-primary mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Location</h3>
          <p className="text-gray-600 text-sm mt-1 text-center">
            Sibsagar, Assam <br /> India - 785640
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-10 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
          Send us a message
        </h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary outline-none text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary outline-none text-sm sm:text-base"
            />
          </div>

          <textarea
            rows="5"
            placeholder="Your Message"
            className="p-3 rounded-lg border border-gray-300 focus:border-primary outline-none text-sm sm:text-base"
          ></textarea>

          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 w-fit mx-auto"
          >
            <Send className="h-5 w-5" /> Send Message
          </button>
        </form>
      </div>

      {/* Footer Text */}
      <p className="mt-10 text-center text-gray-600 text-xs sm:text-sm">
        © {new Date().getFullYear()} Vidya.AI — Empowering Students to Learn Smarter.
      </p>
    </div>
  );
};

export default Contact;
