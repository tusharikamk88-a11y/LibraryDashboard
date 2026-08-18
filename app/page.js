"use client";

import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import BookGrid from "../components/BookGrid";
import EventList from "../components/EventList";

const SHEET_NAMES = {
  kids: "Catalogue kids",
  adults: "Catalogue Adults",
  events: "Events",
};

async function fetchSheet(sheetKey) {
  const res = await fetch(`/api/sheet?sheet=${encodeURIComponent(SHEET_NAMES[sheetKey])}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to load sheet");
  }
  return data.records;
}

export default function Dashboard() {
  const [page, setPage] = useState("kids");
  const [kidsBooks, setKidsBooks] = useState([]);
  const [adultBooks, setAdultBooks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kidsQuery, setKidsQuery] = useState("");
  const [adultQuery, setAdultQuery] = useState("");

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [kids, adults, evts] = await Promise.all([
        fetchSheet("kids"),
        fetchSheet("adults"),
        fetchSheet("events"),
      ]);
      setKidsBooks(kids);
      setAdultBooks(adults);
      setEvents(evts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const totalBooks = kidsBooks.length + adultBooks.length;

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} onReload={loadAll} />
      <main className="main-content">
        {error && <div className="error-box" style={{ marginBottom: "1.5rem" }}>Error loading data: {error}</div>}

        {page === "kids" && (
          <>
            <div className="page-header kids-header">
              <h1>🧒 Catalogue Kids</h1>
              <p>Magical stories, picture books, and adventures for young readers of every age.</p>
            </div>
            <div className="toolbar">
              <input
                className="search-input"
                placeholder="🔎 Search by title or author…"
                value={kidsQuery}
                onChange={(e) => setKidsQuery(e.target.value)}
              />
              <div className="metric-box">
                <div className="metric-value">
                  {kidsBooks.filter((b) => b.available).length} / {kidsBooks.length}
                </div>
                <div className="metric-label">Available Now</div>
              </div>
            </div>
            {loading ? (
              <p>Loading books…</p>
            ) : kidsBooks.length > 0 ? (
              <BookGrid books={kidsBooks} searchQuery={kidsQuery} />
            ) : (
              <div className="warning-box">
                No kids books loaded. Please check your Google Sheet name and sharing settings.
              </div>
            )}
          </>
        )}

        {page === "adults" && (
          <>
            <div className="page-header adult-header">
              <h1>🧑 Catalogue Adults</h1>
              <p>From literary fiction to non-fiction deep dives — curated for curious minds.</p>
            </div>
            <div className="toolbar">
              <input
                className="search-input"
                placeholder="🔎 Search by title or author…"
                value={adultQuery}
                onChange={(e) => setAdultQuery(e.target.value)}
              />
              <div className="metric-box">
                <div className="metric-value">
                  {adultBooks.filter((b) => b.available).length} / {adultBooks.length}
                </div>
                <div className="metric-label">Available Now</div>
              </div>
            </div>
            {loading ? (
              <p>Loading books…</p>
            ) : adultBooks.length > 0 ? (
              <BookGrid books={adultBooks} searchQuery={adultQuery} />
            ) : (
              <div className="warning-box">
                No adult books loaded. Please check your Google Sheet name and sharing settings.
              </div>
            )}
          </>
        )}

        {page === "events" && (
          <>
            <div className="page-header events-header">
              <h1>📅 Upcoming Events</h1>
              <p>Storytimes, book clubs, author visits, and workshops — something for everyone.</p>
            </div>
            {loading ? <p>Loading events…</p> : <EventList events={events} />}
          </>
        )}

        {page === "about" && (
          <>
            <div className="page-header about-header">
              <h1>🏛️ About Apni Library</h1>
              <p>Helping children fall in love with reading — one book at a time.</p>
            </div>
            <div className="stat-row">
              {[
                [`${totalBooks}+`, "Books in Collection"],
                ["110+", "Active Members"],
                ["30+", "Events per Year"],
                ["2024", "Est. Year"],
              ].map(([num, label]) => (
                <div className="stat-box" key={label}>
                  <div className="stat-number">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            <h3 className="section-heading">Our Mission</h3>
            <p className="mission-text">
              {`Helping Children Fall in Love with Reading and Learning
Our library was created with a dream — to give children a joyful alternative to screens and
a place where books become their friends. We believe that reading not only enriches knowledge
but also nurtures imagination, empathy, confidence, and character.

Beyond books, we provide opportunities for children to explore, create, communicate, and grow
through a variety of engaging activities. Our goal is to support parents in raising curious,
confident, and well-rounded children who are prepared to thrive in an ever-changing world.

A library today, a brighter future tomorrow.`}
            </p>

            <h3 className="section-heading">Meet the Team</h3>
            <div className="stat-box" style={{ maxWidth: 220 }}>
              <div style={{ fontSize: "2.5rem" }}>👩‍💼</div>
              <div style={{ fontWeight: 800, fontSize: "1rem", marginTop: "0.4rem" }}>
                <div className="stat-label"><h3>Volunteers</h3></div>
                <div style={{ fontWeight: 800, fontSize: "1rem", marginTop: "0.4rem" }}>Chetna, Mugdha, Pavitra, Saranya, Vandana, Vishakha    </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
