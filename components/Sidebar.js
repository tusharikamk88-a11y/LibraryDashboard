"use client";

const NAV_ITEMS = [
  { key: "kids", label: "🧒 Catalogue kids" },
  { key: "adults", label: "🧑 Catalogue Adults" },
  { key: "events", label: "📅 Upcoming Events" },
  { key: "about", label: "🏛️ About Us" },
];

export default function Sidebar({ page, setPage, onReload }) {
  return (
    <aside className="sidebar">
      <img src="/stack-of-books.png" alt="Apni Library" style={{ width: "100%", maxWidth: "160px", marginBottom: "0.4rem" }} />
      <div className="sidebar-tagline">श्रद्धावान लभते ज्ञानं।</div>
      <hr />
      <ul className="nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.key}>
            <button
              className={`nav-item${page === item.key ? " active" : ""}`}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <div className="sidebar-location">📍IIT Ropar</div>
      <hr />
      <button className="reload-btn" onClick={onReload}>
        🔄 Reload Data
      </button>
    </aside>
  );
}
