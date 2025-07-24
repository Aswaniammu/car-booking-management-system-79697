import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { fetchCar, createBooking } from "../api";

// PUBLIC_INTERFACE
function BookingPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchCar(id, token)
      .then(setCar)
      .catch(() => setMsg("Could not load car information"))
      .finally(() => setLoading(false));
  }, [id, token]);

  async function handleBook(e) {
    e.preventDefault();
    if (!from || !to) {
      setMsg("Please select from/to dates.");
      return;
    }
    setMsg("");
    try {
      await createBooking(id, from, to, token);
      setMsg("Booking successful!");
      setTimeout(() => navigate("/history"), 1200);
    } catch (e) {
      setMsg(e.message);
    }
  }
  if (loading) return <div className="status-message">Loading car...</div>;
  if (!car) return <div className="status-message status-error">{msg}</div>;

  return (
    <div className="booking-page__container">
      <h2>
        Book: {car.make} {car.model}
      </h2>
      <form className="booking-form" onSubmit={handleBook}>
        <label>
          From:
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            min={new Date().toISOString().slice(0, 10)}
            required
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            min={from || new Date().toISOString().slice(0, 10)}
            required
          />
        </label>
        <button className="btn-primary" type="submit">
          Book Now
        </button>
      </form>
      {msg && <div className="booking-status">{msg}</div>}
    </div>
  );
}
export default BookingPage;
