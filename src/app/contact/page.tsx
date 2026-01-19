"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "eb536655-6892-476d-9466-6d9a90aa2763",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send message. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 md:px-8 py-24">
      <div className="max-w-6xl mx-auto pt-16">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Contact Info */}
          <div>
            <p className="text-[#4ade80] text-sm mb-6">// Get In Touch</p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2">
              LET&apos;S CONNECT &<br />
              COLLABORATE
            </h1>
            <span className="inline-block w-3 h-3 bg-[#4ade80] rounded-full mb-8"></span>

            <p className="text-white/60 leading-relaxed mb-10 max-w-md">
              Have a project in mind? Let&apos;s make it happen! Drop us a
              message, and we&apos;ll connect with you soon.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-12">
              <a
                href="#"
                className="text-white hover:text-[#4ade80] transition-colors"
              >
                / Twitter (X)
              </a>
              <a
                href="#"
                className="text-white hover:text-[#4ade80] transition-colors"
              >
                / LinkedIn
              </a>
              <a
                href="#"
                className="text-white hover:text-[#4ade80] transition-colors"
              >
                / GitHub
              </a>
              <a
                href="#"
                className="text-white hover:text-[#4ade80] transition-colors"
              >
                / CodePen
              </a>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 text-white hover:text-[#4ade80] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book a Meeting
              </a>
              <a
                href="mailto:info@dayrent.com"
                className="flex items-center gap-3 text-white hover:text-[#4ade80] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                dayrentjiang@gmail.com
              </a>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2">
                  Name<span className="text-[#4ade80]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80] transition-colors placeholder:text-white/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Email<span className="text-[#4ade80]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80] transition-colors placeholder:text-white/40"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Project Description<span className="text-[#4ade80]">*</span>
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80] transition-colors resize-none placeholder:text-white/40"
                  placeholder="Write your project details"
                />
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-[#4ade80]/10 text-[#4ade80]"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4ade80] text-black font-medium px-8 py-3 rounded-full hover:bg-[#3fcf70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Your Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
