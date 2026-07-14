"use client";

import { useMemo, useState } from "react";

type AppKind = "Premiere Pro" | "After Effects";

type Usage = {
  app: AppKind;
  project: string;
  projectPath: string;
  sequence: string;
  range: string;
  duration: number;
  updated: string;
};

type Asset = {
  id: string;
  name: string;
  kind: string;
  projectFolders: string[];
  footagePath: string;
  preview: "serum" | "mirror" | "texture" | "sink" | "bottle" | "hands";
  mediaStatus: "Online" | "Missing";
  lastUsed: string;
  visualMatch: number;
  usages: Usage[];
};

const assets: Asset[] = [
  {
    id: "serum",
    name: "skincare_serum_broll_04.mp4",
    kind: "Product close-up",
    projectFolders: ["ACF", "ACN", "Z_SOCIAL"],
    footagePath: "M:\\Media\\Skincare\\B-Roll\\skincare_serum_broll_04.mp4",
    preview: "serum",
    mediaStatus: "Online",
    lastUsed: "Jul 8, 2026",
    visualMatch: 98,
    usages: [
      { app: "Premiere Pro", project: "Summer_Skincare_30s.prproj", projectPath: "P:\\Projects\\2026\\Summer Skincare\\Summer_Skincare_30s.prproj", sequence: "Main_30", range: "00:04:12-00:04:24", duration: 12, updated: "Jul 8, 2026" },
      { app: "After Effects", project: "Creator_Ads_Q3.aep", projectPath: "P:\\Projects\\2026\\Creator Ads\\Creator_Ads_Q3.aep", sequence: "Product_Closeup", range: "00:00:08-00:00:16", duration: 8, updated: "Jul 7, 2026" },
      { app: "Premiere Pro", project: "Routine_Cutdowns.prproj", projectPath: "P:\\Projects\\2026\\Routine Cutdowns\\Routine_Cutdowns.prproj", sequence: "Vertical_15", range: "00:01:03-00:01:09", duration: 6, updated: "Jul 6, 2026" },
      { app: "Premiere Pro", project: "Skincare_Paid_Social.prproj", projectPath: "P:\\Projects\\2026\\Paid Social\\Skincare_Paid_Social.prproj", sequence: "Static_to_Video", range: "00:00:22-00:00:30", duration: 8, updated: "Jul 4, 2026" },
      { app: "After Effects", project: "Glow_Transitions.aep", projectPath: "P:\\Projects\\2026\\Motion\\Glow_Transitions.aep", sequence: "Serum_Intro", range: "00:00:00-00:00:08", duration: 8, updated: "Jul 2, 2026" },
    ],
  },
  {
    id: "mirror",
    name: "creator_mirror_routine_02.mov",
    kind: "Creator lifestyle",
    projectFolders: ["ASU", "BPG", "Z_SOCIAL"],
    footagePath: "M:\\Media\\Creators\\Routine\\creator_mirror_routine_02.mov",
    preview: "mirror",
    mediaStatus: "Online",
    lastUsed: "Jul 6, 2026",
    visualMatch: 91,
    usages: [
      { app: "Premiere Pro", project: "Routine_Cutdowns.prproj", projectPath: "P:\\Projects\\2026\\Routine Cutdowns\\Routine_Cutdowns.prproj", sequence: "Vertical_15", range: "00:00:14-00:00:22", duration: 8, updated: "Jul 6, 2026" },
      { app: "Premiere Pro", project: "Creator_Stories.prproj", projectPath: "P:\\Projects\\2026\\Creator Stories\\Creator_Stories.prproj", sequence: "Morning_Routine", range: "00:02:03-00:02:11", duration: 8, updated: "Jul 5, 2026" },
      { app: "After Effects", project: "Creator_Ads_Q3.aep", projectPath: "P:\\Projects\\2026\\Creator Ads\\Creator_Ads_Q3.aep", sequence: "Mirror_Overlay", range: "00:00:12-00:00:18", duration: 6, updated: "Jul 4, 2026" },
    ],
  },
  {
    id: "texture",
    name: "product_texture_macro_07.mp4",
    kind: "Texture macro",
    projectFolders: ["CNC", "CSU", "ECZ"],
    footagePath: "M:\\Media\\Skincare\\Textures\\product_texture_macro_07.mp4",
    preview: "texture",
    mediaStatus: "Online",
    lastUsed: "Jul 5, 2026",
    visualMatch: 87,
    usages: [
      { app: "After Effects", project: "Glow_Transitions.aep", projectPath: "P:\\Projects\\2026\\Motion\\Glow_Transitions.aep", sequence: "Texture_Loop", range: "00:00:10-00:00:18", duration: 8, updated: "Jul 5, 2026" },
      { app: "Premiere Pro", project: "Summer_Skincare_30s.prproj", projectPath: "P:\\Projects\\2026\\Summer Skincare\\Summer_Skincare_30s.prproj", sequence: "Endcard", range: "00:00:20-00:00:28", duration: 8, updated: "Jul 3, 2026" },
    ],
  },
  {
    id: "sink",
    name: "morning_routine_sink_03.mov",
    kind: "Lifestyle B-roll",
    projectFolders: ["FOU", "HSU", "HYP"],
    footagePath: "M:\\Media\\Creators\\Routine\\morning_routine_sink_03.mov",
    preview: "sink",
    mediaStatus: "Online",
    lastUsed: "Jul 4, 2026",
    visualMatch: 73,
    usages: [
      { app: "Premiere Pro", project: "Creator_Stories.prproj", projectPath: "P:\\Projects\\2026\\Creator Stories\\Creator_Stories.prproj", sequence: "Morning_Routine", range: "00:00:42-00:00:48", duration: 6, updated: "Jul 4, 2026" },
      { app: "Premiere Pro", project: "Routine_Cutdowns.prproj", projectPath: "P:\\Projects\\2026\\Routine Cutdowns\\Routine_Cutdowns.prproj", sequence: "Vertical_15", range: "00:00:28-00:00:34", duration: 6, updated: "Jul 2, 2026" },
    ],
  },
  {
    id: "bottle",
    name: "cleanser_bottle_turn_01.mp4",
    kind: "Packshot",
    projectFolders: ["KPI", "NEC", "TWL"],
    footagePath: "M:\\Media\\Skincare\\Packshots\\cleanser_bottle_turn_01.mp4",
    preview: "bottle",
    mediaStatus: "Missing",
    lastUsed: "Jun 29, 2026",
    visualMatch: 61,
    usages: [
      { app: "After Effects", project: "Cleanser_Launch.aep", projectPath: "P:\\Projects\\2026\\Cleanser Launch\\Cleanser_Launch.aep", sequence: "Bottle_Turn", range: "00:00:04-00:00:10", duration: 6, updated: "Jun 29, 2026" },
    ],
  },
  {
    id: "hands",
    name: "hands_apply_cream_06.mov",
    kind: "Application demo",
    projectFolders: ["Z_OTHER", "Z_WHITLST", "ACF"],
    footagePath: "M:\\Media\\Skincare\\Applications\\hands_apply_cream_06.mov",
    preview: "hands",
    mediaStatus: "Online",
    lastUsed: "Jun 26, 2026",
    visualMatch: 56,
    usages: [
      { app: "Premiere Pro", project: "Summer_Skincare_30s.prproj", projectPath: "P:\\Projects\\2026\\Summer Skincare\\Summer_Skincare_30s.prproj", sequence: "Main_30", range: "00:00:04-00:00:10", duration: 6, updated: "Jun 26, 2026" },
    ],
  },
];

