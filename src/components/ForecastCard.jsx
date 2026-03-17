function ForecastCard({ day, unit }) {
  const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

  const convertTemperature = (temp) => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  const displayTemperature = Math.round(convertTemperature(day.temperature));

  const formattedDate = new Date(day.date).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div
      style={{
        minWidth: "120px",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderRadius: "16px",
        padding: "16px",
        textAlign: "center",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
      }}
    >
      <p style={{ margin: 0, fontWeight: "bold", color: "#1e3a5f" }}>
        {formattedDate}
      </p>

      <img
        src={iconUrl}
        alt={day.description}
        style={{ width: "60px", height: "60px" }}
      />

      <p style={{ margin: "6px 0", fontSize: "18px", fontWeight: "bold" }}>
        {displayTemperature} °{unit}
      </p>

      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#475569",
          textTransform: "capitalize",
        }}
      >
        {day.description}
      </p>
    </div>
  );
}

export default ForecastCard;