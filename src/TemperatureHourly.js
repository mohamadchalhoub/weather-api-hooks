// import Clear from "./weather-icons/weather-icons/clear.svg";


const TemperatureHourly = ({ time, temp, chooseIcon }) => {
  return (
    <div className="">
      <h5>{time}</h5>
      <img src={chooseIcon} style={{ width: 80, height: 80 }} alt="icon" />
      <h3>{Math.floor(temp)} °C</h3>
    </div>
  );
};

export default TemperatureHourly;
