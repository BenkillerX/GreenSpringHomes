import { useState } from "react";
import { Mail, Send, MessageCircle } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

 const handleChange = ( e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const subject = encodeURIComponent(formData.subject);
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  );

  window.location.href = `mailto:greenspringhomeofficial@gmail.com?subject=${subject}&body=${body}`;

  setFormData({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  toast.success("Your email application has been opened!");
};

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-green-950 text-white px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">
            Get in touch
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            We'd Love to Hear From You
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Have a question, need assistance, or want to work with us?
            We're here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Contact Information */}
          <div>
            <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">
              Contact information
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Let's start a conversation.
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed">
              Whether you're looking for a property, listing one, or
              exploring partnership opportunities, feel free to reach out
              to our team.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-xl">
                  <Mail className="text-green-800" size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Email us</h3>
                  <a
                    href="mailto:greenspringhomeofficial@gmail.com"
                    className="text-gray-600 hover:text-green-700 transition break-all"
                  >
                    greenspringhomeofficial@gmail.com
                  </a>
                  <p className="text-sm text-gray-400 mt-1">
                    Send us your questions anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-xl">
                  <MessageCircle className="text-green-800" size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Customer support</h3>
                  <p className="text-gray-600">
                    Need help using GreenSpringHomes?
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Our team is available to assist you.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-green-50 rounded-2xl p-7">
              <h3 className="font-bold text-gray-900 text-lg">
                Building better property experiences.
              </h3>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                GreenSpringHomes connects people with property opportunities,
                making it easier to discover spaces and connect with property
                owners.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-9 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Send us a message
            </h2>

            <p className="text-gray-500 text-sm mt-2 mb-8">
              Fill out the form below and we'll be happy to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition"
              >
                Send Message
                <Send size={18} />
              </button>

              <p className="text-xs text-gray-400 text-center">
                Your message will be prepared in your default email application.
              </p>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;