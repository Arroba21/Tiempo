import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import FavoritesList from "./components/FavoritesList";
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from "./services/weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedFavorites = localStorage.getItem("weatherFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedUnit = localStorage.getItem("weatherUnit");
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  const saveFavoritesToLocalStorage = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem("weatherFavorites", JSON.stringify(updatedFavorites));
  };

  const handleAddFavorite = (city) => {
    if (favorites.includes(city)) return;

    const updatedFavorites = [...favorites, city];
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  const handleRemoveFavorite = (cityToRemove) => {
    const updatedFavorites = favorites.filter(
      (city) => city !== cityToRemove
    );
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  const handleToggleUnit = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    localStorage.setItem("weatherUnit", newUnit);
  };

  const handleSearch = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      const weatherData = await getWeatherByCity(cityName);
      const forecastData = await getForecastByCity(cityName);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error("Error al consultar la API:", err);
      setWeather(null);
      setForecast([]);
      setError("No se encontró la ciudad o hubo un error al consultar la API.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFavorite = async (city) => {
    await handleSearch(city);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible en tu navegador.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const weatherData = await getWeatherByCoords(latitude, longitude);
          const forecastData = await getForecastByCoords(latitude, longitude);

          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          console.error("Error al consultar la ubicación:", err);
          setWeather(null);
          setForecast([]);
          setError("No se pudo obtener el clima con tu ubicación.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("No se pudo acceder a tu ubicación.");
      }
    );
  };

  const getBackgroundByWeather = () => {
    if (!weather) return "linear-gradient(to bottom, #e0f2fe, #f8fafc)";

    switch (weather.main) {
      case "Clear":
        return "linear-gradient(to bottom, #7dd3fc, #fef9c3)";
      case "Clouds":
        return "linear-gradient(to bottom, #cbd5e1, #f8fafc)";
      case "Rain":
      case "Drizzle":
        return "linear-gradient(to bottom, #64748b, #cbd5e1)";
      case "Thunderstorm":
        return "linear-gradient(to bottom, #334155, #94a3b8)";
      case "Snow":
        return "linear-gradient(to bottom, #e0f2fe, #ffffff)";
      default:
        return "linear-gradient(to bottom, #e0f2fe, #f8fafc)";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: getBackgroundByWeather(),
        padding: "40px 20px",
        transition: "background 0.5s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(8px)",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          <h1
            style={{
              color: "#1e3a5f",
              margin: 0,
              fontSize: "48px",
            }}
          >
            El tiempo ahora
          </h1>

          <button
            type="button"
            onClick={handleToggleUnit}
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
            Cambiar a °{unit === "C" ? "F" : "C"}
          </button>
        </div>

        <p
          style={{
            color: "#475569",
            marginBottom: "24px",
            fontSize: "18px",
          }}
        >
          Consulta el clima actual y el pronóstico de 5 días.
        </p>

        <SearchBar
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
        />

        {loading && (
          <p style={{ color: "#334155", marginTop: "12px" }}>
            Cargando clima...
          </p>
        )}

        {error && (
          <p style={{ color: "#b91c1c", marginTop: "12px" }}>
            {error}
          </p>
        )}

        {weather && (
          <WeatherCard
            weather={weather}
            onAddFavorite={handleAddFavorite}
            unit={unit}
          />
        )}

        {forecast.length > 0 && (
          <ForecastList
            forecast={forecast}
            unit={unit}
          />
        )}

        <FavoritesList
          favorites={favorites}
          onSelectFavorite={handleSelectFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </div>
    </div>
  );
}

export default App;