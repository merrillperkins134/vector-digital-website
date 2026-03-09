import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// ── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { name: 'The Stack',  href: '#stack' },
  { name: 'Compare',    href: '#compare' },
  { name: 'Compliance', href: '#compliance' },
  { name: 'Support',    href: '#support' },
]

const complianceTags = ['HIPAA', 'FERPA', 'GLBA', 'SOC 2', 'CMMC']

const stackItems = [
  { icon: '🔐', title: 'Identity & Access Management',   desc: 'Single sign-on, authentication gateway, and identity provider for your entire environment.',                        tags: [{ label: 'HIPAA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '🔑', title: 'Password Management',            desc: 'Secure, self-hosted credential vault for your team — no third-party cloud storage.',                                 tags: [{ label: 'Sovereign', type: 's' }, { label: 'GLBA', type: 'c' }] },
  { icon: '🌐', title: 'Private VPN & Network Access',   desc: 'Mesh-based private networking so your team connects securely from anywhere.',                                         tags: [{ label: 'Sovereign', type: 's' }, { label: 'CMMC', type: 'c' }] },
  { icon: '☁️', title: 'Cloud Workspace & File Storage', desc: 'Your Google Drive replacement — file sync, sharing, and collaboration under your control.',                          tags: [{ label: 'HIPAA', type: 'c' }, { label: 'FERPA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '📄', title: 'Office Suite',                   desc: 'Documents, spreadsheets, and presentations — fully compatible with Microsoft formats.',                               tags: [{ label: 'Sovereign', type: 's' }] },
  { icon: '📑', title: 'PDF Utility',                    desc: 'Convert, merge, sign, and manipulate PDFs without sending documents to external services.',                            tags: [{ label: 'Sovereign', type: 's' }, { label: 'HIPAA', type: 'c' }] },
  { icon: '🏢', title: 'ERP & Business Management',      desc: 'Finance, HR, CRM, inventory and operations — all in one integrated business platform.',                               tags: [{ label: 'GLBA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '📧', title: 'Email & Calendar',               desc: 'Secure, self-hosted email and calendar to replace Google Workspace or Microsoft 365 mail.',                          tags: [{ label: 'HIPAA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '💬', title: 'Messaging & Video Conferencing', desc: 'Encrypted team chat and video calls — your Slack and Zoom replacement.',                                             tags: [{ label: 'HIPAA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '✍️', title: 'Digital Signature Management',   desc: "Legally binding e-signatures hosted in your environment — not DocuSign's servers.",                                  tags: [{ label: 'GLBA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '📋', title: 'Project Management',             desc: 'Kanban boards and task tracking built directly into your workspace environment.',                                     tags: [{ label: 'Sovereign', type: 's' }] },
  { icon: '📝', title: 'Note-Taking & Knowledge Base',   desc: 'Collaborative notes and internal documentation — your Notion alternative.',                                           tags: [{ label: 'Sovereign', type: 's' }] },
  { icon: '🎓', title: 'Learning Management System',     desc: 'Full LMS for staff training, compliance education, and course delivery.',                                             tags: [{ label: 'FERPA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '🛡️', title: '24/7 Security Monitoring & EDR', desc: 'Continuous threat detection, vulnerability scanning, endpoint security, and incident response.',                     tags: [{ label: 'HIPAA', type: 'c' }, { label: 'CMMC', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '🤖', title: 'Private AI Assistant',           desc: 'AI chat powered by leading models — hosted privately so your prompts and data never leave your environment.',         tags: [{ label: 'HIPAA', type: 'c' }, { label: 'Sovereign', type: 's' }] },
  { icon: '🌍', title: 'Web Design & UI/UX Toolkit',     desc: 'Build and manage your web presence with professional design tools, fully hosted.',                                   tags: [{ label: 'Sovereign', type: 's' }] },
]

const comparisonRows = [
  { feature: 'Data Sovereignty',                    vector: 'You own it',           google: "Google's servers",      ms: "Microsoft's servers",    vg: true,  gg: false, mg: false },
  { feature: 'Compliance-Ready (HIPAA/FERPA/GLBA)', vector: 'Built-in',             google: 'Add-ons required',      ms: 'Add-ons required',       vg: true,  gg: null,  mg: null  },
  { feature: 'Human Support Access',                vector: 'Direct line',           google: 'Premium tier only',     ms: 'Premium tier only',      vg: true,  gg: false, mg: false },
  { feature: 'Number of Vendors',                   vector: 'One — Vector Digital',  google: 'Multiple',              ms: 'Multiple',               vg: true,  gg: false, mg: false },
  { feature: 'Predictable Pricing',                 vector: 'Flat rate',             google: 'Per-seat, annual hikes', ms: 'Per-seat, annual hikes', vg: true,  gg: null,  mg: null  },
  { feature: 'ERP / Business Management',           vector: 'Included',              google: 'Not included',          ms: 'Separate product',       vg: true,  gg: false, mg: false },
  { feature: 'Private AI Assistant',                vector: 'Included',              google: 'Gemini add-on',         ms: 'Copilot add-on',         vg: true,  gg: null,  mg: null  },
  { feature: '24/7 Security Monitoring',            vector: 'Included',              google: 'Not included',          ms: 'Defender add-on',        vg: true,  gg: false, mg: null  },
]

const complianceBadges = [
  { name: 'HIPAA', desc: 'Healthcare data privacy' },
  { name: 'FERPA', desc: 'Student records protection' },
  { name: 'GLBA',  desc: 'Financial data safeguards' },
  { name: 'SOC 2', desc: 'Security & availability' },
  { name: 'CMMC',  desc: 'Defense contractor compliance' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function Tag({ label, type }) {
  const base = 'text-[0.7rem] font-semibold px-2 py-0.5 rounded border'
  const styles = type === 'c'
    ? `${base} bg-[rgba(30,58,110,0.08)] text-[#1e3a6e] border-[rgba(30,58,110,0.2)]`
    : `${base} bg-[rgba(100,116,139,0.1)] text-[#64748b] border-[rgba(100,116,139,0.2)]`
  return <span className={styles}>{label}</span>
}

function CellIcon({ good }) {
  if (good === true)  return <span className="text-green-600 font-bold">✔</span>
  if (good === false) return <span className="text-red-500 font-bold">✘</span>
  return <span className="text-yellow-600 font-bold">~</span>
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">

      {/* ── NAV ── */}
      <Disclosure as="nav" className="sticky top-0 z-50 bg-[#1e3a6e] border-b border-white/10">
        <div className="px-[6%]">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-8">
              <img src="/logo.png" alt="Vector Digital" className="h-14 w-auto shrink-0" />
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(item => (
                  <a key={item.name} href={item.href}
                    className="text-white/70 hover:bg-white/10 hover:text-white rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap">
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <a href="https://cal.com/kmperkins85/vector-digital"
              className="hidden md:inline-flex bg-white hover:bg-[#f0f4f9] text-[#1e3a6e] px-5 py-2.5 rounded-md text-sm font-bold transition-colors whitespace-nowrap">
              Book a Call
            </a>
            <div className="flex md:hidden">
              <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white focus:outline-none">
                <Bars3Icon className="block size-6 group-data-open:hidden" />
                <XMarkIcon className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>
        <DisclosurePanel className="md:hidden border-t border-white/10">
          <div className="space-y-1 px-3 pt-3 pb-4">
            {navLinks.map(item => (
              <DisclosureButton key={item.name} as="a" href={item.href}
                className="block rounded-md px-4 py-2.5 text-base font-medium text-white/70 hover:bg-white/10 hover:text-white">
                {item.name}
              </DisclosureButton>
            ))}
            <a href="https://cal.com/kmperkins85/vector-digital"
              className="block mt-2 bg-white hover:bg-[#f0f4f9] text-[#1e3a6e] px-4 py-2.5 rounded-md text-base font-bold text-center transition-colors">
              Book a Call
            </a>
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#f4f6f9] px-[6%] pt-24 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(30,58,110,0.06),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#1e3a6e]/20 bg-[#1e3a6e]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1e3a6e]">
              ⚡ Introducing Vector Stack
            </div>
            <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight text-[#1e3a6e] md:text-6xl">
              Your Data.<br />
              <span className="text-[#64748b]">Your Infrastructure.</span><br />
              Your Rules.
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-[#64748b]">
              A complete, sovereign cloud stack that replaces Google Workspace, Microsoft 365, and a dozen other vendor subscriptions with one integrated platform, one bill, and one support line.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://cal.com/kmperkins85/vector-digital"
                className="inline-block rounded-lg bg-[#1e3a6e] px-8 py-3 text-base font-bold text-white transition-all hover:bg-[#163060] hover:-translate-y-px">
                See How It Works
              </a>
              <a href="#stack"
                className="inline-block rounded-lg border border-[#1e3a6e]/30 px-8 py-3 text-base font-semibold text-[#1e3a6e] transition-colors hover:border-[#1e3a6e] hover:bg-[#1e3a6e]/5">
                Explore the Stack ↓
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d9e2ef] bg-white p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1e3a6e]/60">Why Teams Switch</p>
            <div className="mt-6 space-y-4">
              {[
                ['One Platform', 'Replace fragmented tools with a single integrated stack.'],
                ['One Security Model', 'Apply consistent policies across identity, storage, and communications.'],
                ['One Support Team', 'Work directly with engineers who know your environment.'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-lg border border-[#e3e9f2] bg-[#f9fbfe] px-4 py-3">
                  <h3 className="text-sm font-bold text-[#1e3a6e]">{title}</h3>
                  <p className="mt-1 text-sm text-[#64748b]">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[#eaeaea] pt-6 text-center">
              {[['16+', 'Integrated Tools'], ['24/7', 'Security Ops'], ['1', 'Support Line']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-extrabold text-[#1e3a6e]">{num}</div>
                  <div className="text-xs text-[#64748b]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="border-y border-[#d9e2ef] bg-[#e8eef5] px-[6%] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1e3a6e]/60">
            Compliance-ready for regulated industries
          </p>
          <div className="flex flex-wrap gap-3">
          {complianceTags.map(t => (
            <span key={t} className="rounded-md border border-[#1e3a6e]/20 bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-[#1e3a6e]">
              {t}
            </span>
          ))}
          </div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section className="bg-white px-[6%] py-20">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1e3a6e]">The Problem</p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#1e3a6e] md:text-4xl">
          Big Tech wasn't built for your compliance requirements.
        </h2>
        <p className="mb-12 max-w-xl text-lg text-[#64748b]">
          When you rely on Google, Microsoft, or AWS, you're renting access to your own data — and paying a premium to do it.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-[#f4f6f9] p-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-wider text-red-500">❌ The Big Tech Way</p>
            {[
              ['💸', 'Multiple vendor subscriptions with compounding annual price increases'],
              ['📞', 'Premium support tiers — pay more just to talk to a human'],
              ['🔓', "Your data stored on infrastructure you don't own or control"],
              ['⚠️', 'Compliance gaps that require expensive third-party audits and add-ons'],
              ['🕸️', "Sprawling tools that don't integrate cleanly — fragmented operations"],
            ].map(([icon, text]) => (
              <div key={text} className="mb-3 flex items-start gap-3 text-[0.95rem] text-[#64748b]">
                <span className="mt-0.5 shrink-0">{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[#1e3a6e]/20 bg-[#f4f6f9] p-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-wider text-[#1e3a6e]">✦ The Vector Stack Way</p>
            {[
              ['✅', 'One flat, predictable cost — no per-seat surprises or hidden upsells'],
              ['✅', 'One support line — reach a real engineer, not a tier-1 ticket queue'],
              ['✅', 'Your data lives in your environment — sovereign, auditable, yours'],
              ['✅', 'Compliance-aligned architecture built in from day one'],
              ['✅', 'Fully integrated stack — identity, comms, storage, and security unified'],
            ].map(([icon, text]) => (
              <div key={text} className="mb-3 flex items-start gap-3 text-[0.95rem] text-[#64748b]">
                <span className="mt-0.5 shrink-0">{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="bg-[#f4f6f9] px-[6%] py-20" id="stack">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1e3a6e]">The Stack</p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#1e3a6e] md:text-4xl">
          Everything your organization needs. Nothing you don't.
        </h2>
        <p className="mb-12 max-w-xl text-lg text-[#64748b]">
          Vector Stack replaces 10+ vendor subscriptions with one cohesive, secure, compliance-ready platform.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stackItems.map(item => (
            <div key={item.title}
              className="rounded-xl border border-[#d9e2ef] bg-white p-6 transition-all hover:border-[#1e3a6e] hover:shadow-md hover:-translate-y-0.5">
              <div className="mb-3 text-3xl">{item.icon}</div>
              <h3 className="mb-2 text-[0.95rem] font-bold text-[#1e3a6e]">{item.title}</h3>
              <p className="mb-3 text-[0.82rem] leading-relaxed text-[#64748b]">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(t => <Tag key={t.label} {...t} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="bg-white px-[6%] py-20" id="compare">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1e3a6e]">How We Compare</p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#1e3a6e] md:text-4xl">Vector Stack vs. Big Tech</h2>
        <p className="mb-12 max-w-xl text-lg text-[#64748b]">
          See how a unified sovereign stack stacks up against the fragmented status quo.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#d9e2ef] shadow-sm">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-[#1e3a6e]">
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/60">Feature</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">Vector Stack</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/60">Google Workspace</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/60">Microsoft 365</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} className={`border-t border-[#eaeaea] hover:bg-[#f4f6f9] ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                  <td className="px-5 py-4 text-sm text-[#64748b]">{row.feature}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#1e3a6e]"><CellIcon good={row.vg} /> {row.vector}</td>
                  <td className="px-5 py-4 text-sm text-[#64748b]"><CellIcon good={row.gg} /> {row.google}</td>
                  <td className="px-5 py-4 text-sm text-[#64748b]"><CellIcon good={row.mg} /> {row.ms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SUPPORT ── */}
      <section className="bg-[#f4f6f9] px-[6%] py-20" id="support">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1e3a6e]">One Support Line</p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#1e3a6e] md:text-4xl">
              You call us. Not Microsoft. Not Google.
            </h2>
            <p className="mb-8 max-w-sm text-lg text-[#64748b]">
              When something goes wrong — or you just have a question — you reach a real Vector Digital engineer who knows your environment.
            </p>
            <div className="flex flex-col gap-5">
              {[
                ['📞', 'No Ticket Queues',            'Direct access to support, no tiered escalation systems to navigate.'],
                ['🧠', 'Engineers Who Know Your Stack', 'We built your environment — we know exactly how to fix it.'],
                ['💰', 'No Premium Support Upsells',   "Support is included. We don't charge more for you to talk to a human."],
              ].map(([icon, title, desc]) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d9e2ef] bg-white text-base shadow-sm">
                    {icon}
                  </div>
                  <div>
                    <h4 className="mb-0.5 text-[0.95rem] font-bold text-[#1e3a6e]">{title}</h4>
                    <p className="text-sm text-[#64748b]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#d9e2ef] bg-white p-10 text-center shadow-sm">
            <div className="text-6xl font-black text-[#1e3a6e] leading-none">1</div>
            <p className="mt-2 text-sm text-[#64748b]">vendor. One relationship. One bill.</p>
            <div className="mt-8 flex justify-center gap-10 border-t border-[#eaeaea] pt-8">
              {[['24/7', 'Monitoring'], ['16+', 'Integrated Tools'], ['0', 'Data Breaches']].map(([num, lbl]) => (
                <div key={lbl} className="text-center">
                  <div className="text-3xl font-extrabold text-[#1e3a6e]">{num}</div>
                  <div className="mt-0.5 text-xs text-[#64748b]">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="bg-[#e8eef5] px-[6%] py-20" id="compliance">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1e3a6e]/60">Compliance Ready</p>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#1e3a6e] md:text-4xl">
                Built for regulated industries from day one.
              </h2>
              <p className="text-lg text-[#64748b]">
                Vector Stack is architected to support strict regulatory frameworks instead of retrofitting controls after deployment.
                Every layer, from identity to storage to monitoring, is designed with auditability in mind.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['Audit-Ready Controls', 'Policy enforcement, access logs, and traceable change history.'],
                  ['Data Residency First', 'Infrastructure ownership and region-aware deployment models.'],
                  ['Continuous Security Ops', '24/7 monitoring, endpoint protection, and response workflows.'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-xl border border-[#1e3a6e]/15 bg-white/80 p-4 shadow-sm">
                    <h3 className="text-sm font-bold text-[#1e3a6e]">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {complianceBadges.map(b => (
                <div key={b.name} className="rounded-xl border border-[#1e3a6e]/20 bg-white px-7 py-5 shadow-sm">
                  <div className="text-lg font-extrabold text-[#1e3a6e]">{b.name}</div>
                  <div className="mt-1 text-xs text-[#64748b]">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-[#f4f6f9] px-[6%] py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(30,58,110,0.06),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1e3a6e]/60">Get Started</p>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#1e3a6e] md:text-5xl">
              Ready to leave Big Tech behind?
            </h2>
            <p className="mb-8 max-w-xl text-lg text-[#64748b]">
              Book a free discovery call and we will map your current tools, identify compliance gaps, and show a practical migration path to Vector Stack.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Current vendor and cost review',
                'Compliance controls gap assessment',
                'Rollout timeline and support model',
                'Custom implementation scope',
              ].map(item => (
                <div key={item} className="rounded-lg border border-[#1e3a6e]/15 bg-white/80 px-4 py-3 text-sm text-[#1e3a6e] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#d9e2ef] bg-white p-8 shadow-md">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1e3a6e]/60">What Happens Next</p>
            <div className="mt-5 space-y-4">
              {[
                ['1', 'Discovery Call', 'Share goals, constraints, and current architecture.'],
                ['2', 'Stack Blueprint', 'Receive a tailored stack and migration recommendation.'],
                ['3', 'Launch Plan', 'Get timeline, ownership, and ongoing support details.'],
              ].map(([step, title, desc]) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1e3a6e] text-sm font-bold text-white">{step}</div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1e3a6e]">{title}</h3>
                    <p className="text-sm text-[#64748b]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://cal.com/kmperkins85/vector-digital"
              className="mt-8 inline-block w-full rounded-lg bg-[#1e3a6e] px-8 py-3 text-center text-base font-bold text-white transition-all hover:bg-[#163060] hover:-translate-y-px">
              Book a Free Call →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#1e3a6e] px-[6%] py-6 text-sm text-white/60">
        <div>© 2026 Vector Digital, Inc. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="https://vectordigital.io"                 className="hover:text-white transition-colors">vectordigital.io</a>
          <a href="https://x.com/VectorDigital21"            className="hover:text-white transition-colors">Twitter</a>
          <a href="https://www.instagram.com/vectordigital21" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </footer>

    </div>
  )
}
