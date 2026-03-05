export default function App() {
  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo"><img src="/logo.png" alt="Vector Digital" /></div>
        <a href="https://cal.com/kmperkins85/vector-digital" className="nav-cta">Book a Call</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">⚡ Introducing Vector Stack</div>
        <h1>Your Data.<br /><span>Your Infrastructure.</span><br />Your Rules.</h1>
        <p>A complete, sovereign cloud stack that replaces Google Workspace, Microsoft 365, and a dozen other vendor
          subscriptions — with one integrated platform, one bill, and one support line.</p>
        <div className="hero-ctas">
          <a href="https://cal.com/kmperkins85/vector-digital" className="btn-primary">See How It Works</a>
          <a href="#stack" className="btn-secondary">Explore the Stack ↓</a>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust">
        <p>Compliance-ready for regulated industries</p>
        <div className="trust-badges">
          <div className="badge">HIPAA</div>
          <div className="badge">FERPA</div>
          <div className="badge">GLBA</div>
          <div className="badge">SOC 2</div>
          <div className="badge">CMMC</div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem">
        <div className="section-label">The Problem</div>
        <div className="section-title">Big Tech wasn't built for your compliance requirements.</div>
        <p className="section-sub">When you rely on Google, Microsoft, or AWS, you're renting access to your own data —
          and paying a premium to do it.</p>
        <div className="problem-grid">
          <div className="prob-card bad">
            <div className="prob-card-label">❌ The Big Tech Way</div>
            <div className="prob-item"><span className="icon">💸</span><span>Multiple vendor subscriptions with
                compounding annual price increases</span></div>
            <div className="prob-item"><span className="icon">📞</span><span>Premium support tiers — pay more just to
                talk to a human</span></div>
            <div className="prob-item"><span className="icon">🔓</span><span>Your data stored on infrastructure you
                don't own or control</span></div>
            <div className="prob-item"><span className="icon">⚠️</span><span>Compliance gaps that require expensive
                third-party audits and add-ons</span></div>
            <div className="prob-item"><span className="icon">🕸️</span><span>Sprawling tools that don't integrate
                cleanly — fragmented operations</span></div>
          </div>
          <div className="prob-card good">
            <div className="prob-card-label">✦ The Vector Stack Way</div>
            <div className="prob-item"><span className="icon">✅</span><span>One flat, predictable cost — no per-seat
                surprises or hidden upsells</span></div>
            <div className="prob-item"><span className="icon">✅</span><span>One support line — reach a real engineer,
                not a tier-1 ticket queue</span></div>
            <div className="prob-item"><span className="icon">✅</span><span>Your data lives in your environment —
                sovereign, auditable, yours</span></div>
            <div className="prob-item"><span className="icon">✅</span><span>Compliance-aligned architecture built in
                from day one</span></div>
            <div className="prob-item"><span className="icon">✅</span><span>Fully integrated stack — identity, comms,
                storage, and security unified</span></div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="stack" id="stack">
        <div className="section-label">The Stack</div>
        <div className="section-title">Everything your organization needs. Nothing you don't.</div>
        <p className="section-sub">Vector Stack replaces 10+ vendor subscriptions with one cohesive, secure,
          compliance-ready platform.</p>
        <div className="stack-grid">
          <div className="stack-card">
            <div className="stack-icon">🔐</div>
            <h3>Identity & Access Management</h3>
            <p>Single sign-on, authentication gateway, and identity provider for your entire environment.</p>
            <div className="stack-tags"><span className="tag compliance">HIPAA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🔑</div>
            <h3>Password Management</h3>
            <p>Secure, self-hosted credential vault for your team — no third-party cloud storage.</p>
            <div className="stack-tags"><span className="tag sovereign">Sovereign</span><span className="tag compliance">GLBA</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🌐</div>
            <h3>Private VPN & Network Access</h3>
            <p>Mesh-based private networking so your team connects securely from anywhere.</p>
            <div className="stack-tags"><span className="tag sovereign">Sovereign</span><span className="tag compliance">CMMC</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">☁️</div>
            <h3>Cloud Workspace & File Storage</h3>
            <p>Your Google Drive replacement — file sync, sharing, and collaboration under your control.</p>
            <div className="stack-tags"><span className="tag compliance">HIPAA</span><span className="tag compliance">FERPA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">📄</div>
            <h3>Office Suite</h3>
            <p>Documents, spreadsheets, and presentations — fully compatible with Microsoft formats.</p>
            <div className="stack-tags"><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">📑</div>
            <h3>PDF Utility</h3>
            <p>Convert, merge, sign, and manipulate PDFs without sending documents to external services.</p>
            <div className="stack-tags"><span className="tag sovereign">Sovereign</span><span className="tag compliance">HIPAA</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🏢</div>
            <h3>ERP & Business Management</h3>
            <p>Finance, HR, CRM, inventory and operations — all in one integrated business platform.</p>
            <div className="stack-tags"><span className="tag compliance">GLBA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">📧</div>
            <h3>Email & Calendar</h3>
            <p>Secure, self-hosted email and calendar to replace Google Workspace or Microsoft 365 mail.</p>
            <div className="stack-tags"><span className="tag compliance">HIPAA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">💬</div>
            <h3>Messaging & Video Conferencing</h3>
            <p>Encrypted team chat and video calls — your Slack and Zoom replacement.</p>
            <div className="stack-tags"><span className="tag compliance">HIPAA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">✍️</div>
            <h3>Digital Signature Management</h3>
            <p>Legally binding e-signatures hosted in your environment — not DocuSign's servers.</p>
            <div className="stack-tags"><span className="tag compliance">GLBA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">📋</div>
            <h3>Project Management</h3>
            <p>Kanban boards and task tracking built directly into your workspace environment.</p>
            <div className="stack-tags"><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">📝</div>
            <h3>Note-Taking & Knowledge Base</h3>
            <p>Collaborative notes and internal documentation — your Notion alternative.</p>
            <div className="stack-tags"><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🎓</div>
            <h3>Learning Management System</h3>
            <p>Full LMS for staff training, compliance education, and course delivery.</p>
            <div className="stack-tags"><span className="tag compliance">FERPA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🛡️</div>
            <h3>24/7 Security Monitoring & Endpoint Protection</h3>
            <p>Continuous threat detection, vulnerability scanning, endpoint security, and incident response —
              including enterprise-grade EDR.</p>
            <div className="stack-tags"><span className="tag compliance">HIPAA</span><span className="tag compliance">CMMC</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🤖</div>
            <h3>Private AI Assistant</h3>
            <p>AI chat powered by leading models — hosted privately so your prompts and data never leave your
              environment.</p>
            <div className="stack-tags"><span className="tag compliance">HIPAA</span><span className="tag sovereign">Sovereign</span></div>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🌍</div>
            <h3>Web Design & UI/UX Toolkit</h3>
            <p>Build and manage your web presence with professional design tools, fully hosted.</p>
            <div className="stack-tags"><span className="tag sovereign">Sovereign</span></div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="comparison">
        <div className="section-label">How We Compare</div>
        <div className="section-title">Vector Stack vs. Big Tech</div>
        <p className="section-sub">See how a unified sovereign stack stacks up against the fragmented status quo.</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th className="highlight">Vector Stack</th>
                <th>Google Workspace</th>
                <th>Microsoft 365</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data Sovereignty</td>
                <td className="highlight"><span className="check">✔</span> You own it</td>
                <td><span className="cross">✘</span> Google's servers</td>
                <td><span className="cross">✘</span> Microsoft's servers</td>
              </tr>
              <tr>
                <td>Compliance-Ready (HIPAA/FERPA/GLBA)</td>
                <td className="highlight"><span className="check">✔</span> Built-in</td>
                <td><span className="partial">~</span> Add-ons required</td>
                <td><span className="partial">~</span> Add-ons required</td>
              </tr>
              <tr>
                <td>Human Support Access</td>
                <td className="highlight"><span className="check">✔</span> Direct line</td>
                <td><span className="cross">✘</span> Premium tier only</td>
                <td><span className="cross">✘</span> Premium tier only</td>
              </tr>
              <tr>
                <td>Number of Vendors</td>
                <td className="highlight"><span className="check">✔</span> One — Vector Digital</td>
                <td><span className="cross">✘</span> Multiple</td>
                <td><span className="cross">✘</span> Multiple</td>
              </tr>
              <tr>
                <td>Predictable Pricing</td>
                <td className="highlight"><span className="check">✔</span> Flat rate</td>
                <td><span className="partial">~</span> Per-seat, annual hikes</td>
                <td><span className="partial">~</span> Per-seat, annual hikes</td>
              </tr>
              <tr>
                <td>ERP / Business Management</td>
                <td className="highlight"><span className="check">✔</span> Included</td>
                <td><span className="cross">✘</span> Not included</td>
                <td><span className="cross">✘</span> Separate product</td>
              </tr>
              <tr>
                <td>Private AI Assistant</td>
                <td className="highlight"><span className="check">✔</span> Included</td>
                <td><span className="partial">~</span> Gemini add-on</td>
                <td><span className="partial">~</span> Copilot add-on</td>
              </tr>
              <tr>
                <td>24/7 Security Monitoring</td>
                <td className="highlight"><span className="check">✔</span> Included</td>
                <td><span className="cross">✘</span> Not included</td>
                <td><span className="partial">~</span> Defender add-on</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="support">
        <div className="support-inner">
          <div>
            <div className="section-label">One Support Line</div>
            <div className="section-title">You call us. Not Microsoft. Not Google.</div>
            <p className="section-sub">When something goes wrong — or you just have a question — you reach a real Vector
              Digital engineer who knows your environment.</p>
            <div className="support-points">
              <div className="support-point">
                <div className="dot">📞</div>
                <div className="support-point-text">
                  <h4>No Ticket Queues</h4>
                  <p>Direct access to support, no tiered escalation systems to navigate.</p>
                </div>
              </div>
              <div className="support-point">
                <div className="dot">🧠</div>
                <div className="support-point-text">
                  <h4>Engineers Who Know Your Stack</h4>
                  <p>We built your environment — we know exactly how to fix it.</p>
                </div>
              </div>
              <div className="support-point">
                <div className="dot">💰</div>
                <div className="support-point-text">
                  <h4>No Premium Support Upsells</h4>
                  <p>Support is included. We don't charge more for you to talk to a human.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="support-visual">
            <div className="big">1</div>
            <div className="label">vendor. One relationship. One bill.</div>
            <div className="support-stat-row">
              <div className="support-stat">
                <div className="num">24/7</div>
                <div className="lbl">Monitoring</div>
              </div>
              <div className="support-stat">
                <div className="num">16+</div>
                <div className="lbl">Integrated Tools</div>
              </div>
              <div className="support-stat">
                <div className="num">0</div>
                <div className="lbl">Data Breaches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="compliance-section">
        <div className="compliance-inner">
          <div className="section-label">Compliance Ready</div>
          <div className="section-title">Built for regulated industries from day one.</div>
          <p className="section-sub" style={{ margin: '0 auto' }}>Vector Stack is architected to support the strictest
            regulatory frameworks — not retrofitted to meet them after the fact.</p>
          <div className="compliance-badges">
            <div className="comp-badge">
              <div className="name">HIPAA</div>
              <div className="desc">Healthcare data privacy</div>
            </div>
            <div className="comp-badge">
              <div className="name">FERPA</div>
              <div className="desc">Student records protection</div>
            </div>
            <div className="comp-badge">
              <div className="name">GLBA</div>
              <div className="desc">Financial data safeguards</div>
            </div>
            <div className="comp-badge">
              <div className="name">SOC 2</div>
              <div className="desc">Security & availability</div>
            </div>
            <div className="comp-badge">
              <div className="name">CMMC</div>
              <div className="desc">Defense contractor compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="section-label">Get Started</div>
        <h2>Ready to leave Big Tech behind?</h2>
        <p>Book a free discovery call and we'll show you exactly how Vector Stack maps to your organization's needs.</p>
        <a href="https://cal.com/kmperkins85/vector-digital" className="btn-primary">Book a Free Call →</a>
      </section>

      {/* FOOTER */}
      <footer>
        <div>© 2026 Vector Digital, Inc. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://vectordigital.io">vectordigital.io</a>
          <a href="https://x.com/VectorDigital21">Twitter</a>
          <a href="https://www.instagram.com/vectordigital21">Instagram</a>
        </div>
      </footer>
    </>
  )
}
