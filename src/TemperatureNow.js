// import Clear from "./weather-icons/weather-icons/clear.svg";


const TemperatureNow = (props) => {
  return (
    <div className="WeatherNow">
      <img src={props.chooseIcon} style={{ width: 150, height: 150 }} alt="icon-weather" />
      <h2>{props.description}</h2>
      <h3>
        <b>Temperature</b> {Math.floor(props.temp_min)} to{" "}
        {Math.floor(props.temp_max)}°C
      </h3>
      <h4>Feels like: {Math.floor(props.feels_like)} °C</h4>
      <h5>
        <b>Humidity: {props.humidity} %</b> <b> Pressure: {props.pressure} </b>
      </h5>
    </div>
  );
};

export default TemperatureNow;
