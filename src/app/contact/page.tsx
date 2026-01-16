export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-8 py-24">
      <div className="max-w-6xl mx-auto pt-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <p className="text-[#4ade80] text-sm">// Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-right max-w-md leading-tight">
            Let&apos;s Work Together
          </h1>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Have a project in mind or just want to say hello? I&apos;d love
                to hear from you. Fill out the form or reach out through any of
                the channels below.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[#4ade80] text-sm mb-1">Email</p>
                <p className="text-lg">dayrent@gmail.com</p>
              </div>
              <div>
                <p className="text-[#4ade80] text-sm mb-1">Phone</p>
                <p className="text-lg">(684) 555-0102</p>
              </div>
              <div>
                <p className="text-[#4ade80] text-sm mb-1">Location</p>
                <p className="text-lg">San Francisco, CA</p>
              </div>
            </div>

            <div className="flex gap-6 pt-4">
              <a
                href="#"
                className="text-white/60 hover:text-[#4ade80] transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-[#4ade80] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-[#4ade80] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-[#1a1a1a] rounded-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4ade80] text-black font-medium py-3 rounded-full hover:bg-[#3fcf70] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
