const quickLinks = ["HOME", "ABOUT", "WORKS", "BLOGS", "CONTACT"];
const portfolio = ["CONTRA", "GITHUB", "CODEPEN"];
const socialLinks = ["INSTAGRAM", "LINKEDIN", "TWITTER \"X\""];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] px-8 pt-24 pb-12 overflow-hidden">
      {/* Green Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold italic leading-tight">
            READY TO TAKE YOUR
          </h2>
          <div className="flex items-center justify-center gap-4 my-4">
            <span className="text-4xl md:text-6xl font-bold italic">IDEA TO</span>
            <a
              href="#contact"
              className="bg-[#4ade80] text-black font-medium px-8 py-6 rounded-full hover:bg-[#3fcf70] transition-colors text-sm"
            >
              Start Project
            </a>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold italic">THE NEXT LEVEL?</h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-12">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-[#4ade80] text-sm mb-6">Quick links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-[#4ade80] text-sm mb-6">Portfolio</h3>
            <ul className="space-y-3">
              {portfolio.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="relative">
            <h3 className="text-[#4ade80] text-sm mb-6">Social Link</h3>
            <ul className="space-y-3">
              {socialLinks.map((link, i) => (
                <li key={i} className="flex items-center gap-2">
                  <a
                    href="#"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                  {i === 2 && (
                    <span className="w-2 h-2 bg-[#4ade80] rounded-full"></span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <p className="text-lg font-medium">dayrent@gmail.com</p>
          <p className="text-lg font-medium">(684) 555-0102</p>
        </div>
      </div>
    </footer>
  );
}
