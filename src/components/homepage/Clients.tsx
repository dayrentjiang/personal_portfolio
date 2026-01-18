const clients = [
  { name: "Boltshift", icon: "⚡", hasDot: true },
  { name: "Nietzsche", icon: "❄" },
  { name: "Capsule", icon: "💊" },
  { name: "Catalog", icon: "🔄" },
  { name: "CoreOS", icon: "🔃" },
  { name: "EasyTax", icon: "↺" },
  { name: "Galileo", icon: "🌙" },
  { name: "Railspeed", icon: "☰" },
];

export default function Clients() {
  return (
    <section className="bg-[#121212] px-8 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <p className="text-[#4ade80] text-sm">// My Client</p>
          <h2 className="text-4xl md:text-5xl font-bold text-right max-w-sm leading-tight">
            Worked With Amazing Clients
          </h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mb-16">
          <span className="text-[#4ade80]">&lt;/</span>
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-[#4ade80]">&gt;</span>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10">
          {clients.map((client, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center gap-3 py-8 px-4 border border-white/10"
            >
              {client.hasDot && (
                <span className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#4ade80] rounded-full"></span>
              )}
              <span className="text-2xl text-white/50">{client.icon}</span>
              <span className="font-semibold text-white/80">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
