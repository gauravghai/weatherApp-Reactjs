import apiKeys from "./apiKeys";

export const getPosition = (options) => {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));
};

const getIcon = (main) => {
  switch (main) {
    case "Haze":
      return "CLEAR_DAY";
    case "Clouds":
      return "CLOUDY";
    case "Rain":
      return "RAIN";
    case "Snow":
      return "SNOW";
    case "Dust":
      return "WIND";
    case "Drizzle":
      return "SLEET";
    case "Fog":
      return "FOG";
    case "Smoke":
      return "FOG";
    case "Tornado":
      return "WIND";
    default:
      return "CLEAR_DAY";
  }
};

export const dateBuilder = (d) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

export const getWeatherByCoordinate = async ({ latitude, longitude }) => {
  const apiCall = await fetch(
    `${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key}`
  );
  const data = await apiCall.json();
  return {
    city: data.name,
    temperatureC: Math.round(data.main.temp),
    temperatureF: Math.round(data.main.temp * 1.8 + 32),
    humidity: data.main.humidity,
    main: data.weather[0].main,
    country: data.sys.country,
    icon: getIcon(data.weather[0].main),
    // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),
    // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
  };
};

export const getWeatherByQuery = async (query) => {
  const apiCall = await fetch(`${apiKeys.base}weather?q=${query}&units=metric&APPID=${apiKeys.key}`);
  const data = await apiCall.json();
  return {
    city: data.name,
    temperatureC: Math.round(data.main.temp),
    temperatureF: Math.round(data.main.temp * 1.8 + 32),
    humidity: data.main.humidity,
    visibility: data.visibility,
    windSpeed: data.wind.speed,
    main: data.weather[0].main,
    country: data.sys.country,
    icon: data.weather[0].icon,
    animatedIcon: getIcon(data.weather[0].main),
    // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),
    // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
  };
};
