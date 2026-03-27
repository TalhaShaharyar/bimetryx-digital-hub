import { useState, useRef, type FormEvent } from "react";
import { Mail, Send, Paperclip, X, Clock, FileText, Shield } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";
import { toast } from "sonner";

const projectTypes = [
  "BIM Modeling",
  "VDC Management",
  "Clash Detection",
  "4D BIM",
  "AR/VR Visualization",
  "Custom BIM Tech / Plugin Development",
  "BIM Family & Content Library",
  "BIM for Contractors",
  "Other",
];

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setFiles([]);
      toast.success("Request submitted! You'll receive a confirmation code within 1 working day.");
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  const inputClasses =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition";

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground animate-fade-in">
            Request a Project Consultation
          </h1>
          <p className="mt-4 text-primary-foreground/60 max-w-2xl mx-auto animate-fade-in-delay-1">
            Submit your project details below. Our BIM specialists will review your requirements and respond with a confirmation code within <strong className="text-gold">1 working day</strong>.
          </p>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-navy/95 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <Clock size={18} className="text-gold shrink-0" />
              <span className="text-sm text-primary-foreground/70">Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <FileText size={18} className="text-gold shrink-0" />
              <span className="text-sm text-primary-foreground/70">Attach project documents</span>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-end">
              <Shield size={18} className="text-gold shrink-0" />
              <span className="text-sm text-primary-foreground/70">NDA available on request</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <FadeInSection>
            <div className="bg-background border border-border rounded-2xl p-6 md:p-10 shadow-sm">
              <div className="mb-8">
                <h2 className="text-xl font-heading font-bold text-navy">Project Inquiry Form</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in your details and we'll assign a dedicated BIM specialist to your request.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Full Name *</label>
                    <input id="name" name="name" type="text" required maxLength={100} placeholder="John Doe" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Company / Organization</label>
                    <input id="company" name="company" type="text" maxLength={100} placeholder="Acme Engineering" className={inputClasses} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Email Address *</label>
                    <input id="email" name="email" type="email" required maxLength={255} placeholder="john@acme.com" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Service Required *</label>
                    <select id="projectType" name="projectType" required className={inputClasses}>
                      <option value="">Select a service</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="projectScope" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Project Scope & Requirements *</label>
                  <textarea
                    id="projectScope"
                    name="projectScope"
                    required
                    rows={5}
                    maxLength={3000}
                    placeholder="Describe your project scope, timelines, LOD requirements, disciplines involved, and any specific standards or BIM execution plans you follow..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Attachments <span className="text-muted-foreground font-normal normal-case">(BEP, drawings, specs — max 5 files)</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition group"
                  >
                    <Paperclip size={24} className="mx-auto text-muted-foreground group-hover:text-accent transition-colors" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to attach project documents
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">PDF, DWG, RVT, IFC, NWD, ZIP</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.dwg,.rvt,.ifc,.nwd,.zip,.xlsx,.docx,.png,.jpg"
                    onChange={handleFileAdd}
                    className="hidden"
                  />
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between bg-muted rounded-lg px-4 py-2 text-sm">
                          <span className="truncate text-foreground">{f.name}</span>
                          <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition ml-3">
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-navy text-primary-foreground font-semibold py-3.5 rounded-xl hover:brightness-125 transition flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                >
                  {sending ? "Submitting..." : <><Send size={16} /> Submit Project Request</>}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  You'll receive a confirmation code via email within <strong>1 working day</strong>. Our team reviews every submission personally.
                </p>
              </form>
            </div>

            <div className="mt-8 text-center flex items-center justify-center gap-2 text-muted-foreground">
              <Mail size={18} className="text-gold" />
              <a href="mailto:BIMetryx@hotmail.com" className="text-sm hover:text-gold transition-colors">
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
