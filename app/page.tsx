"use client";

import { useEffect, useRef, useState } from "react";
import {
  TrendingUp, ArrowRight,
  CheckCircle2, Globe, User,
  ShoppingBag, Palette, Wrench, ChevronRight, ChevronLeft, ArrowLeft, Phone,
} from "lucide-react";

/* ─── Types ─── */
type Lang = "he" | "en";

/* ─── Translations ─── */
const translations = {
  en: {
    navServices: "Services",
    navWhyUs: "Why Us",
    navPortfolio: "Portfolio",
    navProcess: "Process",
    navContact: "Contact",
    navCta: "Get a Free Quote",

    badge1: "Fast Delivery",
    badge2: "High Converting",
    badge3: "Custom Design",
    heroTitle: "We Build Websites",
    heroAccent: "That Actually Convert",
    heroSubtitle: "Custom landing pages and websites designed to bring you more clients. Clean code, fast delivery, results that matter.",
    heroCta: "Get a Free Quote",
    heroViewWork: "View Our Work",
    stat1Label: "Projects",
    stat2Label: "Avg Delivery",
    stat3Label: "Satisfaction",

    servicesTag: "What We Do",
    servicesTitle: "Services",
    service1Title: "Landing Pages",
    service1Desc: "High-converting single pages built to turn visitors into paying customers with clear CTAs and persuasive copy.",
    service1Tag: "Most Popular",
    service4Tag: "",
    service2Title: "Business Websites",
    service2Desc: "Professional multi-page websites that establish credibility and showcase your brand to the world.",
    service3Title: "Shopify Stores",
    service3Desc: "Custom Shopify storefronts optimized for product discovery, trust, and frictionless checkout.",
    service4Title: "UI/UX Design",
    service4Desc: "Clean interface design focused on user experience — wireframes, prototypes, and polished visuals.",

    whyTag: "Why Choose Us",
    whyTitle: "Built Different",
    why1Title: "Fast Delivery",
    why1Desc: "Most projects delivered in 3–7 days. We respect your time and deadlines.",
    why2Title: "Clean Code",
    why2Desc: "Semantic HTML, modern CSS, and well-structured code that's easy to maintain.",
    why3Title: "Mobile Optimized",
    why3Desc: "Pixel-perfect on every screen size — desktop, tablet, and mobile.",
    why4Title: "Conversion Focused",
    why4Desc: "Every design decision is made with one goal: turning visitors into clients.",

    portfolioTag: "Our Work",
    portfolioTitle: "Recent Projects",
    proj1Category: "Landing Page",
    proj1Desc: "Premium landing page for a Haifa-based barber with personal branding, work gallery, and WhatsApp conversion.",
    proj2Category: "Web App / Finance",
    proj2Desc: "Stock analysis platform with smart tools for scanning, tracking, and real-time market analysis.",
    viewProjectBtn: "View Project",
    proj3Category: "Landing Page / Private Chef",
    proj3Desc: "Luxury landing page for a private chef with personal branding, clean user experience, and strong WhatsApp conversion focus.",

    processTag: "How It Works",
    processTitle: "Our Process",
    step1Title: "Contact",
    step1Desc: "Reach out via WhatsApp or the form. We'll discuss your goals, timeline, and requirements.",
    step2Title: "Design",
    step2Desc: "We create a clean, conversion-focused design tailored to your brand and audience.",
    step3Title: "Build",
    step3Desc: "Development begins with clean code, fast load times, and pixel-perfect implementation.",
    step4Title: "Launch",
    step4Desc: "We hand over the finished product, ready to go live and start converting visitors.",

    ctaTitle: "Ready to grow your business?",
    ctaSubtitle: "Let's build something great together. Free consultation, no strings attached.",
    ctaButton: "Start Now",

    contactTag: "Get In Touch",
    contactTitle: "Let's Talk",
    contactSubtitle: "Fill out the form and we'll get back to you shortly.",
    formNameLabel: "Full Name",
    formNamePlaceholder: "John Smith",
    formPhoneLabel: "Phone Number",
    formPhonePlaceholder: "+1 (555) 000-0000",
    formDetailsLabel: "Additional Details",
    formDetailsPlaceholder: "Tell us about your project...",
    formSubmit: "Send Message",
    modalTitle: "Thank you!",
    modalText: "We received your details and will get back to you shortly.",
    modalClose: "Close",
    formSuccessTitle: "Message Sent!",
    formSuccessDesc: "We'll redirect you to WhatsApp to complete your request.",
    formMsgName: "Name",
    formMsgPhone: "Phone",
    formMsgDetails: "Details",

    footerRights: "All rights reserved.",
    footerServices: "Services",
    footerPortfolio: "Portfolio",
    footerContact: "Contact",
  },
  he: {
    navServices: "שירותים",
    navWhyUs: "למה אנחנו",
    navPortfolio: "פורטפוליו",
    navProcess: "תהליך",
    navContact: "צור קשר",
    navCta: "קבל הצעת מחיר",

    badge1: "משלוח מהיר",
    badge2: "המרה גבוהה",
    badge3: "עיצוב מותאם",
    heroTitle: "עוזרים לבעלי עסקים",
    heroAccent: "להוציא יותר מהמוצר שלהם",
    heroSubtitle: "דפי נחיתה ואתרי תדמית שעוזרים לבעלי עסקים להשיג זרם פניות קבוע.",
    heroCta: "להצעת מחיר",
    heroViewWork: "העבודות שלנו",
    stat1Label: "פרויקטים",
    stat2Label: "זמן משלוח",
    stat3Label: "שביעות רצון",

    servicesTag: "",
    servicesTitle: "השירותים שלנו",
    service1Title: "דפי נחיתה",
    service1Desc: "דפי נחיתה ממוקדי המרה שעוזרים לעסק שלך לקבל יותר פניות בצורה ברורה, מהירה ומדויקת.",
    service1Tag: "הפופולרי ביותר",
    service4Tag: "",
    service2Title: "אתרי תדמית",
    service2Desc: "אתרי תדמית מקצועיים שמציגים את העסק שלך כמו שצריך ובונים אמון מול לקוחות חדשים.",
    service3Title: "חנויות אונליין",
    service3Desc: "חנויות אונליין שנבנות כדי למכור — חוויית משתמש נוחה, עיצוב נקי ותהליך רכישה פשוט.",
    service4Title: "תחזוקת אתרים",
    service4Desc: "עדכונים, שינויים, שיפורים ותמיכה שוטפת כדי שהאתר שלך יישאר מעודכן, מהיר ומדויק לאורך זמן.",

    whyTag: "למה לבחור בנו",
    whyTitle: "שונים מהאחרים",
    why1Title: "משלוח מהיר",
    why1Desc: "רוב הפרויקטים מסופקים תוך 3–7 ימים. אנחנו מכבדים את הזמן שלך.",
    why2Title: "קוד נקי",
    why2Desc: "HTML סמנטי, CSS מודרני וקוד מאורגן שקל לתחזוקה.",
    why3Title: "מותאם למובייל",
    why3Desc: "פיקסל-פרפקט בכל גודל מסך — דסקטופ, טאבלט ומובייל.",
    why4Title: "ממוקד המרות",
    why4Desc: "כל החלטת עיצוב מתקבלת עם מטרה אחת: הפיכת מבקרים ללקוחות.",

    portfolioTag: "העבודות שלנו",
    portfolioTitle: "פרויקטים אחרונים",
    proj1Category: "דף נחיתה",
    proj1Desc: "דף נחיתה פרימיום לספר מחיפה עם דגש על מיתוג אישי, גלריית עבודות והמרה לוואטסאפ.",
    proj2Category: "Web App / פיננסים",
    proj2Desc: "פלטפורמת ניתוח מניות עם כלים חכמים לסריקה, מעקב וניתוח שוק בזמן אמת.",
    viewProjectBtn: "לצפייה בפרויקט",
    proj3Category: "דף נחיתה / שף פרטי",
    proj3Desc: "דף נחיתה יוקרתי לשף פרטי, עם מיתוג אישי, חוויית משתמש נקייה ומיקוד בהמרה לוואטסאפ.",

    processTag: "איך זה עובד?",
    processTitle: "התהליך שלנו",
    step1Title: "איפיון",
    step1Desc: "אנחנו מבינים את העסק שלך, קהל היעד ומה המטרה — כדי לבנות דף שמביא תוצאות ולא רק נראה טוב.",
    step2Title: "עיצוב",
    step2Desc: "מעצבים דף נקי, מודרני וממוקד שמותאם בדיוק לקהל הלקוחות שלך.",
    step3Title: "פיתוח",
    step3Desc: "מפתחים את האתר בקוד נקי, מהיר ומותאם למובייל — בלי פשרות על איכות.",
    step4Title: "עלייה לאוויר",
    step4Desc: "האתר עולה לאוויר ומוכן להתחיל להביא לך פניות ולקוחות.",

    ctaTitle: "מוכן לצמוח עם העסק שלך?",
    ctaSubtitle: "בואו נבנה משהו מדהים יחד. ייעוץ חינם, ללא התחייבות.",
    ctaButton: "התחל עכשיו",

    contactTag: "צור קשר",
    contactTitle: "בואו נדבר",
    contactSubtitle: "השאירו פרטים ונחזור אליכם בהקדם.",
    formNameLabel: "שם מלא",
    formNamePlaceholder: "ישראל ישראלי",
    formPhoneLabel: "מספר טלפון",
    formPhonePlaceholder: "050-0000000",
    formDetailsLabel: "פרטים נוספים",
    formDetailsPlaceholder: "ספר לנו על הפרויקט שלך...",
    formSubmit: "שלח פרטים",
    modalTitle: "תודה!",
    modalText: "קיבלנו את הפרטים שלך ונחזור אליך בהקדם.",
    modalClose: "סגור",
    formSuccessTitle: "נשלח בהצלחה!",
    formSuccessDesc: "תועבר לוואטסאפ להשלמת הפנייה.",
    formMsgName: "שם",
    formMsgPhone: "טלפון",
    formMsgDetails: "פרטים נוספים",

    footerRights: "כל הזכויות שמורות.",
    footerServices: "שירותים",
    footerPortfolio: "פורטפוליו",
    footerContact: "צור קשר",
  },
} as const;

