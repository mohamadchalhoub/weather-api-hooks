import "./App.css";
import { useState } from "react";
import SearchBar from "./SearchBar";
import TemperatureHourly from "./TemperatureHourly";
import TemperatureNow from "./TemperatureNow";
import Clear from "./weather-icons/weather-icons/clear.svg";
import Drizzle from "./weather-icons/weather-icons/drizzle.svg";
import Fog from "./weather-icons/weather-icons/fog.svg";
import Rain from "./weather-icons/weather-icons/rain.svg";
import Snow from "./weather-icons/weather-icons/snow.svg";
import Storm from "./weather-icons/weather-icons/storm.svg";
import Unknown from "./weather-icons/weather-icons/unknown.svg";
import MostlyCloudy from './weather-icons/weather-icons/mostlycloudy.svg';
import PartlyCloudy from './weather-icons/weather-icons/partlycloudy.svg';
// import Cloudy from './weather-icons/weather-icons/cloudy';

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "93cbb145b6fa7753a7d6642754a2431b";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&exclude=hourly&units=metric&appid=${API_KEY}`;

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw error("Cannot fetch data from that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
      });
    return { data, isPending, error };
  };

  const chooseIcon = (id) => {
    if (id === 800) return Clear;
    if (id === 801) return PartlyCloudy;
    if (800 < id < 805) return MostlyCloudy;
    if (id === null) return Unknown;
    if (id < 300) return Storm;
    if (300 < id < 499) return Drizzle;
    if (500 < id < 599) return Rain;
    if (600 < id < 699) return Snow;
    if (700 < id < 799) return Fog;
  };

  return (
    <div className="clear rain">
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} chooseIcon={chooseIcon} />
      {data && (
        <TemperatureNow
          description={data.list[0].weather[0].description}
          temp_min={data.list[0].main.temp_min}
          temp_max={data.list[0].main.temp_max}
          humidity={data.list[0].main.humidity}
          pressure={data.list[0].main.pressure}
          feels_like={data.list[0].main.feels_like}
          chooseIcon={chooseIcon(data.list[0].weather[0].id)}
        />
      )}
      <div className="TemperatureHourlyFlex">
        {data &&
          data.list.map((item, id) => {
            if (id > 0) {
              return (
                <TemperatureHourly
                  temp={item.main.temp}
                  time={item.dt_txt}
                  chooseIcon={chooseIcon(item.weather[0].id)}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
export default App;
