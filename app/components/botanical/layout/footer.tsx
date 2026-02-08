import Link from "next/link";


const footerLinks = {
  research: [
    { label: "Ecosystem Research", href: "/research/ecosystem-resilience" },
    { label: "Climate Science", href: "/research/climate-resources" },
    { label: "Biodiversity", href: "/research/invasive-species" },
    { label: "Publications", href: "/publications" }
  ],
  resources: [
    { label: "Identification Tools", href: "/tools" },
    { label: "Data Portal", href: "/data" },
    { label: "Image Gallery", href: "/gallery" },
    { label: "Educational Resources", href: "/education" }
  ],
  about: [
    { label: "Our Team", href: "/about/team" },
    { label: "Partners", href: "/about/partners" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" }
  ]
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">IKMS</span>
              </div>
              <span className="font-display text-xl font-semibold">
               IKMS BioDiversity Research Alliance
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Advancing scientific understanding for a sustainable future. Our research informs policy and practice across environmental management.
            </p>
          </div>

          {/* Research Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Research</h4>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} IBRA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
