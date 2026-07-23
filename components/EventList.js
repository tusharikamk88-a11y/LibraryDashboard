"use client";

export default function EventList({ events }) {
  if (!events || events.length === 0) {
    return <div className="warning-box">No events loaded. Please check your Google Sheet.</div>;
  }

  return (
    <div>
      {events.map((event, i) => (
        <div className="event-card" key={i}>
          <span className="event-date">📆 {event.date || "N/A"}</span>
          <div className="event-title">{event.title || "N/A"}</div>
          <div className="event-meta">
            🕐 {event.time || "N/A"} &nbsp;|&nbsp; 📍 {event.location || "N/A"}
          </div>
          <div className="event-desc">{event.desc || "N/A"}</div>
        </div>
      ))}
    </div>
  );
}
