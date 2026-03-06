const links = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Support Center", href: "#" },
];

export default function Footer({ theme }) {
  return (
    <footer className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs transition-colors ${
      theme === 'dark'
        ? 'border-slate-700 text-slate-400'
        : 'border-slate-200 text-slate-600'
    }`}>
      <p>
        {"© 2023 AetherCare Medical Systems. All healthcare data is encrypted."}
      </p>
      <div className="flex gap-6">
        {links.map((link) => (
          <a key={link.label} className="hover:underline" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