const nav = ["Video Search", "Image Search", "Files", "Project Usage", "FireTable", "Creators", "Transcripts", "Products"];

const projectCreatedDates: Record<string, string> = {
  "Summer_Skincare_30s.prproj": "May 14, 2026",
  "Creator_Ads_Q3.aep": "Jun 3, 2026",
  "Routine_Cutdowns.prproj": "Apr 28, 2026",
  "Skincare_Paid_Social.prproj": "Jun 19, 2026",
  "Glow_Transitions.aep": "Feb 10, 2026",
  "Creator_Stories.prproj": "Mar 22, 2026",
  "Cleanser_Launch.aep": "Jan 30, 2026",
};

const projectNameHistories: Record<string, { name: string; changed: string }[]> = {
  "Summer_Skincare_30s.prproj": [
    { name: "SKINCARE_SUMMER_MASTER_v05.prproj", changed: "Jun 18, 2026" },
    { name: "Summer_Beauty_30sec.prproj", changed: "May 28, 2026" },
  ],
  "Creator_Ads_Q3.aep": [
    { name: "Creator_Ads_Master.aep", changed: "Jun 21, 2026" },
  ],
  "Routine_Cutdowns.prproj": [
    { name: "Routine_Social_Cutdowns.prproj", changed: "May 9, 2026" },
    { name: "Routine_Verticals_v02.prproj", changed: "Apr 30, 2026" },
  ],
  "Glow_Transitions.aep": [
    { name: "Skincare_Glow_Package.aep", changed: "Mar 4, 2026" },
  ],
};

