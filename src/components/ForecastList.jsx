import ForecastCard from "./ForecastCard";

function ForecastList({ forecast, unit }) {
  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ color: "#1e3a5f", marginBottom: "16px" }}>
        Pronóstico de 5 días
      </h3>

      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "8px",
        }}
      >
        {forecast.map((day) => (
          <ForecastCard key={day.date} day={day} unit={unit} />
        ))}
      </div>
    </div>
  );
}

export default ForecastList;