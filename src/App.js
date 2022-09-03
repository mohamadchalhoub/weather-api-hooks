import "./App.css";
import SearchBar from "./SearchBar";
import TemperatureNow from "./TemperatureNow";
import TemperatureHourly from "./TemperatureHourly";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "93cbb145b6fa7753a7d6642754a2431b";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&exclude=hourly&units=metric&appid=${API_KEY}`;

  const getWeather = (e) => {
    e.preventDefault();
    const city = e.target.value;
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
    console.log(getData);
  }, [url]);

  return (
    <div className="App">
      <SearchBar />
      <TemperatureNow />
      <TemperatureHourly />
    </div>
  );
}

export default App;