const projectOwners: Record<string, string> = {
  "Summer_Skincare_30s.prproj": "luisc",
  "Creator_Ads_Q3.aep": "cynthiaa",
  "Routine_Cutdowns.prproj": "emmanuelr",
  "Skincare_Paid_Social.prproj": "horacior",
  "Glow_Transitions.aep": "luisc",
  "Creator_Stories.prproj": "cynthiaa",
  "Cleanser_Launch.aep": "emmanuelr",
};

function totalDuration(usages: Usage[]) {
  return usages.reduce((sum, usage) => sum + usage.duration, 0);
}

function formatSeconds(value: number) {
  return `00:${String(value).padStart(2, "0")}`;
}

function latestUsage(usages: Usage[]) {
  return [...usages].sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated))[0];
}

function projectDate(project: string) {
  return projectCreatedDates[project] ?? "Jan 1, 2026";
}

function nameHistory(project: string) {
  return projectNameHistories[project] ?? [];
}

function projectOwner(project: string) {
  return projectOwners[project] ?? "horacior";
}

function Icon({ name }: { name: string }) {
  const icons: Record<string, string> = { "Video Search": "⌕", "Image Search": "▧", Files: "▱", "Project Usage": "◷", FireTable: "♨", Creators: "◌", Transcripts: "▤", Products: "⌘" };
  return <span className="nav-icon" aria-hidden="true">{icons[name]}</span>;
}

