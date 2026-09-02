"use client";

import {
  Activity, Bell, ChevronDown, CircleDot, Database, Download, Fingerprint,
  ExternalLink, Gauge, Globe2, GraduationCap, LayoutDashboard, Menu, Radio,
  RefreshCw, Search, Server, ShieldAlert, TableProperties, TerminalSquare,
  Users, Wifi, X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { UserRecord } from "@/lib/types";
import { Logo } from "@/components/logo";

type LiveState = "connecting" | "live" | "offline";
type DashboardMode = "hacker" | "simple";

export function Dashboard() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liveState, setLiveState] = useState<LiveState>("connecting");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [newId, setNewId] = useState<string | null>(null);
  const [mode, setMode] = useState<DashboardMode>("hacker");

  useEffect(() => {
    const savedMode = window.localStorage.getItem("cybershield-dashboard-mode");
    if (savedMode === "simple" || savedMode === "hacker") setMode(savedMode);
  }, []);

  const changeMode = (nextMode: DashboardMode) => {
    setMode(nextMode);
    window.localStorage.setItem("cybershield-dashboard-mode", nextMode);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/users?limit=200", { cache: "no-store" });
      if (!response.ok) throw new Error("Data uplink unavailable");
      const data = (await response.json()) as { users: UserRecord[] };
      setUsers(data.users);
      setLastSync(new Date());
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Unable to fetch records");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchUsers(); }, [fetchUsers]);

  useEffect(() => {
    const source = new EventSource("/api/users/stream");
    source.addEventListener("connected", () => setLiveState("live"));
    source.addEventListener("user.created", (event) => {
      const user = JSON.parse((event as MessageEvent).data) as UserRecord;
      setUsers((current) => [user, ...current.filter((item) => item.id !== user.id)].slice(0, 200));
      setLastSync(new Date());
      setNewId(user.id);
      window.setTimeout(() => setNewId(null), 2600);
    });
    source.onerror = () => setLiveState("offline");
    source.onopen = () => setLiveState("live");
    return () => source.close();
  }, []);

  const visibleUsers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return users;
    return users.filter((user) =>
      [user.name, user.email, user.ipAddress, user.location, user.device]
        .some((value) => value?.toLowerCase().includes(needle)),
    );
  }, [query, users]);

  const critical = users.filter((user) => user.threatLevel === "critical" || user.threatLevel === "high").length;
  const active = users.filter((user) => user.status.toLowerCase() === "active").length;
  const regions = new Set(users.map((user) => user.location).filter(Boolean)).size;

  if (mode === "simple") {
    return (
      <SimpleDashboard
        users={users}
        visibleUsers={visibleUsers}
        query={query}
        setQuery={setQuery}
        loading={loading}
        error={error}
        liveState={liveState}
        lastSync={lastSync}
        newId={newId}
        onRefresh={fetchUsers}
        onModeChange={changeMode}
      />
    );
  }

  return (
    <main className="shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X /></button>
        <Logo />
        <div className="nav-label">COMMAND CENTER</div>
        <nav>
          <a className="nav-item active" href="#overview"><LayoutDashboard /> Overview <i /></a>
          <a className="nav-item" href="#targets"><Users /> Captured identities <b>{users.length}</b></a>
          <a className="nav-item" href="#network"><Globe2 /> Network map</a>
          <a className="nav-item" href="#signals"><Radio /> Signal intercepts</a>
        </nav>
        <div className="nav-label second">SYSTEMS</div>
        <nav>
          <a className="nav-item" href="#database"><Database /> Data vault</a>
          <a className="nav-item" href="#security"><ShieldAlert /> Threat matrix <em>{critical}</em></a>
          <a className="nav-item" href="#terminal"><TerminalSquare /> Terminal</a>
        </nav>
        <div className="sidebar-foot">
          <div className="mini-orbit"><span /></div>
          <div><small>NODE STATUS</small><strong><i /> OPERATIONAL</strong></div>
          <span>99.9%</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="system-line"><span className="pulse-dot" /> <b>SECURE UPLINK ESTABLISHED</b><span>//</span><span>NODE_7A</span><span>//</span><Clock /></div>
          <div className="top-actions"><ModeSwitch mode={mode} onChange={changeMode} dark /><button aria-label="Notifications"><Bell /><i /></button><div className="operator"><span>OP</span><div><small>OPERATOR</small><strong>GHOST_01</strong></div><ChevronDown /></div></div>
        </header>

        <div className="content" id="overview">
          <div className="page-heading">
            <div><div className="eyebrow"><span>01</span> / SURVEILLANCE OVERVIEW</div><h1>Intelligence <span>Console</span></h1><p>Real-time identity acquisition and network telemetry.</p></div>
            <div className="heading-actions"><div className={`live-chip ${liveState}`}><Wifi /> {liveState === "live" ? "LIVE FEED" : liveState.toUpperCase()}</div><button className="refresh" onClick={() => void fetchUsers()} disabled={loading}><RefreshCw className={loading ? "spin" : ""} /><span>REFRESH DATA</span></button><SimulatorLink dark /></div>
          </div>

          {error && <div className="error-banner"><ShieldAlert /><span><strong>UPLINK ERROR</strong>{error}. Start PostgreSQL and verify your DATABASE_URL.</span><button onClick={() => void fetchUsers()}>RETRY</button></div>}

          <div className="stats-grid">
            <StatCard icon={<Fingerprint />} label="CAPTURED IDENTITIES" value={users.length} delta="12.8%" tone="green" bars={[32,48,42,66,53,82,70,91,78,100]} />
            <StatCard icon={<CircleDot />} label="ACTIVE TARGETS" value={active} delta="8.4%" tone="cyan" bars={[65,40,52,72,46,80,58,85,76,92]} />
            <StatCard icon={<ShieldAlert />} label="HIGH-RISK SIGNALS" value={critical} delta="3 ALERTS" tone="orange" bars={[28,52,34,70,45,60,84,50,72,65]} />
            <StatCard icon={<Globe2 />} label="REGIONS MAPPED" value={regions} delta="GLOBAL" tone="purple" bars={[45,56,42,68,58,74,63,80,76,90]} />
          </div>

          <section className="data-panel" id="targets">
            <div className="panel-head">
              <div><div className="panel-icon"><Database /></div><div><h2>Captured identities</h2><p>Incoming mobile intelligence records</p></div></div>
              <div className="panel-tools"><label><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records..." /></label><button title="Export current records" onClick={() => exportCsv(visibleUsers)}><Download /></button></div>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>IDENTITY</th><th>CONTACT VECTOR</th><th>ORIGIN / IP</th><th>DEVICE</th><th>THREAT</th><th>STATUS</th><th>LAST SEEN</th></tr></thead>
                <tbody>
                  {visibleUsers.map((user, index) => <UserRow key={user.id} user={user} index={index} fresh={newId === user.id} />)}
                </tbody>
              </table>
              {!loading && visibleUsers.length === 0 && <div className="empty-state"><div className="radar"><span /></div><strong>NO SIGNALS DETECTED</strong><p>{query ? "No records match this search vector." : "Awaiting first mobile transmission."}</p><code>POST /api/mobile/users</code></div>}
              {loading && users.length === 0 && <div className="loading-state"><Activity className="spin" /> ESTABLISHING DATA UPLINK...</div>}
            </div>
            <div className="panel-foot"><span><i /> STREAM {liveState === "live" ? "CONNECTED" : "RECONNECTING"}</span><span>SHOWING {visibleUsers.length} / {users.length} RECORDS</span><span>LAST SYNC {lastSync ? lastSync.toLocaleTimeString([], { hour12: false }) : "--:--:--"}</span></div>
          </section>

          <div className="lower-grid">
            <section className="terminal-card"><div className="card-title"><span><TerminalSquare /> LIVE ACTIVITY LOG</span><i>● ● ●</i></div><div className="terminal-lines"><p><time>SYS</time><b>cybershield@node-7a:~$</b> monitor --stream identities</p><p><time>OK</time><span>Encrypted channel initialized on port 443</span></p><p><time>DB</time><span>PostgreSQL notification listener attached</span></p><p><time className="cyan">SSE</time><span>Dashboard transport: {liveState}</span></p><p className="terminal-cursor"><time>&gt;</time><span>Awaiting incoming payload</span><i /></p></div></section>
            <section className="network-card"><div className="card-title"><span><Gauge /> NETWORK PULSE</span><b>LIVE</b></div><div className="pulse-chart"><div className="grid-lines" /><svg viewBox="0 0 500 110" preserveAspectRatio="none"><path className="area" d="M0,85 C30,82 40,63 70,68 S110,88 135,70 S165,22 195,55 S230,82 260,63 S290,40 315,54 S345,85 370,57 S415,28 440,48 S475,75 500,25 L500,110 L0,110Z"/><path className="line" d="M0,85 C30,82 40,63 70,68 S110,88 135,70 S165,22 195,55 S230,82 260,63 S290,40 315,54 S345,85 370,57 S415,28 440,48 S475,75 500,25"/></svg></div><div className="network-meta"><span>INGRESS <b>2.4 MB/s</b></span><span>LATENCY <b>24 ms</b></span><span>PACKETS <b>18.2K</b></span></div></section>
          </div>
        </div>
      </section>
    </main>
  );
}

