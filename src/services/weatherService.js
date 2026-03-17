export async function getWeatherByCity(city) {
  const API_KEY = "d1144275fbff18fbdac06f75d111779c";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
  );

  const data = await response.json();
  console.log("Respuesta API:", data);

  if (!response.ok) {
    throw new Error(data.message || "No se pudo obtener el clima");
  }

  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    main: data.weather[0].main,
  };
}
export async function getForecastByCity(city) {
  const API_KEY = "d1144275fbff18fbdac06f75d111779c";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo obtener el pronóstico");
  }

  const dailyForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return dailyForecast.slice(0, 5).map((item) => ({
    date: item.dt_txt,
    temperature: item.main.temp,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
}
export async function getWeatherByCoords(lat, lon) {
  const API_KEY = "d1144275fbff18fbdac06f75d111779c";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo obtener el clima por ubicación");
  }

  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    main: data.weather[0].main,
  };
}

export async function getForecastByCoords(lat, lon) {
  const API_KEY = "d1144275fbff18fbdac06f75d111779c";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo obtener el pronóstico por ubicación");
  }

  const dailyForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return dailyForecast.slice(0, 5).map((item) => ({
    date: item.dt_txt,
    temperature: item.main.temp,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
}