export default function Home() {
  const [appFilter, setAppFilter] = useState<"All" | AppKind>("All");
  const [folderFilter, setFolderFilter] = useState("All");
  const [usageFilter, setUsageFilter] = useState("Any");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"Most used" | "Recently used" | "Least used">("Most used");
  const [selectedId, setSelectedId] = useState("serum");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [openedProject, setOpenedProject] = useState<Usage | null>(null);
  const [projectDateOrder, setProjectDateOrder] = useState<"newest" | "oldest">("newest");
  const [visualReference, setVisualReference] = useState<{ name: string; url: string } | null>(null);

  const copy = async (value: string, label: string) => {
    try { await navigator.clipboard.writeText(value); } catch { /* Demo still confirms the action. */ }
    setToast(`${label} copied`);
    window.setTimeout(() => setToast(""), 1800);
  };

  const addVisualReference = (file: File | undefined) => {
    if (!file) return;
    if (visualReference) URL.revokeObjectURL(visualReference.url);
    setVisualReference({ name: file.name, url: URL.createObjectURL(file) });
    setToast("Image reference added - results ranked by visual similarity");
  };

  const clearVisualReference = () => {
    if (visualReference) URL.revokeObjectURL(visualReference.url);
    setVisualReference(null);
    setToast("Image reference removed");
  };

  const projectFolders = ["All", "ACF", "ACN", "ASU", "BPG", "CNC", "CSU", "ECZ", "FOU", "HSU", "HYP", "KPI", "NEC", "TWL", "Z_OTHER", "Z_SOCIAL", "Z_WHITLST"];

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = assets
      .map((asset) => ({ ...asset, usages: appFilter === "All" ? asset.usages : asset.usages.filter((usage) => usage.app === appFilter) }))
      .filter((asset) => asset.usages.length > 0)
      .filter((asset) => folderFilter === "All" || asset.projectFolders.includes(folderFilter))
      .filter((asset) => statusFilter === "All" || asset.mediaStatus === statusFilter)
      .filter((asset) => usageFilter === "Any" || (usageFilter === "3+" ? asset.usages.length >= 3 : asset.usages.length === 1))
      .filter((asset) => !query || `${asset.name} ${asset.kind} ${asset.projectFolders.join(" ")} ${asset.footagePath} ${asset.usages.map((u) => `${u.project} ${u.sequence}`).join(" ")}`.toLowerCase().includes(query));

    return filtered.sort((a, b) => {
      if (visualReference) return b.visualMatch - a.visualMatch;
      if (sort === "Least used") return a.usages.length - b.usages.length;
      if (sort === "Recently used") return b.lastUsed.localeCompare(a.lastUsed);
      return totalDuration(b.usages) - totalDuration(a.usages);
    });
  }, [appFilter, folderFilter, usageFilter, statusFilter, search, sort, visualReference]);

  const selected = rows.find((asset) => asset.id === selectedId) ?? rows[0] ?? assets[0];
  const selectedDuration = totalDuration(selected.usages);
  const projectCount = new Set(selected.usages.map((usage) => usage.project)).size;
  const sortedProjectUsages = [...selected.usages].sort((a, b) => {
    const direction = projectDateOrder === "newest" ? -1 : 1;
    return direction * (Date.parse(projectDate(a.project)) - Date.parse(projectDate(b.project)));
  });

  const selectFilter = (filter: string, value: string) => {
    if (filter === "app") setAppFilter(value as "All" | AppKind);
    if (filter === "folder") setFolderFilter(value);
    if (filter === "usage") setUsageFilter(value);
    if (filter === "status") setStatusFilter(value);
    setOpenFilter(null);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">▣</span><span>Media Master</span></div>
        <nav aria-label="Media Master sections">
          {nav.map((item) => <button className={`nav-link ${item === "Project Usage" ? "selected" : ""}`} key={item}><Icon name={item} />{item}</button>)}
        </nav>
        <div className="sidebar-footer"><span>Methodiq</span><span>↗</span></div>
      </aside>

      <section className="content">
        <header className="page-heading">
          <div><div className="title-row"><h1>Project Usage</h1><span className="beta">BETA</span></div><p>Find where footage appears across Premiere Pro and After Effects projects.</p></div>
        </header>

        <section className="search-zone" aria-label="Project Usage search">
          <div className="search-row"><div className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search footage, projects, sequences, folders, or describe a scene..." /><label className="attach-image" title="Attach a photo or screenshot to search visually">▧&nbsp; Attach image<input type="file" accept="image/*" onChange={(event) => addVisualReference(event.target.files?.[0])} /></label></div><span className="index-status">1,248 projects indexed <b>•</b> Last scan 12 min ago</span><button className="outline-button" onClick={() => setScanOpen(true)}>▱&nbsp; Scan folders</button><button className="primary-button" onClick={() => setToast(visualReference ? "Visual search complete - closest footage matches are ranked first" : `${rows.length} matching assets shown`)}>⌕&nbsp; Search</button></div>
          {visualReference && <div className="visual-reference"><img src={visualReference.url} alt="Attached visual search reference" /><span><b>Image reference</b><small>{visualReference.name} • visual matching active</small></span><button onClick={clearVisualReference} aria-label="Remove attached image">×</button></div>}
          <div className="filters">
            <Filter label="App" value={appFilter} open={openFilter === "app"} onToggle={() => setOpenFilter(openFilter === "app" ? null : "app")} options={["All", "Premiere Pro", "After Effects"]} onSelect={(value) => selectFilter("app", value)} />
            <Filter label="Project folder" value={folderFilter} open={openFilter === "folder"} onToggle={() => setOpenFilter(openFilter === "folder" ? null : "folder")} options={projectFolders} onSelect={(value) => selectFilter("folder", value)} />
            <Filter label="Usage count" value={usageFilter} open={openFilter === "usage"} onToggle={() => setOpenFilter(openFilter === "usage" ? null : "usage")} options={["Any", "3+", "1"]} onSelect={(value) => selectFilter("usage", value)} />
            <Filter label="Date" value="Any" open={false} onToggle={() => setToast("Date filter is ready for a future data source")} options={[]} onSelect={() => undefined} />
            <Filter label="Media status" value={statusFilter} open={openFilter === "status"} onToggle={() => setOpenFilter(openFilter === "status" ? null : "status")} options={["All", "Online", "Missing"]} onSelect={(value) => selectFilter("status", value)} />
          </div>
        </section>

        <section className="metrics" aria-label="Index summary">
          <Metric glyph="▱" label="Projects indexed" value="1,248" tone="blue" />
          <Metric glyph="▣" label="Footage assets" value="18,604" tone="green" />
          <Metric glyph="⟳" label="Reused footage" value="3,291" tone="purple" />
          <Metric glyph="△" label="Missing media" value="47" tone="red" />
        </section>

        <section className="workspace">
          <div className="results-card">
            <div className="results-header"><h2>Footage results</h2><div className="segmented">{(["Most used", "Recently used", "Least used"] as const).map((option) => <button key={option} onClick={() => setSort(option)} className={sort === option ? "active" : ""}>{option}</button>)}</div></div>
            <div className="table-head"><span>Footage</span><span>Projects</span><span>Uses</span><span>Total used</span><span>Last project</span></div>
            <div className="asset-list">
              {rows.map((asset) => {
                const projectTotal = new Set(asset.usages.map((usage) => usage.project)).size;
                const mostRecent = latestUsage(asset.usages);
                return <div className={`asset-row ${selected.id === asset.id ? "asset-selected" : ""}`} onClick={() => setSelectedId(asset.id)} onKeyDown={(event) => { if (event.key === "Enter") setSelectedId(asset.id); }} role="button" tabIndex={0} key={asset.id}>
                  <span className={`preview-thumb ${asset.preview}`} aria-hidden="true"><i /></span><span className="asset-name"><strong>{asset.name}</strong><small>{asset.kind}</small></span><span className="value-link">{projectTotal}</span><span className="value-link">{asset.usages.length}</span><span>{formatSeconds(totalDuration(asset.usages))}</span><button className="last-project-link" onClick={(event) => { event.stopPropagation(); setSelectedId(asset.id); setOpenedProject(mostRecent); }} title={`Open ${mostRecent.project}`}>{mostRecent.project}</button>
                </div>;
              })}
              {rows.length === 0 && <div className="empty-state">No footage matches these filters. Try another app, folder, or search phrase.</div>}
            </div>
            <div className="results-footer"><span>{rows.length ? `1-${rows.length} of ${rows.length} results` : "0 results"}</span><div><button disabled>‹</button><button className="page-current">1</button><button disabled>›</button></div></div>
          </div>

          <aside className="detail-card" aria-live="polite">
            <div className="detail-title"><div><h2>{selected.name}</h2><p>{selected.kind}</p></div><span className={`status ${selected.mediaStatus.toLowerCase()}`}>{selected.mediaStatus}</span></div>
            <div className="asset-overview"><span className={`detail-preview ${selected.preview}`} aria-hidden="true"><i /></span><div className="meta-lines"><span className="meta-label">Footage location</span><button className="path-link" title={selected.footagePath} onClick={() => copy(selected.footagePath, "Footage location")}>{selected.footagePath}</button><button className="copy-mini" onClick={() => copy(selected.footagePath, "Footage location")}>⧉ Copy footage location</button><span><b>Duration</b>&nbsp; 00:18</span><span>1920 × 1080 • 29.97 fps</span></div></div>
            <div className="detail-metrics"><MiniMetric value={String(projectCount)} label="Projects" glyph="▱" /><MiniMetric value={String(selected.usages.length)} label="Timeline uses" glyph="⛓" tone="green" /><MiniMetric value={formatSeconds(selectedDuration)} label="Total used" glyph="◷" tone="purple" /></div>
            <div className="project-section"><h3>Used in projects</h3><div className="usage-head"><span>App</span><span>Project / location</span><span>Owner</span><button className="date-sort" onClick={() => setProjectDateOrder(projectDateOrder === "newest" ? "oldest" : "newest")}>Project Date <span>{projectDateOrder === "newest" ? "↓" : "↑"}</span></button><span>Sequence</span><span>Range</span><span>Used</span></div>{sortedProjectUsages.slice(0, 4).map((usage, index) => <div className="usage-row" key={`${usage.project}-${index}`}><span className={`app-badge ${usage.app === "Premiere Pro" ? "premiere" : "after"}`}>{usage.app === "Premiere Pro" ? "Pr" : "Ae"}</span><span className="project-cell"><strong>{usage.project}</strong><button className="project-path" title={usage.projectPath} onClick={() => copy(usage.projectPath, "Project location")}>Project location: {usage.projectPath}</button><button className="copy-location" onClick={() => copy(usage.projectPath, "Project location")}>⧉ Copy</button><button className="name-history-link" onClick={() => setOpenedProject(usage)}>◷ Name history{ nameHistory(usage.project).length ? ` (${nameHistory(usage.project).length})` : ""}</button></span><span className="owner-badge">{projectOwner(usage.project)}</span><span className="project-date">{projectDate(usage.project)}</span><span>{usage.sequence}</span><span>{usage.range}</span><span>{usage.duration} sec</span></div>)}</div>
            <div className="detail-footer"><button className="outline-button" onClick={() => setAllProjectsOpen(true)}>View all {projectCount} projects</button><button className="text-button" onClick={() => copy(selected.footagePath, "Footage location")}>⧉&nbsp; Copy footage location</button></div>
          </aside>
        </section>
      </section>

      {toast && <div className="toast" role="status">✓ {toast}</div>}
      {scanOpen && <Modal title="Scan project folders" onClose={() => setScanOpen(false)}><p>Choose the folders and project types that the index should analyze.</p><label className="check-row"><input type="checkbox" defaultChecked /> Premiere Pro projects (.prproj)</label><label className="check-row"><input type="checkbox" defaultChecked /> After Effects projects (.aep)</label><label className="check-row"><input type="checkbox" defaultChecked /> Include nested project folders</label><div className="modal-actions"><button className="outline-button" onClick={() => setScanOpen(false)}>Cancel</button><button className="primary-button" onClick={() => { setScanOpen(false); setToast("Folder scan started - 1,248 projects currently indexed"); }}>Run scan</button></div></Modal>}
      {allProjectsOpen && <Modal title={`Projects using ${selected.name}`} onClose={() => setAllProjectsOpen(false)}><p>Each occurrence keeps its exact project location, creation date, sequence or composition, and timeline range.</p><div className="modal-list">{sortedProjectUsages.map((usage, index) => <div className="modal-usage" key={`${usage.project}-${index}`}><span className={`app-badge ${usage.app === "Premiere Pro" ? "premiere" : "after"}`}>{usage.app === "Premiere Pro" ? "Pr" : "Ae"}</span><div><strong>{usage.project}</strong><small>Project Date: {projectDate(usage.project)} • {usage.sequence} • {usage.range} • {usage.duration} sec</small><button className="project-path" onClick={() => copy(usage.projectPath, "Project location")}>Project location: {usage.projectPath}</button></div></div>)}</div></Modal>}
      {openedProject && <Modal title={openedProject.project} onClose={() => setOpenedProject(null)}><p>Project details and name history are stored independently from the footage file.</p><div className="modal-project-details"><span>Owner</span><strong>{projectOwner(openedProject.project)}</strong><span>Project Date</span><strong>{projectDate(openedProject.project)}</strong><span>Project location</span><button className="project-path" onClick={() => copy(openedProject.projectPath, "Project location")}>{openedProject.projectPath}</button><span>Sequence / timeline range</span><strong>{openedProject.sequence} • {openedProject.range} • {openedProject.duration} sec</strong></div><section className="name-history"><h3>◷ Name History</h3>{nameHistory(openedProject.project).length ? <div className="history-list">{nameHistory(openedProject.project).map((entry) => <div className="history-entry" key={`${entry.name}-${entry.changed}`}><span>{entry.changed}</span><strong>{entry.name}</strong></div>)}</div> : <p className="no-history">No previous project names found.</p>}</section><div className="modal-actions"><button className="outline-button" onClick={() => setOpenedProject(null)}>Close</button><button className="primary-button" onClick={() => { copy(openedProject.projectPath, "Project location"); setOpenedProject(null); }}>Copy project location</button></div></Modal>}
    </main>
  );
}

function Filter({ label, value, open, onToggle, options, onSelect }: { label: string; value: string; open: boolean; onToggle: () => void; options: string[]; onSelect: (value: string) => void }) {
  return <div className="filter-wrap"><button className="filter-button" onClick={onToggle}>{label}: <b>{value}</b><span>⌄</span></button>{open && <div className="filter-menu">{options.map((option) => <button key={option} onClick={() => onSelect(option)} className={option === value ? "picked" : ""}>{option}</button>)}</div>}</div>;
}

function Metric({ glyph, label, value, tone }: { glyph: string; label: string; value: string; tone: string }) { return <div className="metric"><span className={`metric-icon ${tone}`}>{glyph}</span><div><small>{label}</small><strong>{value}</strong></div></div>; }
function MiniMetric({ value, label, glyph, tone = "blue" }: { value: string; label: string; glyph: string; tone?: string }) { return <div className="mini-metric"><div><strong>{value}</strong><small>{label}</small></div><span className={`mini-icon ${tone}`}>{glyph}</span></div>; }
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) { return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><h2>{title}</h2><button onClick={onClose} aria-label="Close">×</button></div>{children}</section></div>; }