function ModeSwitch({ mode, onChange, dark = false }: { mode: DashboardMode; onChange: (mode: DashboardMode) => void; dark?: boolean }) {
  return (
    <div className={`mode-switch ${dark ? "dark" : ""}`} role="group" aria-label="Dashboard display mode">
      <button className={mode === "hacker" ? "selected" : ""} onClick={() => onChange("hacker")} aria-pressed={mode === "hacker"}><TerminalSquare /> Hacker</button>
      <button className={mode === "simple" ? "selected" : ""} onClick={() => onChange("simple")} aria-pressed={mode === "simple"}><TableProperties /> Simple</button>
    </div>
  );
}

function SimpleDashboard({
  users, visibleUsers, query, setQuery, loading, error, liveState, lastSync, newId, onRefresh, onModeChange,
}: {
  users: UserRecord[];
  visibleUsers: UserRecord[];
  query: string;
  setQuery: (value: string) => void;
  loading: boolean;
  error: string;
  liveState: LiveState;
  lastSync: Date | null;
  newId: string | null;
  onRefresh: () => Promise<void>;
  onModeChange: (mode: DashboardMode) => void;
}) {
  return (
    <main className="simple-dashboard">
      <header className="simple-header">
        <div className="simple-brand"><span><Database /></span><div><strong>Data Portal</strong><small>User records dashboard</small></div></div>
        <ModeSwitch mode="simple" onChange={onModeChange} />
      </header>
      <section className="simple-content">
        <div className="simple-heading">
          <div><p>Dashboard</p><h1>Captured Data</h1><span>View and manage user data received from connected applications.</span></div>
          <div className="simple-heading-actions"><button className="simple-refresh" onClick={() => void onRefresh()} disabled={loading}><RefreshCw className={loading ? "spin" : ""} /> Refresh data</button><SimulatorLink /></div>
        </div>

        {error && <div className="simple-error"><ShieldAlert /><div><strong>Could not load captured data</strong><span>{error}. Check the database connection and try again.</span></div><button onClick={() => void onRefresh()}>Try again</button></div>}

        <div className="simple-summary">
          <article><span><Users /></span><div><small>Total records</small><strong>{users.length}</strong></div></article>
          <article><span className="green"><CircleDot /></span><div><small>Active users</small><strong>{users.filter((user) => user.status.toLowerCase() === "active").length}</strong></div></article>
          <article><span className="blue"><Wifi /></span><div><small>Live updates</small><strong className={`simple-live ${liveState}`}>{liveState === "live" ? "Connected" : "Reconnecting"}</strong></div></article>
        </div>

        <section className="simple-panel">
          <div className="simple-panel-head">
            <div><h2>User records</h2><p>{visibleUsers.length} {visibleUsers.length === 1 ? "record" : "records"}</p></div>
            <div className="simple-tools"><label><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email, location..." /></label><button onClick={() => exportCsv(visibleUsers)}><Download /> Export</button></div>
          </div>
          <div className="simple-table-wrap">
            <table className="simple-table">
              <thead><tr><th>User</th><th>Contact</th><th>Location</th><th>Device</th><th>Risk level</th><th>Status</th><th>Received</th></tr></thead>
              <tbody>{visibleUsers.map((user) => <SimpleUserRow key={user.id} user={user} fresh={newId === user.id} />)}</tbody>
            </table>
            {!loading && visibleUsers.length === 0 && <div className="simple-empty"><Users /><strong>No captured data found</strong><p>{query ? "Try a different search term." : "New user records will appear here automatically."}</p></div>}
            {loading && users.length === 0 && <div className="simple-empty"><RefreshCw className="spin" /><strong>Loading captured data</strong></div>}
          </div>
          <footer className="simple-panel-foot"><span><i className={liveState} />Updates are received automatically</span><span>Last updated {lastSync ? lastSync.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</span></footer>
        </section>
      </section>
    </main>
  );
}

function SimpleUserRow({ user, fresh }: { user: UserRecord; fresh: boolean }) {
  const initials = user.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <tr className={fresh ? "simple-fresh" : ""}>
      <td><div className="simple-user"><span>{initials}</span><div><strong>{user.name}</strong><small>{user.externalId ?? `#${user.id.slice(0, 8)}`}</small></div>{fresh && <em>New</em>}</div></td>
      <td><strong>{user.email}</strong><small>{user.phone || "Not provided"}</small></td>
      <td><strong>{user.location || "Not provided"}</strong><small>{user.ipAddress || "No IP address"}</small></td>
      <td><strong>{user.device || "Unknown device"}</strong></td>
      <td><span className={`simple-risk ${user.threatLevel}`}>{user.threatLevel}</span></td>
      <td><span className="simple-status"><i />{user.status}</span></td>
      <td><strong>{relativeTime(user.createdAt)}</strong><small>{new Date(user.createdAt).toLocaleDateString()}</small></td>
    </tr>
  );
}

