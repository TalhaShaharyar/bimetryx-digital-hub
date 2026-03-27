import { Shield, Lightbulb, Handshake } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const values = [
  {
    icon: Shield,
    title: "Precision",
    desc: "Every model, every clash report, every deliverable is held to the highest standard. We don't cut corners — we model them.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "From custom Revit plugins to AR overlays, we push the boundaries of what BIM technology can do for your projects.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    desc: "We embed within your team, adopt your protocols, and deliver as an extension of your organization — not as an outsourced vendor.",
  },
];

const About = () => (
  <>
    <section className="bg-navy py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground animate-fade-in">
          Precision Engineering Meets Digital Innovation
        </h1>
      </div>
    </section>

    <section className="bg-card py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <FadeInSection>
          <h2 className="text-2xl font-heading font-bold text-navy">Who We Are</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            BIMetryx is a technology-forward BIM services company that delivers end-to-end Building Information Modeling solutions to architects, engineers, contractors, and consultants worldwide. We combine deep domain expertise with custom-built technology to help project teams model smarter, coordinate faster, and build with confidence.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our team spans eight core BIM disciplines — from high-LOD modeling and VDC management to 4D sequencing, clash detection, AR/VR visualization, and custom plugin development. We operate as a fully integrated remote team, embedding directly within our clients' workflows.
          </p>
        </FadeInSection>

        <FadeInSection delay={100}>
          <h2 className="text-2xl font-heading font-bold text-navy mt-12">Our Mission</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            To be the single-source BIM partner that project teams trust for precision, innovation, and accountability — eliminating the need to juggle multiple vendors, tools, and standards.
          </p>
        </FadeInSection>
      </div>
    </section>

    <section className="bg-light-bg py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeInSection>
          <h2 className="text-3xl font-heading font-bold text-navy text-center">Core Values</h2>
        </FadeInSection>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <FadeInSection key={i} delay={i * 100}>
              <div className="bg-card rounded-xl border border-border p-8 text-center h-full">
                <div className="mx-auto w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <v.icon className="text-gold" size={26} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-card py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <FadeInSection>
          <h2 className="text-2xl font-heading font-bold text-navy">Remote-First Delivery</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            BIMetryx operates as a fully remote company by design — not by compromise. Our team members embed directly within your project workflows, attend your coordination meetings, and follow your BIM protocols. The result is seamless collaboration with the flexibility and scalability of a distributed team.
          </p>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="mt-10 bg-navy rounded-xl p-8">
            <h3 className="font-heading text-lg font-bold text-primary-foreground flex items-center gap-2">
              <Shield className="text-gold" size={22} /> ISO 19650 Commitment
            </h3>
            <p className="mt-3 text-primary-foreground/70 text-sm leading-relaxed">
              Every project we deliver adheres to ISO 19650 information management standards. From BIM execution plans to common data environments, we ensure your project's information lifecycle is structured, governed, and audit-ready.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  </>
);

export default About;
