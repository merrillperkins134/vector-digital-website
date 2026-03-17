import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ArrowDownTrayIcon, ArrowUpTrayIcon, PrinterIcon,
  TrashIcon, MagnifyingGlassIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline'

// ── Category → Vendor map ──────────────────────────────────────────────────

const CATEGORY_VENDORS = {
  SSO_Authentication:                       ['None','Okta','Auth0','OneLogin','Microsoft Entra ID','Ping Identity','Duo Security','JumpCloud','Keycloak','Other'],
  Password_Manager:                         ['None','Bitwarden','1Password','LastPass','Dashlane','NordPass','Keeper','RoboForm','Enpass','Other'],
  Zero_Trust_VPN:                           ['None','Zscaler','Cloudflare Access','Palo Alto Prisma','Tailscale','WireGuard','NordLayer','Perimeter 81','Twingate','Other'],
  Mail_Calendar:                            ['None','Microsoft 365','Google Workspace','Zoho Mail','ProtonMail','Fastmail','Tutanota','Rackspace Email','Other'],
  Messaging_and_Video_Conferencing:         ['None','Microsoft Teams','Slack','Zoom','Google Meet','Cisco Webex','RingCentral','GoTo Meeting','Discord','Other'],
  Cloud_Workspace:                          ['None','Microsoft 365','Google Workspace','Zoho Workplace','Dropbox Business','Box','Citrix Workspace','Other'],
  Office_Suite:                             ['None','Microsoft 365','Google Docs','LibreOffice','Zoho Docs','Apple iWork','WPS Office','OnlyOffice','Other'],
  PDF_Utility:                              ['None','Adobe Acrobat','Foxit PDF','Nitro PDF','Smallpdf','PDF Expert','Soda PDF','Other'],
  ERP:                                      ['None','SAP','Oracle NetSuite','Microsoft Dynamics 365','Sage','Odoo','Acumatica','Epicor','Infor','Other'],
  CRM:                                      ['None','Salesforce','HubSpot','Microsoft Dynamics 365','Zoho CRM','Pipedrive','Freshsales','Monday CRM','SugarCRM','Other'],
  PM_Tool:                                  ['None','Asana','Monday.com','Jira','Trello','ClickUp','Basecamp','Wrike','Smartsheet','Microsoft Project','Other'],
  Digital_Signature:                        ['None','DocuSign','Adobe Sign','HelloSign','PandaDoc','SignNow','Zoho Sign','OneSpan','Other'],
  Note_Taking:                              ['None','Notion','Evernote','Microsoft OneNote','Obsidian','Bear','Coda','Confluence','Slite','Other'],
  LMS_Hosting:                              ['None','Teachable','Thinkific','Moodle','Canvas LMS','Blackboard','TalentLMS','Docebo','LearnDash','Other'],
  Monitoring_Scanning_Endpoint_Security:    ['None','CrowdStrike','SentinelOne','Carbon Black','Sophos','Malwarebytes','ESET','Qualys','Rapid7','Tenable','Other'],
  Off_Site_Storage_Backup:                  ['None','Veeam','Acronis','Backblaze','Carbonite','Datto','AWS Backup','Azure Backup','Wasabi','CrashPlan','Other'],
  Annual_Security_Risk_Assessment:          ['None','KnowBe4','Coalfire','Rapid7','Qualys','Trustwave','A-LIGN','Schellman','Sterling','Other'],
  Policy_Management:                        ['None','PowerDMS','PolicyTech','ConvergePoint','LogicGate','ZenGRC','Hyperproof','Drata','Vanta','Other'],
  Annual_Cybersecurity_Awareness_Training:  ['None','KnowBe4','Proofpoint','SANS Security Awareness','Cofense','Infosec IQ','Ninjio','Curricula','Other'],
  AI_Chat:                                  ['None','ChatGPT / OpenAI','Claude / Anthropic','Google Gemini','Microsoft Copilot','Perplexity','Jasper','Copy.ai','Other'],
  Hosted_Web_Design_Toolkit:                ['None','Webflow','WordPress','Wix','Squarespace','Shopify','Framer','Cargo','Other'],
  UI_UX_Design:                             ['None','Figma','Adobe XD','Sketch','InVision','Canva','Framer','Axure','Marvel','Other'],
  Tiered_Customer_Support:                  ['None','Zendesk','Freshdesk','Intercom','Help Scout','Salesforce Service Cloud','HubSpot Service Hub','Zoho Desk','LiveAgent','Other'],
}

