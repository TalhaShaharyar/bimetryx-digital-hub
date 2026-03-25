import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <BIMetryxLogo />
          <span className="font-heading text-xl font-bold text-primary-foreground tracking-tight">
            BIMetryx
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-teal ${
                location.pathname === l.to
                  ? "text-teal"
                  : "text-primary-foreground/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-teal text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-md hover:brightness-110 transition"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-primary-foreground/10 px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors hover:text-teal ${
                location.pathname === l.to
                  ? "text-teal"
                  : "text-primary-foreground/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center bg-teal text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-md"
          >
            Get in Touch
          </Link>
        </div>
      )}
    </nav>
  );
};

const BIMetryxLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="12" width="10" height="10" rx="1.5" fill="#1D9E75" opacity="0.9" />
    <rect x="10" y="6" width="10" height="10" rx="1.5" fill="#1B3A6B" />
    <rect x="18" y="14" width="10" height="10" rx="1.5" fill="#C0392B" opacity="0.85" />
    <rect x="8" y="18" width="8" height="8" rx="1.5" fill="#1B3A6B" opacity="0.5" />
  </svg>
);

export default Navbar;