type T = { [K in keyof typeof translations.en]: string };

/* ─── Helpers ─── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Logo ─── */

function Logo() {
  return (
    <div dir="ltr" className="flex flex-row items-baseline gap-2">
      <span className="font-bold text-xl tracking-[0.18em] uppercase" style={{ color: "#3b82f6" }}>
        S.G
      </span>
      <span className="font-semibold text-base tracking-[0.08em] uppercase" style={{ color: "#cbd5e1" }}>
        Digital
      </span>
    </div>
  );
}

/* ─── Badge ─── */

function Badge({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#93c5fd" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
      {text}
    </span>
  );
}

/* ─── Lang Toggle ─── */

/* ─── Navbar ─── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(15,23,42,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(30,41,59,0.8)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
        <Logo />
      </div>
    </nav>
  );
}

/* ─── Hero ─── */

function Hero({ t, lang }: { t: T; lang: Lang }) {
  const Chevron   = lang === "he" ? ChevronLeft  : ChevronRight;
  const CtaArrow  = lang === "he" ? ArrowLeft    : ArrowRight;
  const isHebrew  = lang === "he";
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      style={{ paddingTop: "80px" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", right: "10%", width: 300, height: 300,
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {!isHebrew && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-in">
            {[t.badge1, t.badge2, t.badge3].map((b) => <Badge key={b} text={b} />)}
          </div>
        )}

        <h1
          className={`text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 animate-fade-up ${isHebrew ? "mt-8" : ""}`}
          style={{ color: "#f1f5f9" }}
        >
          {t.heroTitle}{" "}
          <span className="accent-gradient-text">{t.heroAccent}</span>
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed mb-10 animate-fade-up delay-200 max-w-2xl mx-auto"
          style={{ color: "#94a3b8" }}
        >
          {t.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
          <a
            href="#contact"
            className="btn-primary px-8 py-4 text-base w-full sm:w-auto flex items-center justify-center gap-2 animate-pulse-ring"
          >
            <span>{t.heroCta}</span>
            <CtaArrow size={18} />
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 rounded-[10px] text-base font-medium w-full sm:w-auto flex items-center justify-center gap-2 transition-all duration-200"
            style={{ border: "1px solid rgba(59,130,246,0.25)", color: "#94a3b8" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.5)";
              (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.25)";
              (e.currentTarget as HTMLElement).style.color = "#94a3b8";
            }}
          >
            {t.heroViewWork}
            <Chevron size={16} />
          </a>
        </div>

        {!isHebrew && (
          <div className="mt-20 grid grid-cols-3 gap-6 animate-fade-up delay-500 max-w-lg mx-auto">
            {[
              { value: "50+", label: t.stat1Label },
              { value: "3d",  label: t.stat2Label },
              { value: "100%", label: t.stat3Label },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>{value}</div>
                <div className="text-xs mt-1" style={{ color: "#64748b" }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Services ─── */

function Services({ t, lang }: { t: T; lang: Lang }) {
  const { ref, visible } = useInView();
  const icon4 = lang === "he" ? Wrench : Palette;
  const items = [
    { icon: TrendingUp,  title: t.service1Title, desc: t.service1Desc, tag: t.service1Tag, tagVariant: "blue"   as const },
    { icon: Globe,       title: t.service2Title, desc: t.service2Desc, tag: "",            tagVariant: "blue"   as const },
    { icon: ShoppingBag, title: t.service3Title, desc: t.service3Desc, tag: "",            tagVariant: "blue"   as const },
    { icon: icon4,       title: t.service4Title, desc: t.service4Desc, tag: t.service4Tag, tagVariant: "purple" as const },
  ];

  return (
    <section id="services" className="py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>{t.servicesTag}</p>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.servicesTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="card-hover rounded-2xl p-8 relative overflow-hidden"
                style={{
                  background: "rgba(30,41,59,0.5)",
                  border: "1px solid rgba(30,41,59,0.8)",
                  transition: `all 0.7s ease ${i * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                }}
              >
                {s.tag && (
                  <span
                    className="absolute top-4 end-4 text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(234,179,8,0.15)",
                      border: "1px solid rgba(234,179,8,0.4)",
                      color: "#fbbf24",
                      boxShadow: "0 0 10px rgba(234,179,8,0.15)",
                    }}
                  >
                    {s.tag}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(59,130,246,0.12)" }}>
                  <Icon size={22} style={{ color: "#3b82f6" }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "#f1f5f9" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Us ─── */


/* ─── Portfolio ─── */

function Portfolio({ t }: { t: T }) {
  const { ref, visible } = useInView();
  const projects = [
    { name: "NAPO Barber",    category: t.proj1Category, desc: t.proj1Desc, accent: "#3b82f6", tags: ["HTML","CSS","UI"],               link: "https://napo-three.vercel.app",  preview: "/napo-preview.png" },
    { name: "Harot Li",       category: t.proj2Category, desc: t.proj2Desc, accent: "#10b981", tags: ["Next.js","Supabase","AI"],        link: "https://www.harot-li.store/",   preview: "/harot-li-preview.png", showBrowserChrome: false },
    { name: "Chef Itay",      category: t.proj3Category, desc: t.proj3Desc, accent: "#8b5cf6", tags: ["HTML","CSS","UI/UX"],            link: "https://chefitay-4flff7msp-galzohar4466-6318s-projects.vercel.app/", preview: "/chef-itay-preview.png" },
  ];

  return (
    <section id="portfolio" className="py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>{t.portfolioTag}</p>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.portfolioTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <a
              key={p.name}
              href={p.link || undefined}
              target={p.link ? "_blank" : undefined}
              rel={p.link ? "noopener noreferrer" : undefined}
              className="rounded-2xl overflow-hidden card-hover block group"
              style={{
                background: "rgba(22,32,50,0.7)",
                border: "1px solid rgba(30,41,59,0.8)",
                transition: `all 0.7s ease ${i * 120}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                textDecoration: "none",
                cursor: p.link ? "pointer" : "default",
              }}
            >
              <div
                className="h-44 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.accent}15 0%, rgba(15,23,42,0.8) 100%)` }}
              >
                {/* Real screenshot */}
                {p.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.preview}
                    alt={p.name}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "top",
                      transition: "transform 0.5s ease",
                    }}
                    className="group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="mt-6 w-4/5 space-y-2">
                      <div className="h-3 rounded-full" style={{ background: `${p.accent}40`, width: "60%" }} />
                      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)", width: "80%" }} />
                      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)", width: "65%" }} />
                      <div className="h-7 rounded-lg mt-3 w-24" style={{ background: `${p.accent}50` }} />
                    </div>
                  </div>
                )}
                {/* Browser chrome — shown only when preview doesn't already contain it */}
                {p.showBrowserChrome !== false && (
                  <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-1.5 px-3 z-10" style={{ background: "rgba(0,0,0,0.55)", direction: "ltr", backdropFilter: "blur(2px)" }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ms-2 px-6 py-0.5 rounded-sm" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", fontSize: "9px" }}>
                      {p.link.replace("https://", "") || `sgdigital.co/${p.name.toLowerCase().replace(" ", "-")}`}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: p.accent }}>{p.category}</p>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "#f1f5f9" }}>{p.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{ background: "rgba(59,130,246,0.08)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.15)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg"
                    style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}35` }}
                  >
                    {t.viewProjectBtn}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process ─── */

function Process({ t }: { t: T }) {
  const { ref, visible } = useInView();
  const steps = [
    { num: "01", title: t.step1Title, desc: t.step1Desc },
    { num: "02", title: t.step2Title, desc: t.step2Desc },
    { num: "03", title: t.step3Title, desc: t.step3Desc },
    { num: "04", title: t.step4Title, desc: t.step4Desc },
  ];

  return (
    <section id="process" className="py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>{t.processTag}</p>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.processTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div
            className="hidden lg:block absolute top-10 start-[12.5%] end-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)" }}
          />
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative p-8 rounded-2xl text-center"
              style={{
                background: "rgba(22,32,50,0.7)",
                border: "1px solid rgba(30,41,59,0.8)",
                transition: `all 0.7s ease ${i * 120}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 font-mono font-bold text-lg"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#3b82f6" }}
              >
                {s.num}
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: "#f1f5f9" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */

