const quickLinks = ["HOME", "ABOUT", "PROJECTS", "CONTACT"];
const socialLinks = [
  { name: "GITHUB", url: "https://github.com/dayrentjiang" },
  { name: "LINKEDIN", url: "https://linkedin.com/in/dayrent-tjiang" },
];

export default function Footer() {
  return (
    <footer className="site-footer relative bg-[var(--section-surface,#0a0a0a)] px-8 pt-24 pb-12 overflow-hidden">
      {/* Soft accent glow */}
      <div className="site-footer-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--section-glow,#22c55e)] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold italic leading-tight">
            GOT AN IDEA?
          </h2>
          <div className="flex items-center justify-center gap-4 my-4">
            <span className="text-4xl md:text-6xl font-bold italic">LET&apos;S</span>
            <a
              href="/contact"
              className="bg-[var(--section-accent,#4ade80)] text-[var(--section-button-ink,#000)] font-medium px-8 py-6 rounded-full hover:bg-[var(--section-accent-hover,#3fcf70)] transition-colors text-sm"
            >
              Get In Touch
            </a>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold italic">BUILD IT TOGETHER</h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-12">
          <span className="text-[var(--section-accent,#4ade80)]">&lt;/</span>
          <div className="flex-1 h-px bg-[var(--section-line,rgba(255,255,255,0.2))]"></div>
          <span className="text-[var(--section-accent,#4ade80)]">&gt;</span>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--section-accent,#4ade80)] text-sm mb-6">Quick links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
                    className="text-sm text-[var(--section-muted,rgba(255,255,255,0.8))] hover:text-[var(--section-ink,#fff)] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="relative">
            <h3 className="text-[var(--section-accent,#4ade80)] text-sm mb-6">Socials</h3>
            <ul className="space-y-3">
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-sm text-[var(--section-muted,rgba(255,255,255,0.8))] hover:text-[var(--section-ink,#fff)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg font-medium">dayrentjiang@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
