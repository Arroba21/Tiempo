import { useState } from "react";

function SearchBar({ onSearch, onUseLocation }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "12px 14px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          fontSize: "16px",
          minWidth: "240px",
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px 18px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#1e3a5f",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Buscar
      </button>

      <button
        type="button"
        onClick={onUseLocation}
        style={{
          padding: "12px 18px",
          borderRadius: "10px",
          border: "1px solid #1e3a5f",
          backgroundColor: "#ffffff",
          color: "#1e3a5f",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Mi ubicación
      </button>
    </form>
  );
}

export default SearchBar;