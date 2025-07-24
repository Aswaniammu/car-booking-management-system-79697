import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { fetchCars } from "../api";

function getInitialFilters() {
  return {
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    seats: "",
    transmission: "",
  };
}

// PUBLIC_INTERFACE
function CarListPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState(getInitialFilters());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchCars(filters, token)
      .then(setCars)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [filters]);

  function handleChange(e) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleReset() {
    setFilters(getInitialFilters());
  }

  return (
    <div className="carlist-page__container">
      <section className="carlist-filters">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            name="q"
            type="text"
            placeholder="Search cars (make, model, type...)"
            value={filters.q}
            onChange={handleChange}
            className="filter-input"
          />
          <input
            name="category"
            type="text"
            placeholder="Category (SUV, Sedan, ...)"
            value={filters.category}
            onChange={handleChange}
            className="filter-input"
          />
          <input
            name="seats"
            type="number"
            placeholder="Seats"
            min="1"
            value={filters.seats}
            onChange={handleChange}
            className="filter-input"
            style={{ width: 70 }}
          />
          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleChange}
            className="filter-input"
          >
            <option value="">Any</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
          <input
            name="minPrice"
            type="number"
            placeholder="Min price"
            min="0"
            value={filters.minPrice}
            onChange={handleChange}
            className="filter-input"
          />
          <input
            name="maxPrice"
            type="number"
            placeholder="Max price"
            min="0"
            value={filters.maxPrice}
            onChange={handleChange}
            className="filter-input"
          />
          <button className="btn-primary" type="submit">
            Search
          </button>
          <button
            className="btn-ghost"
            type="button"
            onClick={handleReset}
            style={{ marginLeft: 8 }}
          >
            Reset
          </button>
        </form>
      </section>
      <section className="carlist-results">
        {loading && <div className="status-message">Loading cars...</div>}
        {error && <div className="status-message status-error">{error}</div>}
        {!loading && cars.length === 0 && (
          <div className="status-message">No cars found.</div>
        )}
        <div className="car-cards__grid">
          {cars.map((car) => (
            <div
              className={`car-card ${expanded === car.id ? "expanded" : ""}`}
              key={car.id}
              onClick={() =>
                setExpanded((exp) => (exp === car.id ? null : car.id))
              }
            >
              <div className="car-card__header">
                <span className="car-card__make">
                  {car.make} {car.model}
                </span>
                <span className="car-card__category">{car.category}</span>
              </div>
              <div className="car-card__meta">
                <span>{car.seats} seats</span>
                <span>{car.transmission}</span>
                <span>
                  <b>${car.price_per_day}/day</b>
                </span>
              </div>
              {expanded === car.id && (
                <div className="car-card__details">
                  <p>
                    <b>Description:</b> {car.description || "N/A"}
                  </p>
                  <button
                    className="btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/cars/${car.id}/book`);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default CarListPage;
