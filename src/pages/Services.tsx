import {
  Box, Users, Calendar, AlertTriangle, Library,
  Code, Glasses, HardHat
} from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const services = [
  {
    icon: Box,
    name: "High-LOD BIM Modeling",
    desc: "We produce LOD 300–500 models across architectural, structural, and MEP disciplines — rich in geometry, data, and coordination-ready detail. Every element is modeled to match your project's BIM Execution Plan and standards.",
    deliverables: ["Architectural / Structural / MEP models", "LOD 300–500 with embedded parameters", "Coordination-ready Revit models", "As-built and record model updates"],
  },
  {
    icon: Users,
    name: "Remote BIM Project Management (VDC)",
    desc: "Our BIM managers integrate directly into your team — managing model workflows, enforcing standards, and coordinating across disciplines. We operate under your protocols with full ISO 19650 compliance.",
    deliverables: ["BIM Execution Plans", "Model audit and quality control", "Clash resolution workflows", "CDE setup and management"],
  },
  {
    icon: Calendar,
    name: "4D BIM & Construction Sequencing",
    desc: "We link your 3D models to construction schedules, creating time-phased simulations that visualize build sequences, identify schedule risks, and optimize logistics before you break ground.",
    deliverables: ["4D Navisworks / Synchro models", "Phase-by-phase construction animations", "Schedule risk visualization", "Logistics and staging plans"],
  },
  {
    icon: AlertTriangle,
    name: "Clash Detection & Coordination",
    desc: "Our clash detection workflows go beyond automated reports. We analyze, classify, and resolve clashes across disciplines using structured coordination processes that prevent costly rework on-site.",
    deliverables: ["Multi-discipline clash analysis", "Clash classification and prioritization", "Resolution tracking dashboards", "Coordination meeting facilitation"],
  },
  {
    icon: Library,
    name: "BIM Family & Content Library Development",
    desc: "We build custom Revit families and content libraries that match your standards — from parametric furniture to complex MEP equipment — ensuring consistency across every project.",
    deliverables: ["Custom parametric Revit families", "Manufacturer-specific content", "Standards-compliant libraries", "Family audit and optimization"],
  },
  {
    icon: Code,
    name: "Custom BIM Applications & Plugin Development",
    desc: "We develop custom tools for Revit, Navisworks, and Dynamo that automate repetitive tasks, enforce standards, and extend your BIM platform's capabilities beyond out-of-the-box features.",
    deliverables: ["Revit API add-ins (C# / Python)", "Dynamo scripts and packages", "Navisworks automation tools", "Data extraction and reporting tools"],
  },
  {
    icon: Glasses,
    name: "AR & VR Visualization",
    desc: "We transform BIM models into immersive experiences — from VR walkthroughs for design review to AR overlays for on-site construction verification. See your project before it's built.",
    deliverables: ["VR design review environments", "AR on-site model overlays", "Interactive 3D presentations", "Real-time rendering from BIM data"],
  },
  {
    icon: HardHat,
    name: "BIM for Contractors & Consultants",
    desc: "Tailored BIM services for construction teams — trade-specific modeling, quantity takeoffs, shop drawing extraction, and field-ready coordination models that bridge the gap between design and construction.",
    deliverables: ["Trade-specific coordination models", "Quantity takeoffs from BIM", "Shop drawing extraction", "Field verification models"],
  },
];

const Services = () => (
  <>
    {/* Hero */}
    <section className="bg-navy py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground animate-fade-in">
          Our Services
        </h1>
        <p className="mt-4 text-primary-foreground/60 max-w-xl mx-auto animate-fade-in-delay-1">
          Eight core BIM disciplines delivered by one integrated, remote-first team.
        </p>
      </div>
    </section>

    {/* Services list */}
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8 space-y-8">
        {services.map((s, i) => (
          <FadeInSection key={i} delay={i * 50}>
            <div className={`rounded-lg border border-border p-8 md:p-10 ${i % 2 === 0 ? "bg-card" : "bg-light-bg"}`}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center">
                  <s.icon className="text-navy" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-navy">{s.name}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-5">
                    <h4 className="text-sm font-semibold text-teal uppercase tracking-wider mb-2">Key Deliverables</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {s.deliverables.map((d, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  </>
);

export default Services;
