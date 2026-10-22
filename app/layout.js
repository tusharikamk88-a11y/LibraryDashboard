:root {
  --paper: #f4f8fb;
  --ink: #1b2a4a;
  --muted: #5d6b86;
  --line: #d9e2ec;
  --white: #ffffff;
  --children: #ff7a59;
  --adult: #5b3f8c;
  --events: #1f8a70;
  --sun: #ffc93c;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Nunito", system-ui, sans-serif;
  line-height: 1.55;
}

.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px 48px;
}

/* Header */
.masthead {
  text-align: center;
  padding: 40px 0 20px;
}
.masthead h1 {
  margin: 0;
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(2.4rem, 7vw, 4rem);
  letter-spacing: 0.01em;
}
.masthead p {
  margin: 6px 0 0;
  color: var(--muted);
  font-weight: 600;
}

/* Section tabs */
.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 14px 0 26px;
  border-bottom: 2px solid var(--line);
}
.tab {
  font: inherit;
  font-weight: 800;
  padding: 10px 20px;
  border-radius: 999px;
  border: 2px solid var(--line);
  background: var(--white);
  color: var(--ink);
  cursor: pointer;
}
.tab:hover { border-color: var(--ink); }
.tab[aria-pressed="true"] { color: var(--white); border-color: transparent; }
.tab-children[aria-pressed="true"] { background: var(--children); }
.tab-adult[aria-pressed="true"] { background: var(--adult); }
.tab-events[aria-pressed="true"] { background: var(--events); }

button:focus-visible,
a:focus-visible {
  outline: 3px solid var(--sun);
  outline-offset: 2px;
}

/* Catalogue: list left, details right */
.catalogue {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 28px;
  margin-top: 26px;
  align-items: start;
}
.booklist h2,
.events h2 {
  margin: 0 0 12px;
  font-size: 1.15rem;
}
.booklist ul,
.events ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.booklist li + li { margin-top: 8px; }

.book {
  width: 100%;
  text-align: left;
  font: inherit;
  display: flex;
  flex-direction: column;
  padding: 12px 14px;
  background: var(--white);
  border: 2px solid var(--line);
  border-radius: 12px;
  cursor: pointer;
}
.book:hover { border-color: var(--ink); }
.book[aria-current="true"] {
  border-color: var(--ink);
  box-shadow: 4px 4px 0 var(--sun);
}
.book-title { font-weight: 800; }
.book-author { color: var(--muted); font-size: 0.9rem; }

/* Detail panel */
.detail {
  min-height: 320px;
  background: var(--white);
  border: 2px solid var(--line);
  border-radius: 16px;
  padding: 24px;
}
.empty { margin: 0; color: var(--muted); }

.card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
}
.cover img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  box-shadow: 0 2px 10px rgba(27, 42, 74, 0.25);
}
.no-cover {
  aspect-ratio: 2 / 3;
  display: grid;
  place-items: center;
  background: var(--paper);
  border: 2px dashed var(--line);
  border-radius: 8px;
  color: var(--muted);
}
.meta h3 {
  margin: 0;
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.7rem;
  line-height: 1.2;
}
.by { margin: 4px 0 14px; color: var(--muted); font-weight: 600; }
dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 4px 14px;
  margin: 0 0 14px;
}
dt { font-weight: 800; }
dd { margin: 0; }
.desc { margin: 0 0 14px; max-width: 65ch; }
.subjects {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}
.subjects li {
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--paper);
  border: 1px solid var(--line);
  font-size: 0.85rem;
}
.meta a { color: var(--adult); font-weight: 800; }

/* Events */
.events { margin-top: 26px; max-width: 720px; margin-inline: auto; }
.events li {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 14px 16px;
  background: var(--white);
  border: 2px solid var(--line);
  border-radius: 12px;
}
.events li + li { margin-top: 10px; }
.event-date {
  min-width: 96px;
  font-weight: 800;
  color: var(--events);
}
.events li div { display: flex; flex-direction: column; }
.events li div span { color: var(--muted); font-size: 0.9rem; }

/* Mobile */
@media (max-width: 760px) {
  .catalogue { grid-template-columns: 1fr; }
  .card { grid-template-columns: 1fr; }
  .cover { max-width: 180px; }
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
