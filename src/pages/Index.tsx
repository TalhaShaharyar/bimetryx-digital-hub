import { Link } from "react-router-dom";
import {
  Box, Users, Calendar, AlertTriangle, Library,
  Code, Glasses, HardHat, CheckCircle2, ArrowRight
} from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const services = [
  { icon: Box, name: "High-LOD BIM Modeling", desc: "LOD 300–500 models with precision geometry and rich data for every discipline." },
  { icon: Users, name: "Remote BIM Project Management", desc: "End-to-end VDC coordination embedded within your team's workflow." },
  { icon: Calendar, name: "4D BIM & Construction Sequencing", desc: "Time-linked models that visualize construction phases and optimize schedules." },
  { icon: AlertTriangle, name: "Clash Detection & Coordination", desc: "Multi-discipline clash analysis and resolution workflows that prevent costly rework." },
  { icon: Library, name: "BIM Family & Content Libraries", desc: "Custom Revit families and content libraries built to your standards." },
  { icon: Code, name: "Custom BIM Apps & Plugins", desc: "Revit, Navisworks, and Dynamo automation tools tailored to your processes." },
  { icon: Glasses, name: "AR & VR Visualization", desc: "Immersive walkthroughs and augmented reality overlays for design review." },
  { icon: HardHat, name: "BIM for Contractors & Consultants", desc: "Trade-specific modeling, takeoffs, and coordination for field teams." },
];

const stats = [
  { value: "LOD 300–500", label: "Modeling Precision" },
  { value: "ISO 19650", label: "Fully Compliant" },
  { value: "8+", label: "Core BIM Services" },
  { value: "Global", label: "Remote Delivery" },
];

const whyPoints = [
  "Remote-first delivery with zero quality compromise",
  "Embedded BIM professionals under your protocols",
  "Full ISO 19650 compliance",
  "Single-source: modeling, coordination, tech, and visualization",
  "Custom automation and AR/VR built in-house",
  "Scalable: project-based, retainer, or team augmentation",
];

const Index = () => (
  <>
    {/* HERO */}
    <section className="relative bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `
          linear-gradient(hsl(32 95% 44% / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(32 95% 44% / 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-20 right-10 w-40 h-40 border border-gold/10 rotate-45 hidden lg:block" />
      <div className="absolute bottom-10 left-20 w-24 h-24 border border-terracotta/10 rotate-12 hidden lg:block" />

      <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-36 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight animate-fade-in">
            End-to-End BIM Services.{" "}
            <span className="text-gold">Built for Precision.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/70 leading-relaxed max-w-2xl animate-fade-in-delay-1">
            BIMetryx delivers high-LOD BIM modeling, VDC management, 4D sequencing, clash detection, AR/VR visualization, and custom BIM technology — from a single, integrated remote team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-delay-2">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
            >
              Explore Our Services <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:border-gold hover:text-gold transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* STATS BAR */}
    <section className="bg-light-bg border-y border-border">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <FadeInSection key={i} delay={i * 80}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-navy">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground font-medium">{s.label}</div>
                <div className="mx-auto mt-2 w-8 h-0.5 bg-gold rounded-full" />
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* SERVICES GRID */}
    <section className="bg-card py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center">
            What We Do
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
            Eight core disciplines. One integrated team.
          </p>
        </FadeInSection>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <FadeInSection key={i} delay={i * 60}>
              <div className="group bg-card border border-border rounded-xl p-6 hover:border-gold hover:shadow-lg hover:shadow-gold/5 transition-all duration-300">
                <s.icon className="text-navy group-hover:text-gold transition-colors" size={28} />
                <h3 className="mt-4 font-heading text-base font-semibold text-navy">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* WHY BIMETRYX */}
    <section className="bg-light-bg py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight">
              Why teams choose <span className="text-gold">BIMetryx</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We don't just model — we embed, coordinate, automate, and visualize. Everything your BIM environment needs, delivered by one accountable team.
            </p>
          </FadeInSection>

          <FadeInSection delay={150}>
            <ul className="space-y-4">
              {whyPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-gold mt-0.5 shrink-0" size={20} />
                  <span className="text-foreground text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </FadeInSection>
        </div>
      </div>
    </section>

    {/* CTA BANNER */}
    <section className="bg-navy py-16">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">
            Ready to elevate your BIM environment?
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 bg-gold text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition"
          >
            Let's Talk <ArrowRight size={18} />
          </Link>
        </FadeInSection>
      </div>
    </section>
  </>
);

export default Index;
