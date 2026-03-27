import { ExternalLink, Box, Calendar, AlertTriangle, Code, Glasses, HardHat } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const portfolioItems = [
  {
    icon: Box,
    title: "Mixed-Use Tower — LOD 400 BIM Modeling",
    client: "Tier-1 General Contractor, UAE",
    scope: "Full architectural, structural, and MEP modeling at LOD 400 for a 42-story mixed-use tower. Delivered coordination-ready models with embedded parameters for quantity extraction and fabrication.",
    deliverables: ["LOD 400 Revit models (Arch/Struct/MEP)", "5,000+ clash resolutions", "Fabrication-ready shop drawings", "As-built model updates"],
    tags: ["BIM Modeling", "LOD 400", "Revit"],
  },
  {
    icon: Calendar,
    title: "Healthcare Campus — 4D Construction Sequencing",
    client: "Healthcare Developer, UK",
    scope: "Linked 3D BIM models to the master construction schedule in Synchro Pro, producing phase-by-phase 4D simulations for a 180,000 sq ft healthcare campus. Enabled the client to identify 3 critical schedule conflicts before groundbreaking.",
    deliverables: ["4D Synchro model", "Phase-based construction animations", "Schedule risk analysis report", "Logistics & staging visualizations"],
    tags: ["4D BIM", "Synchro", "Scheduling"],
  },
  {
    icon: AlertTriangle,
    title: "Data Center Complex — Multi-Discipline Clash Coordination",
    client: "Data Center Operator, USA",
    scope: "Managed a multi-discipline clash detection and resolution process across 6 MEP trades for a mission-critical data center. Reduced RFIs by 60% through proactive coordination and weekly clash resolution meetings.",
    deliverables: ["Navisworks coordination model", "Clash classification matrix", "Weekly resolution dashboards", "RFI reduction tracking"],
    tags: ["Clash Detection", "Navisworks", "Coordination"],
  },
  {
    icon: Code,
    title: "Enterprise Revit Plugin Suite — Automation Platform",
    client: "AEC Consultancy, Australia",
    scope: "Developed a suite of 12 custom Revit plugins automating model auditing, parameter management, sheet creation, and export workflows. Reduced manual QA time by 70% across the client's 200+ person BIM team.",
    deliverables: ["12 custom Revit API add-ins", "Dynamo script library", "Automated model audit reports", "User training documentation"],
    tags: ["Revit API", "C#", "Automation"],
  },
  {
    icon: Glasses,
    title: "Luxury Residential — VR Design Review",
    client: "Architecture Firm, Canada",
    scope: "Transformed a high-end residential BIM model into an interactive VR experience for client design review sessions. Enabled real-time material and finish selection in a fully immersive walkthrough environment.",
    deliverables: ["VR walkthrough environment", "Real-time material switching", "Interactive design review sessions", "360° rendered panoramas"],
    tags: ["AR/VR", "Visualization", "Design Review"],
  },
  {
    icon: HardHat,
    title: "Industrial Facility — Trade Coordination & Takeoffs",
    client: "Mechanical Contractor, Germany",
    scope: "Produced trade-specific coordination models and detailed quantity takeoffs for a large-scale industrial HVAC installation. Bridged the gap between design-intent BIM and field-ready fabrication models.",
    deliverables: ["Trade coordination models", "Quantity takeoff reports", "Shop drawing extraction", "Field verification models"],
    tags: ["Contractors", "MEP", "Takeoffs"],
  },
];

const Portfolio = () => (
  <>
    <section className="bg-navy py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground animate-fade-in">
          Project Portfolio
        </h1>
        <p className="mt-4 text-primary-foreground/60 max-w-2xl mx-auto animate-fade-in-delay-1">
          Selected engagements showcasing our capabilities across BIM modeling, coordination, automation, and visualization.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8 space-y-8">
        {portfolioItems.map((item, i) => (
          <FadeInSection key={i} delay={i * 60}>
            <div className={`rounded-2xl border border-border p-8 md:p-10 ${i % 2 === 0 ? "bg-card" : "bg-light-bg"}`}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                  <item.icon className="text-navy" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-navy">{item.title}</h2>
                  <p className="mt-1 text-sm text-gold font-semibold">{item.client}</p>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{item.scope}</p>

                  <div className="mt-5">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Deliverables</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {item.deliverables.map((d, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-navy/5 text-navy px-3 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-navy py-16">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-primary-foreground/60 max-w-lg mx-auto text-sm">
            Every engagement starts with a technical review. Submit your requirements and we'll respond within 1 working day.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 bg-gold text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:brightness-110 transition"
          >
            Request a Consultation <ExternalLink size={16} />
          </a>
        </FadeInSection>
      </div>
    </section>
  </>
);

export default Portfolio;
