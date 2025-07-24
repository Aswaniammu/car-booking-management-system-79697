import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { fetchBookings, cancelBooking } from "../api";

// PUBLIC_INTERFACE
function BookingHistoryPage() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setLoading(true);
    setError("");
    fetchBookings(token)
      .then(setBookings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, msg]);

  async function handleCancel(id) {
    setMsg("");
    try {
      await cancelBooking(id, token);
      setMsg("Booking cancelled.");
      setBookings((list) => list.filter((b) => b.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="bookinghistory-container">
      <h2>My Bookings</h2>
      {loading && <div className="status-message">Loading bookings...</div>}
      {error && <div className="status-message status-error">{error}</div>}
      {!loading && bookings.length === 0 && (
        <div className="status-message">No bookings found.</div>
      )}
      <ul className="booking-list">
        {bookings.map((b) => (
          <li key={b.id} className="booking-list__item">
            <span>
              <b>{b.car.make} {b.car.model}</b> ({b.car.category})<br/>
              <small>
                From: {b.from_date} &ndash; To: {b.to_date} (${b.price_total})
              </small>
            </span>
            <span>
              {b.status}
              {b.status === "active" && (
                <button
                  className="btn-ghost"
                  onClick={() => handleCancel(b.id)}
                >
                  Cancel
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
      {msg && <div className="booking-status">{msg}</div>}
    </div>
  );
}
export default BookingHistoryPage;
