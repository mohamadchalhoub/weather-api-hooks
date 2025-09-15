import "./App.css";
import { useState, useEffect } from "react";
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
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import format from 'date-fns/format'

// import Cloudy from './weather-icons/weather-icons/cloudy';

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  
  // Auto-dismiss error after 3 seconds
  useEffect(() => {
    if (!error) return;
    const timeoutId = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timeoutId);
  }, [error]);
  const API_KEY = "93cbb145b6fa7753a7d6642754a2431b";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&exclude=hourly&units=metric&appid=${API_KEY}`;

  // Popular cities list for autocomplete
  const cities = [
    "New York", "London", "Tokyo", "Paris", "Sydney", "Berlin", "Rome", "Madrid", "Moscow", "Beijing",
    "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin",
    "Barcelona", "Amsterdam", "Vienna", "Prague", "Warsaw", "Stockholm", "Copenhagen", "Helsinki", "Oslo", "Dublin",
    "Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Quebec City", "Hamilton", "London",
    "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Wollongong", "Geelong", "Hobart",
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Lucknow",
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre",
    "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Juárez", "Zapopan", "Nezahualcóyotl", "Guadalupe",
    "Cairo", "Lagos", "Kinshasa", "Johannesburg", "Cape Town", "Nairobi", "Addis Ababa", "Casablanca", "Alexandria", "Abidjan",
    "Bangkok", "Jakarta", "Manila", "Ho Chi Minh City", "Kuala Lumpur", "Singapore", "Seoul", "Hong Kong", "Taipei", "Macau",
    "Buenos Aires", "Santiago", "Lima", "Bogotá", "Caracas", "Quito", "La Paz", "Asunción", "Montevideo", "Georgetown",
    "Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Mersin", "Diyarbakır",
    "Tehran", "Mashhad", "Isfahan", "Tabriz", "Shiraz", "Karaj", "Ahvaz", "Qom", "Kermanshah", "Urmia",
    "Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Taif", "Buraidah", "Tabuk", "Khamis Mushait",
    "Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Al Dhafra", "Al Fujairah",
    "Beirut", "Tripoli", "Sidon", "Tyre", "Zahle", "Baalbek", "Jounieh", "Nabatieh", "Byblos", "Batroun",
    "Amman", "Zarqa", "Irbid", "Russeifa", "Wadi as-Sir", "Aqaba", "Salt", "Madaba", "Jerash", "Mafraq",
    "Damascus", "Aleppo", "Homs", "Hama", "Latakia", "Deir ez-Zor", "Raqqa", "Daraa", "Idlib", "Tartus",
    "Baghdad", "Basra", "Mosul", "Erbil", "Najaf", "Karbala", "Sulaymaniyah", "Nasiriyah", "Ramadi", "Fallujah",
    "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak",
    "Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Dukhan", "Lusail", "Al Shamal", "Al Daayen", "Umm Salal", "Al Sheehaniya",
    "Kuwait City", "Al Ahmadi", "Hawalli", "Al Farwaniyah", "Al Jahra", "Mubarak Al-Kabeer", "Al Asimah", "Al Farwaniyah", "Al Jahra", "Hawalli",
    "Manama", "Riffa", "Muharraq", "Hamad Town", "A'ali", "Isa Town", "Sitra", "Budaiya", "Jidhafs", "Tubli",
    "Muscat", "Seeb", "Salalah", "Bawshar", "Sohar", "Suwayq", "Ibri", "Saham", "Barka", "Rustaq",
    "Sana'a", "Aden", "Taiz", "Hodeidah", "Ibb", "Dhamar", "Al-Mukalla", "Zinjibar", "Sayyan", "Ash Shihr",
    "Beirut", "Tripoli", "Sidon", "Tyre", "Zahle", "Baalbek", "Jounieh", "Nabatieh", "Byblos", "Batroun"
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.length > 0) {
      const filteredCities = cities.filter(cityName =>
        cityName.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredCities.slice(0, 10)); // Limit to 10 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleInputFocus = () => {
    if (city.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Start loading animation
    setIsLoading(true);
    setShowWeather(false);
    setError(null);
    
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((body) => {
            const friendly = res.status === 404
              ? 'City not found. Please check the spelling and try again.'
              : (body && body.message ? body.message : 'Failed to fetch weather data.');
            throw new Error(friendly);
          });
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
        
        // Add delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
          setShowWeather(true);
        }, 500);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
        setIsLoading(false);
        setShowWeather(false);
        setData(null);
      });
    return { data, isPending, error };
  };

  /* const chooseIcon = (id) => {
    if (id === 800) return Clear;
    if (id === 801) return PartlyCloudy;
    if (800 < id < 805) return MostlyCloudy;
    if (id === null) return Unknown;
    if (id < 300) return Storm;
    if (300 < id < 499) return Drizzle;
    if (id === 500) return Rain;
    if (500 < id < 599) return Rain;
    if (600 < id < 699) return Snow;
    if (700 < id < 799) return Fog;
  }; */

  const chooseIcon = (id) => {
    switch (id) {
      case 800:
        return Clear;
      case 801:
        return PartlyCloudy;
      case 802:
      case 803:
      case 804:
        return MostlyCloudy;
      case null:
        return Unknown;
      case (id < 300):
        return Storm;
      case (id >= 300 && id < 499):
        return Drizzle;
      case 500:
        return Rain;
      case (id >= 500 && id < 599):
        return Rain;
      case (id >= 600 && id < 699):
        return Snow;
      case (id >= 700 && id < 799):
        return Fog;
      default:
        return Unknown;
    }
  };
  

  return (
    <div className="app">
      <SearchBar 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        chooseIcon={chooseIcon}
        city={city}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        handleSuggestionClick={handleSuggestionClick}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
      />
      {error && (
        <div className="search-error" role="alert">{error}</div>
      )}
      
      {/* Loading Animation */}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading weather data...</p>
        </div>
      )}
      
      {/* Weather Data with Animation */}
      {data && showWeather && !isLoading && (
        <div className="weather-container fade-in">
          <TemperatureNow
            description={data.list[0].weather[0].description}
            temp_min={data.list[0].main.temp_min}
            temp_max={data.list[0].main.temp_max}
            humidity={data.list[0].main.humidity}
            pressure={data.list[0].main.pressure}
            feels_like={data.list[0].main.feels_like}
            chooseIcon={chooseIcon(data.list[0].weather[0].id)}
          />
          <div className="TemperatureHourlyFlex">
            {data.list.map((item, id) => {
              if (id > 0) {
                return (
                  <TemperatureHourly
                    key={id}
                    error={error}
                    temp={item.main.temp}
                    time={format(new Date(item.dt_txt), 'EEE hh:mm a')}
                    chooseIcon={chooseIcon(item.weather[0].id)}
                  />
                );
              }
            })}
          </div>
        </div>
      )}
      
      {/* Error Display */}
      {error && !isLoading && (
        <div className="error-container fade-in">
          <p className="error-text">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
export default App;