function SimulatorLink({ dark = false }: { dark?: boolean }) {
  return (
    <a className={`simulator-link ${dark ? "dark" : ""}`} href="/scam-simulator" target="_blank" rel="noopener noreferrer" title="Open the scam awareness simulator in a new tab">
      <GraduationCap /><span>SCAM SIMULATOR</span><ExternalLink />
    </a>
  );
}

function Clock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => { const tick = () => setTime(new Date().toLocaleTimeString([], { hour12: false })); tick(); const id = setInterval(tick, 1000); return () => clearInterval(id); }, []);
  return <span>{time} IST</span>;
}

function StatCard({ icon, label, value, delta, tone, bars }: { icon: React.ReactNode; label: string; value: number; delta: string; tone: string; bars: number[] }) {
  return <article className={`stat-card ${tone}`}><div className="stat-top"><span className="stat-icon">{icon}</span><small>+ {delta}</small></div><div className="stat-value">{String(value).padStart(2, "0")}</div><div className="stat-label">{label}</div><div className="micro-bars">{bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="corner corner-a"/><div className="corner corner-b"/></article>;
}

function UserRow({ user, index, fresh }: { user: UserRecord; index: number; fresh: boolean }) {
  const initials = user.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <tr className={fresh ? "fresh-row" : ""}><td><div className="identity"><span className={`avatar avatar-${index % 5}`}>{initials}</span><div><strong>{user.name}</strong><small>ID_{user.externalId ?? user.id.slice(0, 8).toUpperCase()}</small></div>{fresh && <em>NEW</em>}</div></td><td><strong className="mono-value">{user.email}</strong><small>{user.phone || "NO PHONE VECTOR"}</small></td><td><strong className="mono-value">{user.location || "UNKNOWN SECTOR"}</strong><small>{user.ipAddress || "IP MASKED"}</small></td><td><strong>{user.device || "Unknown device"}</strong><small>MOBILE ENDPOINT</small></td><td><span className={`threat ${user.threatLevel}`}>{user.threatLevel}</span></td><td><span className="status"><i />{user.status}</span></td><td><strong className="mono-value">{relativeTime(user.lastSeen)}</strong><small>{new Date(user.lastSeen).toLocaleDateString()}</small></td></tr>;
}

function relativeTime(date: string) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function exportCsv(users: UserRecord[]) {
  const fields: (keyof UserRecord)[] = ["id", "name", "email", "phone", "ipAddress", "device", "location", "status", "threatLevel", "createdAt"];
  const csv = [fields.join(","), ...users.map((user) => fields.map((field) => `"${String(user[field] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = `cybershield-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}
