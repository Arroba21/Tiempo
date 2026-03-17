function WeatherCard({ weather, onAddFavorite, unit }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  const convertTemperature = (temp) => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  const displayTemperature = Math.round(convertTemperature(weather.temperature));

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0, color: "#1e3a5f" }}>{weather.city}</h2>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={iconUrl}
            alt={weather.description}
            style={{ width: "70px", height: "70px" }}
          />

          <button
            type="button"
            onClick={() => onAddFavorite(weather.city)}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#1e3a5f",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Guardar
          </button>
        </div>
      </div>

      <p style={{ marginBottom: "10px" }}>
        <strong>Temperatura:</strong> {displayTemperature} °{unit}
      </p>

      <p style={{ marginBottom: "10px", textTransform: "capitalize" }}>
        <strong>Descripción:</strong> {weather.description}
      </p>

      <p style={{ marginBottom: "10px" }}>
        <strong>Humedad:</strong> {weather.humidity} %
      </p>

      <p style={{ marginBottom: "0" }}>
        <strong>Viento:</strong> {weather.windSpeed} m/s
      </p>
    </div>
  );
}

export default WeatherCard;