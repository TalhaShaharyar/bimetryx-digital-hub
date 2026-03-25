import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";
import { toast } from "sonner";

const projectTypes = [
  "BIM Modeling",
  "VDC Management",
  "Clash Detection",
  "4D BIM",
  "AR/VR",
  "Custom BIM Tech",
  "Other",
];

const Contact = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Simulate submission
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground animate-fade-in">
            Let's Work Together
          </h1>
          <p className="mt-4 text-primary-foreground/60 animate-fade-in-delay-1">
            Tell us about your project.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <FadeInSection>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  maxLength={100}
                  className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-1.5">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
                >
                  <option value="">Select a service</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-navy text-primary-foreground font-semibold py-3 rounded-md hover:brightness-125 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {sending ? "Sending..." : <><Send size={16} /> Submit</>}
              </button>
            </form>

            <div className="mt-10 text-center flex items-center justify-center gap-2 text-muted-foreground">
              <Mail size={18} className="text-teal" />
              <a href="mailto:BIMetryx@hotmail.com" className="text-sm hover:text-teal transition-colors">
                BIMetryx@hotmail.com
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
};

export default Contact;