/* ─── Contact ─── */

function Contact({ t }: { t: T }) {
  const { ref, visible } = useInView();
  const [form, setForm] = useState({ name: "", phone: "", details: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const emptyForm = { name: "", phone: "", details: "" };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setForm(emptyForm);
    setModalOpen(true);
  }

  const inputStyle = {
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(30,41,59,0.9)",
    color: "#f1f5f9",
  };

  return (
    <>
      <section id="contact" className="py-28" ref={ref}>
        <div className="max-w-xl mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>{t.contactTag}</p>
            <h2 className="text-4xl font-bold gradient-text mb-4">{t.contactTitle}</h2>
            <p style={{ color: "#64748b" }}>{t.contactSubtitle}</p>
          </div>

          <div
            className={`rounded-2xl p-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ background: "rgba(22,32,50,0.7)", border: "1px solid rgba(30,41,59,0.8)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#94a3b8" }}>{t.formNameLabel}</label>
                <div className="relative">
                  <User size={16} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
                  <input
                    type="text"
                    placeholder={t.formNamePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full ps-10 pe-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(30,41,59,0.9)"; }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#94a3b8" }}>{t.formPhoneLabel}</label>
                <div className="relative">
                  <Phone size={16} className="absolute start-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
                  <input
                    type="tel"
                    placeholder={t.formPhonePlaceholder}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="w-full ps-10 pe-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(30,41,59,0.9)"; }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#94a3b8" }}>{t.formDetailsLabel}</label>
                <textarea
                  placeholder={t.formDetailsPlaceholder}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(30,41,59,0.9)"; }}
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3.5 text-sm mt-2 flex items-center justify-center gap-2">
                <span>{t.formSubmit}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="rounded-2xl p-10 text-center max-w-sm w-full animate-fade-up"
            style={{
              background: "#1e293b",
              border: "1px solid rgba(59,130,246,0.2)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CheckCircle2 size={52} className="mx-auto mb-5" style={{ color: "#22c55e" }} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: "#f1f5f9" }}>{t.modalTitle}</h3>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#94a3b8" }}>{t.modalText}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="btn-primary px-8 py-3 text-sm"
            >
              <span>{t.modalClose}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Footer ─── */

function Footer({ t }: { t: T }) {
  return (
    <footer className="py-10 border-t" style={{ borderColor: "rgba(30,41,59,0.6)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3">
        <Logo />
        <p className="text-sm" style={{ color: "#475569" }}>
          © {new Date().getFullYear()} S.G Digital. {t.footerRights}
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  const lang: Lang = "he";
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <div dir="rtl">
      <Navbar />
      <main>
        <Hero       t={t} lang={lang} />
        <Services   t={t} lang={lang} />
        <Process    t={t} />
<Portfolio  t={t} />
        <Contact    t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
