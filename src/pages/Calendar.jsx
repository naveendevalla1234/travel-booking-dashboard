import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

function Calendar({ data }) {
  const [currentDate, setCurrentDate] =
    useState(new Date(2026, 9, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const cells = useMemo(() => {
    return [
      ...Array(firstDay).fill(null),
      ...Array.from(
        { length: days },
        (_, i) => i + 1
      ),
    ];
  }, [firstDay, days]);

  const previous = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const next = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const hasTrip = (day) => {
    if (!day) return false;

    const value = `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

    return data.trips.some(
      (trip) => trip.date === value
    );
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">SCHEDULE</span>
          <h1>Calendar</h1>
          <p>View upcoming trips and schedules.</p>
        </div>
      </div>

      <div className="calendar-layout">
        <div className="card calendar-card">
          <div className="calendar-header">
            <button
              className="icon-btn"
              onClick={previous}
            >
              <ChevronLeft size={18} />
            </button>

            <h2>
              {currentDate.toLocaleString("en", {
                month: "long",
              })}{" "}
              {year}
            </h2>

            <button
              className="icon-btn"
              onClick={next}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="calendar-weekdays">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <strong key={day}>{day}</strong>
            ))}
          </div>

          <div className="calendar-grid">
            {cells.map((day, index) => (
              <div
                className={`calendar-day ${
                  day && hasTrip(day)
                    ? "has-trip"
                    : ""
                }`}
                key={index}
              >
                {day}

                {day && hasTrip(day) && (
                  <span />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card upcoming-card">
          <div className="card-heading">
            <div>
              <h3>Upcoming Trips</h3>
              <p>Scheduled journeys</p>
            </div>

            <CalendarDays size={20} />
          </div>

          {data.trips.slice(0, 6).map((trip) => (
            <div
              className="calendar-trip"
              key={trip.id}
            >
              <div className="date-box">
                {new Date(trip.date).getDate()}
              </div>

              <div>
                <strong>{trip.trip}</strong>
                <small>
                  {trip.destination} · {trip.date}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Calendar;