import Clear from './weather-icons/weather-icons/clear.svg'

const TemperatureHourly = ({time,temp,chooseIcon}) => {
  return (
    <div className="">
      <h5>{(time)}</h5>
      <img src={Clear} style={{width:100, height:100 }} alt="icon" />
      <h3>{Math.floor(temp)} °C</h3>
    </div>
  )
};

export default TemperatureHourly;
