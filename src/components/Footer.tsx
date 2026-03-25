import { Link } from "react-router-dom";

const specialties = [
  "BIM Modeling", "VDC", "4D BIM", "Clash Detection",
  "AR/VR", "ISO 19650", "Revit API", "Digital Twin",
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="bg-navy text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-2">BIMetryx</h3>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            End-to-end BIM services built for precision. From modeling to visualization, we deliver.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-3 text-teal">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-primary-foreground/70 hover:text-teal transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-3 text-teal">
            Contact
          </h4>
          <a
            href="mailto:BIMetryx@hotmail.com"
            className="text-sm text-primary-foreground/70 hover:text-teal transition-colors"
          >
            BIMetryx@hotmail.com
          </a>
        </div>
      </div>

      {/* Specialties */}
      <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-wrap gap-2 justify-center">
        {specialties.map((s) => (
          <span
            key={s}
            className="text-xs text-primary-foreground/50 bg-primary-foreground/5 px-3 py-1 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="text-center text-xs text-primary-foreground/40 mt-6">
        © {new Date().getFullYear()} BIMetryx. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
