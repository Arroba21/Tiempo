function FavoritesList({ favorites, onSelectFavorite, onRemoveFavorite }) {
  if (favorites.length === 0) return null;

  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ color: "#1e3a5f", marginBottom: "12px" }}>
        Ciudades favoritas
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {favorites.map((city) => (
          <div
            key={city}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "14px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
            }}
          >
            <button
              type="button"
              onClick={() => onSelectFavorite(city)}
              style={{
                border: "none",
                background: "transparent",
                color: "#1e3a5f",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "left",
              }}
            >
              {city}
            </button>

            <button
              type="button"
              onClick={() => onRemoveFavorite(city)}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#dc2626",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;