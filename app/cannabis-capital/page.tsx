"use client";

import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const GREEN = "#2D5016";
const WARM_BG = "#FAFAF7";
const DARK = "#1A1A1A";
const MUTED = "#6B6B60";
const CARD_BORDER = "#E8E5DF";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function CannabisCapitalPage() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({ businessName: "", contactName: "", email: "", phone: "", licenseType: "Licensed Producer", revenue: "$120K - $500K", monthlyRevenue: "", financing: "Hard Money Lending", amount: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 300);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/landing-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "cannabis-capital", name: formData.contactName, email: formData.email, phone: formData.phone,
          company: formData.businessName, license_type: formData.licenseType, annual_revenue: formData.revenue,
          monthly_revenue: formData.monthlyRevenue, financing_type: formData.financing, amount: formData.amount, message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const cannabisTeam = [
    {
      name: "Saadiq Abdullah Khan", title: "VP of Origination", org: "SET Ventures | WAVMVMT", photo: "/team/shim.jpeg", initial: "S", linkedin: "https://www.linkedin.com/in/saadiq-khan-412838157/",
      bio: "Saadiq leads origination and technology at SET Ventures, and he brings something no traditional lender can replicate: over a decade immersed in the music, entertainment, and cannabis communities long before legalization made them mainstream.\n\nThat cultural proximity means when a cannabis operator walks through the door, Saadiq understands their world. He knows the challenges, the stigma, the reality of running a licensed business that banks refuse to serve. That lived experience shapes how SET builds its products and how operators are treated throughout the process.\n\nAs founder of WAVMVMT, Saadiq architects the digital infrastructure behind SET\u2019s cannabis financing operations: automated qualification workflows, operator intake platforms, and AI-powered deal origination systems that enable SET to identify, evaluate, and fund cannabis businesses at scale.\n\nHis rare combination of cultural understanding and technical capability is the reason SET can move faster, connect deeper, and serve operators in ways that traditional finance simply cannot."
    },
    {
      name: "Chris Marchese", title: "Founder and CEO", org: "SET Enterprises", photo: "/team/chris.webp", initial: "C", linkedin: "https://www.linkedin.com/in/thechrismarchese/",
      bio: "Chris built SET Enterprises into an integrated capital, infrastructure, and growth platform responsible for over $500M in revenue. For cannabis operators, what that means is simple: you are not working with a startup lender. You are working with an organization that has the infrastructure, capital relationships, and operational discipline to actually deliver.\n\nSET operates within a $5B+ allocation pipeline across real estate, energy, and infrastructure. Chris is bringing that same institutional-grade approach to cannabis because the industry cannot scale without serious capital behind it. The financing structures SET deploys in Canada and the US have been tested and refined across multiple sectors and geographies.\n\nHis background as a licensed millwright gave him a systems-first philosophy: build the infrastructure correctly, and the output becomes predictable. That is exactly how SET\u2019s cannabis division operates."
    },
    {
      name: "Tyler Ferguson", title: "CFO", org: "SET Enterprises | Bender Carey Capital", photo: "/team/tyler.jpeg", initial: "T", linkedin: "https://www.linkedin.com/in/tylerjamesferguson/",
      bio: "Tyler has originated eight-figure transaction volumes across real estate, structured finance, and alternative lending over more than a decade in capital markets. For cannabis operators, Tyler is the person who makes capital available that traditional lenders refuse to touch.\n\nAs CFO of SET Enterprises and Senior Vice President of Origination at Bender Carey Capital, Tyler\u2019s network spans institutional investors, family offices, and private credit funds. His expertise in structuring capital stacks means SET can offer cannabis operators private margin loans, merchant cash advances, equipment financing, and real estate lending with terms and speed that banks cannot match.\n\nHis advisory work with family offices is the key unlock for cannabis: private capital that understands the industry, deployed with flexibility and without the stigma that traditional institutions still carry."
    },
    {
      name: "Keshia Kraeuter", title: "Business Development", org: "SET Enterprises", photo: "/team/keshia.jpeg", initial: "K", linkedin: "https://www.linkedin.com/in/keshiakraeuter/",
      bio: "Keshia is the front line of SET\u2019s cannabis operation and the first person most operators speak with. She drives business development across Canada and the US, identifying and qualifying licensed operators who need access to financing.\n\nIn a market where most lenders have let operators down, Keshia\u2019s ability to build trust quickly is what makes the pipeline move. She manages the intake process from first contact through qualification, ensuring every operator is matched with the right financing product for their stage, scale, and needs.\n\nHer direct outreach to LPs, processors, dispensary owners, and delivery services means she understands the day-to-day reality of running a cannabis business. When you speak with Keshia, you are speaking with someone who has heard your challenges before and knows exactly how SET can help."
    },
    {
      name: "Sonia M. Passacquale", title: "VP", org: "SET Enterprises", photo: "/team/sonia.jpeg", initial: "S", linkedin: "https://www.linkedin.com/in/sonia-m-p-11a5b698/",
      bio: "Sonia is the operational backbone of SET\u2019s cannabis lending process. She manages relationships with operators from application through funding, coordinates due diligence across legal and compliance teams, and ensures every transaction meets Canadian and US regulatory requirements.\n\nFor operators, Sonia is the person who makes the process feel professional and organized. In an industry where operators are used to being ignored or deprioritized by financial institutions, Sonia ensures that SET delivers on its promise of speed, transparency, and respect at every stage.\n\nHer attention to operational detail means nothing falls through the cracks between application and funding. When Sonia is managing your transaction, you know it is moving forward."
    },
    {
      name: "Darren Pereira", title: "Cannabis Operations and Strategy", org: "GreenLit Canada | Boardy Ventures", photo: "/team/darren.jpeg", initial: "D", linkedin: "https://www.linkedin.com/in/darrenpereira/",
      bio: "Darren is a cannabis operator, technologist, and capital connector with two decades building at the intersection of culture and emerging technology. He is not advising from the outside. He is in the trenches.\n\nAs CMO of GreenLit Canada in Toronto, Darren built and deployed the world\u2019s first voice AI budtender, live in a real dispensary. GreenLit is now building a franchise model that puts AI at the center of cannabis retail, with pilots underway targeting 1,000+ US dispensaries. He knows what operators need because he is one.\n\nAs a Deal Partner at Boardy Ventures, Darren connects early-stage founders in AI, culture, and regulated markets with serious capital. He holds a MASc in Electrical Engineering from the University of Waterloo.\n\nDarren\u2019s deep roots in the Canadian cannabis ecosystem, hands-on operator experience, and capital network make him the bridge between SET\u2019s financing solutions and the operators who need them most."
    },
  ];

  const categoryData = [
    {
      title: "Licensed Producers",
      icon: "\uD83C\uDF31",
      scenarios: [
        { situation: "Facility Expansion in Ontario", desc: "You hold a standard cultivation licence and demand is outpacing your current grow capacity. You need $1.2M to build out an additional 15,000 sq ft of canopy but your bank will not touch cannabis real estate.", product: "Real Estate & Infrastructure Lending" },
        { situation: "Equipment Upgrade for Extraction", desc: "Your LP is adding concentrate and edible SKUs to compete with larger producers. New CO2 extraction and distillation equipment runs $400K+ and your operating cash flow cannot absorb it without impacting payroll.", product: "Equipment Financing" },
        { situation: "Bridge Financing During Licence Renewal", desc: "Health Canada is processing your licence amendment for a new product category. Revenue from the new line is 60\u201390 days away but you need working capital now to prepare inventory and packaging.", product: "Cannabis MCA" },
        { situation: "Seasonal Harvest Working Capital", desc: "Outdoor cultivation in British Columbia means harvest hits once per year but costs run year-round. You need $300K in working capital to fund trimming, curing, and packaging labour through Q4.", product: "Private Margin Loan" },
      ],
    },
    {
      title: "Processors & Extractors",
      icon: "\u2697\uFE0F",
      scenarios: [
        { situation: "Lab Buildout for New Product Lines", desc: "Consumer demand is shifting to concentrates and vapes. You need a GMP-compliant extraction lab but the $600K buildout cost exceeds your current credit capacity. Traditional lenders will not finance cannabis-related construction.", product: "Real Estate & Infrastructure Lending" },
        { situation: "Packaging Line Upgrade", desc: "Provincial regulations in Ontario require child-resistant packaging updates. A new automated packaging line costs $180K and you need it installed before the compliance deadline in 90 days.", product: "Equipment Financing" },
        { situation: "Scaling to Meet Retail Demand", desc: "Three major retail chains want your concentrates on shelves across Alberta. You need $250K to scale production, hire extraction technicians, and secure bulk solvent supply before the window closes.", product: "Cannabis MCA" },
        { situation: "Compliance System Investment", desc: "Seed-to-sale tracking upgrades and quality assurance systems are needed to maintain your processing licence. The $120K investment protects your entire operation but depletes your cash reserves.", product: "Private Margin Loan" },
      ],
    },
    {
      title: "Retail Dispensary Owners",
      icon: "\uD83C\uDFEA",
      scenarios: [
        { situation: "Second Location Buildout", desc: "Your first dispensary in Toronto is profitable and you have identified a high-traffic location in Hamilton. Leasehold improvements, inventory, and three months of operating capital require $350K that your bank will not lend for cannabis retail.", product: "Real Estate & Infrastructure Lending" },
        { situation: "Inventory Financing for New Product Categories", desc: "Edibles, beverages, and concentrates are driving foot traffic at competing stores. You need $80K to stock new product categories but your supplier requires net-15 payment terms you cannot absorb right now.", product: "Cannabis MCA" },
        { situation: "POS and Technology Upgrade", desc: "Your current point-of-sale system cannot handle online ordering, loyalty programs, or real-time inventory sync across locations. A modern cannabis POS costs $60K including hardware, software, and integration.", product: "Equipment Financing" },
        { situation: "Leasehold Improvements for Compliance", desc: "Your landlord is requiring security upgrades and your provincial regulator wants a separate storage room. The $150K renovation needs to happen within 60 days to keep your licence active.", product: "Real Estate & Infrastructure Lending" },
      ],
    },
    {
      title: "Delivery Services",
      icon: "\uD83D\uDE9A",
      scenarios: [
        { situation: "Fleet Expansion Across the GTA", desc: "Demand for same-day cannabis delivery in the Greater Toronto Area is growing 40% quarter-over-quarter. You need 8 new vehicles, GPS tracking systems, and driver onboarding capital totalling $200K.", product: "Equipment Financing" },
        { situation: "Cold Chain Infrastructure", desc: "Edible and beverage delivery requires temperature-controlled vehicles and storage. Retrofitting your fleet and warehouse for cold chain compliance costs $120K.", product: "Equipment Financing" },
        { situation: "Tech Platform Development", desc: "Your delivery app needs real-time tracking, age verification, and integration with retail POS systems. Development and launch costs $180K but the competitive window is closing fast.", product: "Cannabis MCA" },
        { situation: "Working Capital for Rapid Scaling", desc: "You have signed delivery contracts with 12 new dispensaries across Ontario. Onboarding drivers, securing insurance, and managing float requires $150K in immediate working capital.", product: "Private Margin Loan" },
      ],
    },
    {
      title: "Multi-Site Operators",
      icon: "\uD83C\uDFD7\uFE0F",
      scenarios: [
        { situation: "Acquisition of Additional Locations", desc: "A competitor with three profitable dispensaries in Alberta is selling. The $1.5M acquisition price includes inventory, licences, and leases. You need acquisition financing that traditional banks will not provide for cannabis assets.", product: "Private Margin Loan" },
        { situation: "Centralized Processing Facility", desc: "Operating processing out of each individual location is inefficient. A centralized facility serving all your sites saves 30% on production costs but requires $800K in buildout and equipment.", product: "Real Estate & Infrastructure Lending" },
        { situation: "Brand Consolidation Capital", desc: "Your four locations operate under different brands from previous acquisitions. Rebranding, new signage, packaging redesign, and a unified marketing campaign require $250K.", product: "Capital Advisory" },
        { situation: "Cross-Province Working Capital", desc: "You operate in Ontario and British Columbia with different regulatory environments. Managing cash flow across provinces during expansion into Saskatchewan requires $400K in flexible working capital.", product: "Cannabis MCA" },
      ],
    },
    {
      title: "Ancillary Cannabis Businesses",
      icon: "\u2699\uFE0F",
      scenarios: [
        { situation: "Testing Lab Equipment", desc: "You run a cannabis testing laboratory and need $300K in new chromatography and spectroscopy equipment to meet growing demand from LPs and processors across Ontario.", product: "Equipment Financing" },
        { situation: "Packaging Company Expansion", desc: "Your cannabis-compliant packaging company has contracts with 40 LPs but needs a larger facility and automated filling equipment totalling $500K to keep up with order volume.", product: "Real Estate & Infrastructure Lending" },
        { situation: "Cannabis Technology Platform", desc: "Your seed-to-sale tracking SaaS serves 200 licensed operators. Scaling infrastructure, hiring developers, and expanding into new provinces requires $350K in growth capital.", product: "Cannabis MCA" },
        { situation: "Consulting Firm Working Capital", desc: "Your cannabis licensing consultancy has 15 active clients going through Health Canada applications. Managing consultants, legal costs, and operational overhead requires $120K to bridge to revenue collection.", product: "Private Margin Loan" },
      ],
    },
  ];

  const inputStyle = { padding: "16px 18px", borderRadius: 10, border: `1px solid ${CARD_BORDER}`, fontSize: 16, background: "#fff", color: DARK, outline: "none", width: "100%", boxSizing: "border-box" as const };

  return (
    <div style={{ background: WARM_BG, color: DARK, fontFamily: "'Inter', 'DM Sans', -apple-system, sans-serif", minHeight: "100vh" }}>

      {/* ── STICKY HEADER ───────────────────────────────── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 56, background: `${WARM_BG}f0`, backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${CARD_BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px",
        zIndex: 999, transition: "opacity 0.3s, transform 0.3s",
        opacity: showSticky ? 1 : 0, transform: showSticky ? "translateY(0)" : "translateY(-100%)", pointerEvents: showSticky ? "auto" : "none",
      }}>
        <span style={{ fontSize: 13, letterSpacing: "0.2em", color: GREEN, fontWeight: 700 }}>SET VENTURES</span>
        <a href="#apply" style={{ padding: "10px 24px", background: GREEN, color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Apply Now</a>
      </div>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?w=1600&q=80&fit=crop" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${WARM_BG}40 0%, ${WARM_BG} 85%)` }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div style={{ fontSize: 14, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 24 }}>
            SET ENTERPRISES &nbsp;|&nbsp; SET VENTURES
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.02em" }}>
            Capital Solutions<br />for Cannabis.
          </h1>
          <p style={{ fontSize: "clamp(17px, 2.2vw, 22px)", color: MUTED, lineHeight: 1.6, marginBottom: 8 }}>
            Finally.
          </p>
          <div style={{ width: 60, height: 2, background: GREEN, margin: "24px auto", borderRadius: 1 }} />
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>
            Bringing proven US financing structures to cannabis operators in Canada and the United States. Hard money lending, merchant cash advances, real estate, and equipment financing for licensed operators.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#solutions" style={{ padding: "16px 36px", background: GREEN, color: "#fff", borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em" }}>
              Explore Solutions
            </a>
            <a href="#apply" style={{ padding: "16px 36px", background: "transparent", color: DARK, borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: "none", border: `1px solid ${CARD_BORDER}`, letterSpacing: "0.05em" }}>
              Apply Now
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}>
          <div style={{ width: 1, height: 40, background: GREEN, margin: "0 auto 8px", animation: "pulse 2s infinite" }} />
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: MUTED }}>SCROLL</div>
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────── */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${CARD_BORDER}` }}>
        <FadeIn>
          <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 12 }}>THE CHALLENGE</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginBottom: 24 }}>Cannabis Operators<br />Deserve Better Capital Access</h2>
            <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
              Over 4,300 licensed cannabis operators across Canada. Nearly 3,800 retail dispensaries. And the Big Five banks will not lend to any of them. In the US, federal banking restrictions create the same barrier for thousands more operators. Traditional financial institutions continue to treat cannabis as untouchable, leaving licensed, revenue-generating businesses without the capital they need to grow.
            </p>
            <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
              Several alternative lenders have recently exited the market entirely, tightening capital access even further. The estimated unmet demand from retail alone exceeds CAD $170 million.
            </p>
            <p style={{ fontSize: 17, color: DARK, lineHeight: 1.8, fontWeight: 600 }}>
              We are changing that. SET Enterprises brings creative financing solutions proven in the US cannabis market and deploys them for operators in both Canada and the United States through direct capital partner relationships.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 24, marginTop: 36, padding: "28px 0", borderTop: `1px solid ${CARD_BORDER}` }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: GREEN }}>$7.7B</div>
                <div style={{ fontSize: 13, color: MUTED, letterSpacing: "0.05em", marginTop: 4 }}>Canadian Cannabis Market 2026</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: GREEN }}>4,300+</div>
                <div style={{ fontSize: 13, color: MUTED, letterSpacing: "0.05em", marginTop: 4 }}>Licensed Operators</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: GREEN }}>$170M+</div>
                <div style={{ fontSize: 13, color: MUTED, letterSpacing: "0.05em", marginTop: 4 }}>Estimated Unmet Capital Demand</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SOLUTIONS ────────────────────────────────────── */}
      <section id="solutions" style={{ padding: "80px 24px", borderTop: `1px solid ${CARD_BORDER}` }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 12 }}>FINANCING SOLUTIONS</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700 }}>Solutions to Scale Your Operation</h2>
          </div>
        </FadeIn>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            {
              title: "Private Margin Loan",
              subtitle: "Family Office Lending for Established Operators",
              image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&fit=crop",
              teaser: "Family office backed private margin loans with up to 48 month terms, quarterly interest only payments, and rates starting from 4.5% for qualified operators.",
              details: [
                "Private margin loan structure backed by family office capital",
                "Terms up to 48 months",
                "Quarterly interest only payments",
                "Rates starting from 4.5%",
                "For licensed producers, processors, and established operators",
              ],
              extended: "Our private margin loan program connects qualified cannabis operators with family office capital that understands the industry. Designed for operators who need patient, long-term capital for facility expansion, license acquisition, or strategic working capital. Structured through private institutional channels with full compliance documentation.",
              accent: GREEN,
            },
            {
              title: "Cannabis MCA",
              subtitle: "Fast Capital When You Need It",
              image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop",
              teaser: "Private institution facilitated merchant cash advances with funding in as little as 24 to 72 hours for qualified operators.",
              details: [
                "Funding in 24 to 72 hours",
                "$120K minimum annual revenue to qualify",
                "Weekly repayment structure",
                "Amount based on credit score, transaction history, and use of funds",
                "For dispensaries, retail operators, and delivery services",
              ],
              extended: "When you need capital fast, our MCA program delivers. Whether it is inventory for a seasonal surge, payroll during a growth phase, or equipment that cannot wait, we evaluate your business based on real performance metrics and fund accordingly. No traditional bank underwriting. No months of waiting.",
              accent: "#1a6b3c",
            },
            {
              title: "Real Estate and Infrastructure",
              subtitle: "Build, Expand, and Secure Your Locations",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop",
              teaser: "Commercial property financing for cannabis facilities, retail locations, and multi-site expansion strategies.",
              details: [
                "Commercial property loans for cannabis facilities",
                "Retail front financing for dispensary locations",
                "Location expansion loans for multi-site operators",
                "Construction and build-out financing",
                "For operators scaling their physical footprint",
              ],
              extended: "Real estate is the foundation of every cannabis operation. Whether you are securing your first retail location, expanding to a second or third site, or building out a processing facility, we provide the real estate capital that traditional commercial lenders will not underwrite for cannabis-related properties.",
              accent: "#4a3728",
            },
            {
              title: "Equipment Financing",
              subtitle: "Upgrade Your Operations Without Depleting Cash",
              image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&fit=crop",
              teaser: "Dedicated equipment financing for cultivation, processing, extraction, security, and retail technology systems.",
              details: [
                "Processing and extraction equipment",
                "Cultivation infrastructure (lighting, HVAC, irrigation)",
                "Security and compliance systems",
                "Point of sale and retail technology",
                "Packaging and post-harvest equipment",
              ],
              extended: "Modern cannabis operations require specialized equipment that represents significant capital investment. Our equipment financing allows you to acquire the technology and infrastructure you need while preserving working capital for daily operations.",
              accent: "#2a4a5a",
            },
            {
              title: "Capital Advisory",
              subtitle: "Raise Ready Preparation and Strategic Advisory",
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&fit=crop",
              teaser: "End to end capital advisory for cannabis operators preparing to raise. Data room creation, financial modeling, investor materials, and strategic positioning.",
              details: [
                "Raise readiness assessment and preparation",
                "Data room creation and organization",
                "Financial modeling and projections",
                "Pitch deck and investor materials development",
                "Investor targeting and introduction strategy",
              ],
              extended: "Most cannabis operators know they need capital but are not prepared to raise it. Our capital advisory packages take operators from idea to investor ready: institutional grade data rooms, financial models that withstand scrutiny, and pitch materials that speak the language of capital.",
              accent: GREEN,
              link: "https://setcapitaladvisory.vercel.app/founders",
            },
            {
              title: "Marketing and CMO Placements",
              subtitle: "Senior Level Growth Infrastructure for Cannabis Brands",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop",
              teaser: "Fractional CMO placements, revenue systems deployment, media buying, and full stack marketing infrastructure for cannabis operators ready to scale.",
              details: [
                "Fractional CMO and senior marketing placements",
                "Media buying and paid acquisition strategy",
                "Brand development and market positioning",
                "Revenue systems and conversion optimization",
                "Content strategy and digital presence",
              ],
              extended: "Cannabis operators face unique marketing constraints that most agencies do not understand. SET Marketing deploys senior level marketing leadership directly into cannabis businesses. From media buying strategies that navigate advertising restrictions to brand positioning that elevates your operation above the noise.",
              accent: "#3a5a28",
              link: "https://set-marketing-v2.vercel.app/",
            },
          ].map((product, i) => {
            const isOpen = expandedProduct === product.title;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  onClick={() => setExpandedProduct(isOpen ? null : product.title)}
                  style={{
                    background: "#fff", borderRadius: 16, border: `1px solid ${isOpen ? product.accent : CARD_BORDER}`,
                    transition: "all 0.4s ease", cursor: "pointer", overflow: "hidden",
                    boxShadow: isOpen ? `0 16px 48px ${product.accent}15` : "none",
                    transform: isOpen ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
                    <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, #fff 100%)` }} />
                  </div>

                  <div style={{ padding: "20px 28px 28px" }}>
                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{product.title}</h3>
                    <p style={{ fontSize: 15, color: product.accent, fontWeight: 600, marginBottom: 14, letterSpacing: "0.02em" }}>{product.subtitle}</p>
                    <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7, marginBottom: 14 }}>{product.teaser}</p>

                    {!isOpen && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${product.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: product.accent }}>+</div>
                        <span style={{ fontSize: 14, color: product.accent, letterSpacing: "0.05em" }}>Explore</span>
                      </div>
                    )}

                    <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.4s ease", opacity: isOpen ? 1 : 0 }}>
                      <div style={{ paddingTop: 4 }}>
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                          {product.details.map((d, j) => (
                            <li key={j} style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                              <span style={{ position: "absolute", left: 0, color: product.accent }}>&middot;</span>
                              {d}
                            </li>
                          ))}
                        </ul>
                        <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, paddingTop: 12, borderTop: `1px solid ${CARD_BORDER}` }}>
                          {product.extended}
                        </p>
                        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                          {(product as { link?: string }).link ? (
                            <>
                              <a href="https://calendly.com/marketingbyset" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: 15, color: "#fff", fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em", background: product.accent, padding: "14px 20px", borderRadius: 8, textAlign: "center" as const }}>
                                Book a Consultation &rarr;
                              </a>
                              <a href={(product as { link?: string }).link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, color: product.accent, fontWeight: 600, textDecoration: "underline", letterSpacing: "0.02em" }}>
                                Learn more about {product.title} (opens new page) &rarr;
                              </a>
                            </>
                          ) : (
                            <a href="#apply" style={{ fontSize: 14, color: product.accent, fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em" }}>
                              Apply for {product.title} &rarr;
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: DARK, color: "#fff" }}>
        <FadeIn>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 12 }}>PROCESS</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, marginBottom: 48 }}>How It Works</h2>
          </div>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {[
              { step: "01", title: "Apply", desc: "Submit your application with basic business information, financials, and licensing details. Takes less than 10 minutes." },
              { step: "02", title: "Review", desc: "Our team evaluates your operation, revenue history, and use of funds. Initial assessment within 24 to 72 hours." },
              { step: "03", title: "Fund", desc: "Once approved, capital is structured and deployed so you can focus on growing your business." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 40, fontWeight: 700, color: GREEN, marginBottom: 12 }}>{s.step}</div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#fff" }}>{s.title}</h4>
                  <p style={{ fontSize: 16, color: "#ccc", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── WHO WE WORK WITH (clickable categories) ──────── */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${CARD_BORDER}` }}>
        <FadeIn>
          <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 12 }}>ELIGIBILITY</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginBottom: 12 }}>Who We Work With</h2>
            <p style={{ fontSize: 15, color: MUTED, fontStyle: "italic", marginBottom: 32 }}>Click any category to see real scenarios where we help</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, textAlign: "left" }}>
              {categoryData.map((cat, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div
                    onClick={() => setSelectedCategory(i)}
                    style={{ padding: "20px 24px", background: "#fff", borderRadius: 12, border: `1px solid ${CARD_BORDER}`, fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: 12 }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${GREEN}12`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = CARD_BORDER; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <span style={{ fontSize: 22 }}>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p style={{ fontSize: 15, color: MUTED, marginTop: 24, lineHeight: 1.7 }}>
              We work with licensed cannabis operators in Canada and the United States. All applicants must hold valid provincial, state, or federal cannabis licensing. Financing is subject to qualification and approval.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── CATEGORY SCENARIO MODAL ──────────────────────── */}
      {selectedCategory !== null && (
        <div onClick={() => setSelectedCategory(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, maxWidth: 640, width: "100%", maxHeight: "85vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => setSelectedCategory(null)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 28, cursor: "pointer", color: "#999", zIndex: 1 }}>&times;</button>
            <div style={{ padding: "44px 36px" }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{categoryData[selectedCategory].icon}</div>
                <h3 style={{ fontSize: 26, fontWeight: 700, color: DARK, marginBottom: 4 }}>{categoryData[selectedCategory].title}</h3>
                <p style={{ fontSize: 15, color: GREEN, fontWeight: 600 }}>Real scenarios where SET provides capital</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {categoryData[selectedCategory].scenarios.map((s, si) => (
                  <div key={si} style={{ padding: "20px 24px", background: `${GREEN}04`, borderRadius: 14, border: `1px solid ${CARD_BORDER}` }}>
                    <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: DARK }}>{s.situation}</h4>
                    <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                    <div style={{ display: "inline-block", padding: "6px 14px", background: `${GREEN}12`, borderRadius: 6, fontSize: 13, color: GREEN, fontWeight: 700 }}>
                      {s.product}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <a href="#apply" onClick={() => setSelectedCategory(null)} style={{ display: "inline-block", padding: "16px 36px", background: GREEN, color: "#fff", borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: "none", letterSpacing: "0.05em" }}>
                  Apply for Financing &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── WHY SET (condensed 2x2 grid) ─────────────────── */}
      <section style={{ padding: "64px 24px", borderTop: `1px solid ${CARD_BORDER}` }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 12 }}>WHY SET</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700 }}>Built for This Industry</h2>
          </div>
        </FadeIn>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 16 }}>
          {[
            { title: "US Proven, North American Ready", desc: "Financing structures tested and refined in the US cannabis market, now deployed for operators across Canada and the United States." },
            { title: "Decades of Network", desc: "Capital markets, real estate, and alternative lending relationships built over decades. Access to financing others cannot offer." },
            { title: "Compliance First", desc: "Every transaction structured to meet Canadian and US regulatory requirements. Licensed operators only. Full documentation throughout." },
            { title: "Speed and Flexibility", desc: "From 24-hour MCA funding to 48-month hard money terms. Cannabis does not operate on bank timelines, and neither do we." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ display: "flex", gap: 16, padding: "20px 24px", background: "#fff", borderRadius: 12, border: `1px solid ${CARD_BORDER}`, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${GREEN}10`, border: `1px solid ${GREEN}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: GREEN, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{item.title}</h4>
                  <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${CARD_BORDER}` }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 12 }}>LEADERSHIP</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, marginBottom: 8 }}>Our Team</h2>
            <p style={{ fontSize: 15, color: MUTED, fontStyle: "italic" }}>Click any team member to learn more</p>
          </div>
        </FadeIn>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20, textAlign: "center" }}>
          {cannabisTeam.map((person, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                onClick={() => setSelectedPerson(i)}
                style={{ padding: "28px 16px", cursor: "pointer", borderRadius: 14, transition: "background 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${GREEN}06`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ width: 110, height: 110, borderRadius: "50%", border: `3px solid ${GREEN}40`, margin: "0 auto 14px", overflow: "hidden", background: `linear-gradient(135deg, ${GREEN}30, ${GREEN}10)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {person.photo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={person.photo} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"; }} />
                      <span style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: 28, color: GREEN, fontWeight: 700 }}>{person.initial}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 28, color: GREEN, fontWeight: 700 }}>{person.initial}</span>
                  )}
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{person.name}</h4>
                <p style={{ fontSize: 15, color: GREEN, fontWeight: 600, marginBottom: 4 }}>{person.title}</p>
                <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>{person.org}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── TEAM BIO MODAL ───────────────────────────────── */}
      {selectedPerson !== null && (
        <div onClick={() => setSelectedPerson(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, maxWidth: 600, width: "100%", maxHeight: "85vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => setSelectedPerson(null)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 28, cursor: "pointer", color: "#999", zIndex: 1 }}>&times;</button>
            <div style={{ padding: "44px 36px", textAlign: "center" }}>
              <div style={{ width: 140, height: 140, borderRadius: "50%", border: `3px solid ${GREEN}`, margin: "0 auto 20px", overflow: "hidden", background: `linear-gradient(135deg, ${GREEN}30, ${GREEN}10)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cannabisTeam[selectedPerson].photo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cannabisTeam[selectedPerson].photo} alt={cannabisTeam[selectedPerson].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"; }} />
                    <span style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: 48, color: GREEN, fontWeight: 700 }}>{cannabisTeam[selectedPerson].initial}</span>
                  </>
                ) : (
                  <span style={{ fontSize: 48, color: GREEN, fontWeight: 700 }}>{cannabisTeam[selectedPerson].initial}</span>
                )}
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 4 }}>{cannabisTeam[selectedPerson].name}</h3>
              <p style={{ fontSize: 16, color: GREEN, fontWeight: 600, marginBottom: 4 }}>{cannabisTeam[selectedPerson].title}</p>
              <p style={{ fontSize: 15, color: MUTED, marginBottom: 8 }}>{cannabisTeam[selectedPerson].org}</p>
              {cannabisTeam[selectedPerson].linkedin && (
                <a href={cannabisTeam[selectedPerson].linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#0a66c2", textDecoration: "none", fontWeight: 600, marginBottom: 24 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              )}
              <div style={{ textAlign: "left", borderTop: `1px solid ${CARD_BORDER}`, paddingTop: 20 }}>
                {cannabisTeam[selectedPerson].bio.split("\n\n").map((p, pi) => (
                  <p key={pi} style={{ fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── APPLICATION FORM ──────────────────────────────── */}
      <section id="apply" style={{ padding: "80px 24px", borderTop: `1px solid ${CARD_BORDER}` }}>
        <FadeIn>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", color: GREEN, fontWeight: 600, marginBottom: 12 }}>GET STARTED</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, marginBottom: 12 }}>Apply for Financing</h2>
            <p style={{ fontSize: 16, color: MUTED, marginBottom: 32 }}>
              Tell us about your operation and financing needs. Our team will review your application and respond within 24 to 72 hours.
            </p>

            {submitted ? (
              <div style={{ padding: "48px 24px", background: "#fff", borderRadius: 16, border: `1px solid ${GREEN}40` }}>
                <div style={{ fontSize: 15, color: GREEN, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 12 }}>APPLICATION RECEIVED</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Thank You</h3>
                <p style={{ fontSize: 16, color: MUTED }}>Our team will review your application and be in touch within 24 to 72 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>BUSINESS NAME</label>
                    <input type="text" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>CONTACT NAME</label>
                    <input type="text" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>EMAIL</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>PHONE</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>LICENSE TYPE</label>
                    <select value={formData.licenseType} onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })} style={inputStyle}>
                      <option>Licensed Producer</option>
                      <option>Processor / Extractor</option>
                      <option>Retail Dispensary</option>
                      <option>Delivery Service</option>
                      <option>Multi-Site Operator</option>
                      <option>Ancillary Business</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>ANNUAL REVENUE</label>
                    <select value={formData.revenue} onChange={(e) => setFormData({ ...formData, revenue: e.target.value })} style={inputStyle}>
                      <option>Under $120K</option>
                      <option>$120K - $500K</option>
                      <option>$500K - $1M</option>
                      <option>$1M - $5M</option>
                      <option>$5M+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>MONTHLY REVENUE</label>
                  <select value={formData.monthlyRevenue || ""} onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })} style={inputStyle}>
                    <option value="">Select monthly revenue</option>
                    <option>Under $10K</option>
                    <option>$10K - $25K</option>
                    <option>$25K - $50K</option>
                    <option>$50K - $100K</option>
                    <option>$100K - $250K</option>
                    <option>$250K - $500K</option>
                    <option>$500K+</option>
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>FINANCING NEEDED</label>
                    <select value={formData.financing} onChange={(e) => setFormData({ ...formData, financing: e.target.value })} style={inputStyle}>
                      <option>Hard Money Lending</option>
                      <option>Merchant Cash Advance</option>
                      <option>Real Estate / Infrastructure</option>
                      <option>Equipment Financing</option>
                      <option>Multiple Products</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>AMOUNT NEEDED</label>
                    <input type="text" placeholder="e.g. $250,000" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: MUTED, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>TELL US ABOUT YOUR OPERATION</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4}
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
                </div>
                <button onClick={handleSubmit} disabled={submitting}
                  style={{ padding: "18px 32px", background: GREEN, color: "#fff", borderRadius: 10, border: "none", fontSize: 16, fontWeight: 700, cursor: submitting ? "wait" : "pointer", letterSpacing: "0.05em", transition: "opacity 0.2s", marginTop: 4, opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
                {submitError && <p style={{ fontSize: 14, color: "#c00", textAlign: "center", marginTop: 8 }}>{submitError}</p>}
                <p style={{ fontSize: 13, color: MUTED, textAlign: "center", marginTop: 4 }}>
                  All applications are confidential. Licensed operators only. Subject to qualification and approval.
                </p>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ padding: "40px 24px", background: DARK, textAlign: "center" }}>
        <div style={{ fontSize: 14, color: GREEN, letterSpacing: "0.2em", fontWeight: 600, marginBottom: 8 }}>
          SET ENTERPRISES &nbsp;|&nbsp; SET VENTURES
        </div>
        <p style={{ fontSize: 14, color: "#666", margin: "0 0 4px" }}>Toronto, Ontario, Canada</p>
        <p style={{ fontSize: 13, color: "#444", margin: "0 0 12px" }}>&copy; 2026</p>
        <p style={{ fontSize: 12, color: "#444", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
          Cannabis financing available to licensed operators in Canada and the United States. All financing subject to qualification and approval. SET Enterprises is not a bank or regulated deposit-taking institution. Merchant cash advances represent a purchase of future receivables.
        </p>
      </footer>

      {/* ── BACK TO TOP ──────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed", bottom: 32, right: 32, width: 48, height: 48, borderRadius: "50%",
          background: GREEN, color: "#fff", border: "none", fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)", zIndex: 998,
          transition: "opacity 0.3s, transform 0.3s",
          opacity: showBackToTop ? 1 : 0, transform: showBackToTop ? "translateY(0)" : "translateY(20px)",
          pointerEvents: showBackToTop ? "auto" : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        &uarr;
      </button>
    </div>
  );
}