const CATEGORIES = Object.keys(CATEGORY_VENDORS)

const CHART_COLORS = [
  '#1e3a6e','#3b82f6','#6366f1','#8b5cf6','#a78bfa',
  '#06b6d4','#14b8a6','#10b981','#22c55e','#84cc16',
  '#eab308','#f59e0b','#f97316','#ef4444','#f43f5e',
  '#ec4899','#d946ef','#0ea5e9','#64748b','#475569',
  '#334155','#7c3aed','#2563eb',
]

const STORAGE_KEY = 'vectorDigital.costAnalysis.v1'

function money(n) {
  const v = Number(n)
  if (!isFinite(v)) return '$0.00'
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

function num(val) {
  const v = Number(String(val).replace(/[^0-9.]/g, ''))
  return isFinite(v) ? v : 0
}

function formatCategory(cat) {
  return cat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// ── Row component ──────────────────────────────────────────────────────────

function AnalysisRow({ row, onChange }) {
  const vendors = CATEGORY_VENDORS[row.category] || ['None', 'Other']
  const annualized = num(row.priceMonth) * num(row.users) * 12

  return (
    <div className="grid grid-cols-[2fr_1.6fr_1fr_0.7fr_1fr_1.2fr] gap-3 items-center rounded-xl border border-[#d9e2ef] bg-white px-4 py-3 hover:border-[#1e3a6e]/30 transition-colors">
      <div className="text-sm font-semibold text-[#1e3a6e] truncate" title={formatCategory(row.category)}>
        {formatCategory(row.category)}
      </div>

      <div className="flex flex-col gap-1.5">
        <select
          value={row.vendor}
          onChange={e => onChange({ ...row, vendor: e.target.value, otherVendor: e.target.value === 'Other' ? row.otherVendor : '' })}
          className="w-full rounded-lg border border-[#d9e2ef] bg-[#f9fbfe] px-3 py-2 text-sm text-[#1e3a6e] outline-none focus:border-[#1e3a6e]/40 focus:ring-2 focus:ring-[#1e3a6e]/10 truncate"
        >
          {vendors.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        {row.vendor === 'Other' && (
          <input
            type="text"
            placeholder="Type vendor/app..."
            value={row.otherVendor || ''}
            onChange={e => onChange({ ...row, otherVendor: e.target.value })}
            className="w-full rounded-lg border border-[#d9e2ef] bg-[#f9fbfe] px-3 py-2 text-sm text-[#1e3a6e] outline-none focus:border-[#1e3a6e]/40 focus:ring-2 focus:ring-[#1e3a6e]/10"
          />
        )}
      </div>

      <input
        type="text"
        inputMode="decimal"
        placeholder="0.00"
        value={row.priceMonth}
        onChange={e => onChange({ ...row, priceMonth: e.target.value })}
        className="w-full rounded-lg border border-[#d9e2ef] bg-[#f9fbfe] px-3 py-2 text-sm text-right text-[#1e3a6e] outline-none focus:border-[#1e3a6e]/40 focus:ring-2 focus:ring-[#1e3a6e]/10 tabular-nums"
      />

      <input
        type="text"
        inputMode="numeric"
        placeholder="0"
        value={row.users}
        onChange={e => onChange({ ...row, users: e.target.value })}
        className="w-full rounded-lg border border-[#d9e2ef] bg-[#f9fbfe] px-3 py-2 text-sm text-right text-[#1e3a6e] outline-none focus:border-[#1e3a6e]/40 focus:ring-2 focus:ring-[#1e3a6e]/10 tabular-nums"
      />

      <div className="text-right pr-1">
        <div className="text-sm font-extrabold text-[#1e3a6e] tabular-nums">{money(annualized)}</div>
        <div className="text-[0.7rem] text-[#64748b]">annual spend</div>
      </div>

      <textarea
        placeholder="Notes..."
        value={row.notes}
        onChange={e => onChange({ ...row, notes: e.target.value })}
        rows={1}
        className="w-full rounded-lg border border-[#d9e2ef] bg-[#f9fbfe] px-3 py-2 text-sm text-[#64748b] outline-none focus:border-[#1e3a6e]/40 focus:ring-2 focus:ring-[#1e3a6e]/10 resize-y min-h-[38px] max-h-[100px]"
      />
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function CostAnalysisTool() {
  const [rows, setRows] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const payload = JSON.parse(raw)
        if (payload.rows?.length) return payload.rows
      }
    } catch { /* ignore */ }
    return CATEGORIES.map(cat => ({
      category: cat, vendor: 'None', otherVendor: '', priceMonth: '', users: '', notes: '',
    }))
  })

  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const pieRef = useRef(null)
  const barRef = useRef(null)
  const fileRef = useRef(null)
  const saveTimer = useRef(null)

  // Auto-save
  useEffect(() => {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: new Date().toLocaleString(), rows }))
    }, 400)
  }, [rows])

  // Charts
  const drawCharts = useCallback(() => {
    drawPieChart(pieRef.current, rows)
    drawBarChart(barRef.current, rows)
  }, [rows])

  useEffect(() => {
    drawCharts()
    const onResize = () => drawCharts()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [drawCharts])

  // ── Derived stats ────────────────────────────────────────────────────────
  let totalAnnual = 0, totalUsers = 0, activeCount = 0
  const catSpend = {}

  for (const r of rows) {
    const ann = num(r.priceMonth) * num(r.users) * 12
    const u = num(r.users)
    totalAnnual += ann
    totalUsers += u
    if (ann > 0) activeCount++
    catSpend[r.category] = (catSpend[r.category] || 0) + ann
  }

  let topCat = '--', topAmt = 0
  for (const [cat, amt] of Object.entries(catSpend)) {
    if (amt > topAmt) { topAmt = amt; topCat = cat }
  }

  // ── Filter ───────────────────────────────────────────────────────────────
  const filteredRows = rows.filter(r => {
    const q = search.toLowerCase()
    const vendorText = r.vendor === 'Other' ? r.otherVendor : r.vendor
    const text = [r.category, vendorText, r.notes].join(' ').toLowerCase()
    const matchSearch = !q || text.includes(q)
    const matchCat = !filterCat || r.category === filterCat
    return matchSearch && matchCat
  })

  // ── Handlers ─────────────────────────────────────────────────────────────
  function updateRow(idx, updated) {
    setRows(prev => prev.map((r, i) => i === idx ? updated : r))
  }

  function clearAll() {
    setRows(CATEGORIES.map(cat => ({
      category: cat, vendor: 'None', otherVendor: '', priceMonth: '', users: '', notes: '',
    })))
    localStorage.removeItem(STORAGE_KEY)
  }

  function exportCSV() {
    const header = 'Category,Vendor/App,Price_User_Month,Total_Users,Total_App_Cost_Annualized,Notes'
    const lines = [header]
    for (const r of rows) {
      const vendorName = (r.vendor === 'Other' || r.vendor === 'None') ? (r.otherVendor || r.vendor) : r.vendor
      const annualized = (num(r.priceMonth) * num(r.users) * 12).toFixed(2)
      const safeNotes = (r.notes || '').replaceAll('"', '""')
      lines.push([r.category, vendorName, r.priceMonth || '', r.users || 0, annualized, `"${safeNotes}"`].join(','))
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'software-cost-analysis.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 500)
  }

  function importCSV(e) {
    const file = e.target.files?.[0]
    if (!file) return
    file.text().then(text => {
      const lines = text.split(/\r?\n/).filter(l => l.trim())
      if (lines.length < 2) return

      const splitLine = (line) => {
        const res = []; let cur = '', inQ = false
        for (let i = 0; i < line.length; i++) {
          const ch = line[i]
          if (ch === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++ } else inQ = !inQ }
          else if (ch === ',' && !inQ) { res.push(cur); cur = '' }
          else cur += ch
        }
        res.push(cur)
        return res
      }

      const header = splitLine(lines[0]).map(s => s.trim())
      const idx = {
        cat: header.findIndex(h => /category/i.test(h)),
        vendor: header.findIndex(h => /vendor/i.test(h)),
        pm: header.findIndex(h => /price.*month/i.test(h)),
        users: header.findIndex(h => /users/i.test(h)),
        notes: header.findIndex(h => /notes/i.test(h)),
      }

      const dataMap = {}
      for (let i = 1; i < lines.length; i++) {
        const cols = splitLine(lines[i])
        const catText = (cols[idx.cat] || '').trim()
        const vendorText = (cols[idx.vendor] || '').trim()
        const catVendors = CATEGORY_VENDORS[catText] || []
        const vendorIsKnown = catVendors.includes(vendorText)
        dataMap[catText] = {
          category: catText,
          vendor: vendorIsKnown ? vendorText : (vendorText ? 'Other' : 'None'),
          otherVendor: (!vendorIsKnown && vendorText) ? vendorText : '',
          priceMonth: (cols[idx.pm] || '').trim(),
          users: (cols[idx.users] || '0').trim(),
          notes: (cols[idx.notes] || '').trim(),
        }
      }

      setRows(CATEGORIES.map(cat => dataMap[cat] || {
        category: cat, vendor: 'None', otherVendor: '', priceMonth: '', users: '', notes: '',
      }))
    })
    e.target.value = ''
  }

  // Map filtered rows back to their original index
  const filteredWithIndex = rows
    .map((r, i) => ({ row: r, idx: i }))
    .filter(({ row: r }) => {
      const q = search.toLowerCase()
      const vendorText = r.vendor === 'Other' ? r.otherVendor : r.vendor
      const text = [r.category, vendorText, r.notes].join(' ').toLowerCase()
      return (!q || text.includes(q)) && (!filterCat || r.category === filterCat)
    })

  return (
    <section className="bg-white px-[6%] py-20" id="analyze">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1e3a6e]">Cost Analysis</p>
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#1e3a6e] md:text-4xl">
        See what you're really spending.
      </h2>
      <p className="mb-8 max-w-xl text-lg text-[#64748b]">
        Enter your current software costs below to see how they add up — and how Vector Stack can replace them all with one predictable bill.
      </p>

      {/* ── Action buttons ── */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-lg border border-[#d9e2ef] bg-white px-4 py-2.5 text-sm font-semibold text-[#1e3a6e] shadow-sm hover:border-[#1e3a6e]/40 hover:bg-[#f4f6f9] transition-colors">
          <ArrowDownTrayIcon className="h-4 w-4" /> Export CSV
        </button>
        <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-[#d9e2ef] bg-white px-4 py-2.5 text-sm font-semibold text-[#1e3a6e] shadow-sm hover:border-[#1e3a6e]/40 hover:bg-[#f4f6f9] transition-colors">
          <ArrowUpTrayIcon className="h-4 w-4" /> Import CSV
        </button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-[#d9e2ef] bg-white px-4 py-2.5 text-sm font-semibold text-[#1e3a6e] shadow-sm hover:border-[#1e3a6e]/40 hover:bg-[#f4f6f9] transition-colors">
          <PrinterIcon className="h-4 w-4" /> Print / PDF
        </button>
        <button onClick={clearAll} className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 shadow-sm hover:border-red-300 hover:bg-red-50 transition-colors">
          <TrashIcon className="h-4 w-4" /> Clear All
        </button>
        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={importCSV} />
      </div>

      {/* ── Main card ── */}
      <div className="rounded-xl border border-[#d9e2ef] bg-[#f4f6f9] shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d9e2ef] bg-white px-6 py-4">
          <div>
            <div className="text-base font-extrabold text-[#1e3a6e] flex items-center gap-2">
              <CalculatorIcon className="h-5 w-5" /> Customer Inventory + Spend
            </div>
            <div className="mt-1 text-sm text-[#64748b]">Totals update instantly. Total App Cost is shown as annual spend.</div>
          </div>
          <div className="text-xs text-[#64748b] max-w-md leading-relaxed">
            <span className="font-semibold text-[#1e3a6e]">Tip:</span> Enter what you pay per user per month. The calculator multiplies by <span className="font-bold text-[#1e3a6e]">Users x 12</span>.
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#d9e2ef] bg-[#f9fbfe] px-6 py-3">
          <label className="text-[0.7rem] font-bold uppercase tracking-wider text-[#64748b]">Filter:</label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search categories, vendors, notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-lg border border-[#d9e2ef] bg-white pl-9 pr-3 py-2 text-sm text-[#1e3a6e] outline-none focus:border-[#1e3a6e]/40 focus:ring-2 focus:ring-[#1e3a6e]/10 w-64"
            />
          </div>
          <label className="text-[0.7rem] font-bold uppercase tracking-wider text-[#64748b] ml-2">Category:</label>
          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            className="rounded-lg border border-[#d9e2ef] bg-white px-3 py-2 text-sm text-[#1e3a6e] outline-none focus:border-[#1e3a6e]/40 focus:ring-2 focus:ring-[#1e3a6e]/10"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{formatCategory(c)}</option>)}
          </select>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[2fr_1.6fr_1fr_0.7fr_1fr_1.2fr] gap-3 bg-[#1e3a6e] px-10 py-3 text-[0.7rem] font-extrabold uppercase tracking-wider text-white/70">
          <div>Category</div>
          <div>Vendor / App</div>
          <div>Price/User/Mo</div>
          <div>Users</div>
          <div>Total App Cost</div>
          <div>Notes</div>
        </div>

        {/* Data rows */}
        <div className="space-y-2 p-4">
          {filteredWithIndex.map(({ row, idx }) => (
            <AnalysisRow
              key={row.category}
              row={row}
              onChange={updated => updateRow(idx, updated)}
            />
          ))}
          {filteredWithIndex.length === 0 && (
            <div className="text-center py-8 text-sm text-[#64748b]">No matching categories found.</div>
          )}
        </div>

        {/* Footer bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d9e2ef] bg-white px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="rounded-full border border-[#1e3a6e]/20 bg-[#1e3a6e]/5 px-4 py-2 flex items-baseline gap-2 text-sm">
              <span className="text-[#64748b]">Grand Total (annualized):</span>
              <span className="font-black text-[#1e3a6e] tabular-nums">{money(totalAnnual)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center text-xs text-[#64748b]">
            <span className="rounded-full border border-[#d9e2ef] px-3 py-1.5">
              Rows: <span className="font-bold text-[#1e3a6e]">{rows.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#d9e2ef] bg-white p-5 shadow-sm">
          <div className="text-[0.65rem] font-bold uppercase tracking-wider text-[#64748b]">Monthly Total</div>
          <div className="mt-2 text-2xl font-black text-[#1e3a6e] tabular-nums">{money(totalAnnual / 12)}</div>
          <div className="mt-1 text-xs text-[#64748b]">all rows combined</div>
        </div>
        <div className="rounded-xl border border-[#d9e2ef] bg-white p-5 shadow-sm">
          <div className="text-[0.65rem] font-bold uppercase tracking-wider text-[#64748b]">Avg Cost / User / Month</div>
          <div className="mt-2 text-2xl font-black text-[#1e3a6e] tabular-nums">{totalUsers > 0 ? money((totalAnnual / 12) / totalUsers) : '$0.00'}</div>
          <div className="mt-1 text-xs text-[#64748b]">across all active rows</div>
        </div>
        <div className="rounded-xl border border-[#d9e2ef] bg-white p-5 shadow-sm">
          <div className="text-[0.65rem] font-bold uppercase tracking-wider text-[#64748b]">Highest Spend Category</div>
          <div className="mt-2 text-2xl font-black text-[#1e3a6e] truncate" title={formatCategory(topCat)}>{formatCategory(topCat)}</div>
          <div className="mt-1 text-xs text-[#64748b]">{topAmt > 0 ? money(topAmt) + ' / year' : ''}</div>
        </div>
        <div className="rounded-xl border border-[#d9e2ef] bg-white p-5 shadow-sm">
          <div className="text-[0.65rem] font-bold uppercase tracking-wider text-[#64748b]">Active Software Count</div>
          <div className="mt-2 text-2xl font-black text-[#1e3a6e] tabular-nums">{activeCount}</div>
          <div className="mt-1 text-xs text-[#64748b]">rows with cost &gt; $0</div>
        </div>
      </div>

      {/* ── Charts ── */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#d9e2ef] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-extrabold text-[#1e3a6e]">Spend by Category</h3>
          <canvas ref={pieRef} className="w-full" style={{ maxHeight: 300 }} />
          <div id="pieLegendReact" className="flex flex-wrap gap-2 mt-4" />
        </div>
        <div className="rounded-xl border border-[#d9e2ef] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-extrabold text-[#1e3a6e]">Top 10 Costs (Annualized)</h3>
          <canvas ref={barRef} className="w-full" style={{ maxHeight: 300 }} />
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="mt-10 rounded-2xl border border-[#1e3a6e]/20 bg-[#f4f6f9] p-8 text-center">
        <h3 className="text-xl font-extrabold text-[#1e3a6e]">Ready to consolidate your stack?</h3>
        <p className="mt-2 mb-6 text-[#64748b]">
          Replace all of the above with Vector Stack — one platform, one bill, one support line.
        </p>
        <a
          href="https://cal.com/kmperkins85/vector-digital"
          rel="noopener noreferrer"
          target="_blank"
          className="inline-block rounded-lg bg-[#1e3a6e] px-8 py-3 text-base font-bold text-white transition-all hover:bg-[#163060] hover:-translate-y-px"
        >
          Book a Free Call →
        </a>
      </div>
    </section>
  )
}

// ── Chart drawing ──────────────────────────────────────────────────────────

function drawPieChart(canvas, rows) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, rect.width, rect.height)

  const catSpend = {}
  for (const r of rows) {
    const ann = num(r.priceMonth) * num(r.users) * 12
    if (ann > 0) catSpend[r.category] = (catSpend[r.category] || 0) + ann
  }

  const entries = Object.entries(catSpend).sort((a, b) => b[1] - a[1])
  const total = entries.reduce((s, e) => s + e[1], 0)

  // Update legend
  const legendEl = document.getElementById('pieLegendReact')
  if (legendEl) {
    legendEl.innerHTML = ''
    entries.forEach(([cat, amt], i) => {
      const pct = ((amt / total) * 100).toFixed(1)
      const color = CHART_COLORS[i % CHART_COLORS.length]
      const item = document.createElement('span')
      item.className = 'inline-flex items-center gap-1.5 text-[0.65rem] text-[#64748b]'
      item.innerHTML = `<span style="background:${color}" class="inline-block w-2.5 h-2.5 rounded-sm shrink-0"></span>${formatCategory(cat)} (${pct}%)`
      legendEl.appendChild(item)
    })
  }

  if (total === 0) {
    ctx.fillStyle = '#94a3b8'
    ctx.font = '14px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('No data to display', rect.width / 2, rect.height / 2)
    return
  }

  const cx = rect.width * 0.4
  const cy = rect.height / 2
  const radius = Math.min(cx, cy) - 10
  let startAngle = -Math.PI / 2

  entries.forEach(([, amt], i) => {
    const slice = (amt / total) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, radius, startAngle, startAngle + slice)
    ctx.closePath()
    ctx.fillStyle = CHART_COLORS[i % CHART_COLORS.length]
    ctx.fill()
    startAngle += slice
  })
}

function drawBarChart(canvas, rows) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, rect.width, rect.height)

  const items = []
  for (const r of rows) {
    const ann = num(r.priceMonth) * num(r.users) * 12
    if (ann > 0) {
      const vendorText = r.vendor === 'Other' ? (r.otherVendor || 'Other') : r.vendor
      items.push({ label: formatCategory(r.category) + ' — ' + vendorText, value: ann })
    }
  }
  items.sort((a, b) => b.value - a.value)
  const top = items.slice(0, 10)

  if (top.length === 0) {
    ctx.fillStyle = '#94a3b8'
    ctx.font = '14px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('No data to display', rect.width / 2, rect.height / 2)
    return
  }

  const maxVal = top[0].value
  const leftMargin = 12
  const rightMargin = 80
  const topMargin = 8
  const barHeight = Math.min(22, (rect.height - topMargin) / top.length - 6)
  const barGap = 4
  const barAreaWidth = rect.width - leftMargin - rightMargin

  ctx.textBaseline = 'middle'
  ctx.font = '11px system-ui, sans-serif'

  top.forEach((item, i) => {
    const y = topMargin + i * (barHeight + barGap)
    const w = (item.value / maxVal) * barAreaWidth
    const color = CHART_COLORS[i % CHART_COLORS.length]

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.roundRect(leftMargin, y, Math.max(w, 4), barHeight, 4)
    ctx.fill()

    ctx.fillStyle = '#1e3a6e'
    ctx.textAlign = 'left'
    ctx.fillText(money(item.value), leftMargin + w + 6, y + barHeight / 2)

    const maxLabelW = barAreaWidth * 0.45
    let label = item.label
    while (ctx.measureText(label).width > maxLabelW && label.length > 3) {
      label = label.slice(0, -4) + '...'
    }
    ctx.fillStyle = '#64748b'
    ctx.textAlign = 'left'
    ctx.fillText(label, leftMargin + 6, y + barHeight / 2)
  })
}
