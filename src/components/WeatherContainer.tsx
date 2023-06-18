import axios from "axios";
import { useState } from "react";
import WikiContainer from "./WikiContainer";
import clear from "../resources/weatherimgs/clear.svg";
import clouds from "../resources/weatherimgs/cloudy.svg";
import drizzle from "../resources/weatherimgs/drizzle.svg";
import dust from "../resources/weatherimgs/dust.svg";
import fog from "../resources/weatherimgs/fog.svg";
import haze from "../resources/weatherimgs/haze.svg";
import mist from "../resources/weatherimgs/mist.svg";
import rain from "../resources/weatherimgs/rain.svg";
import smoke from "../resources/weatherimgs/smoke.svg";
import snow from "../resources/weatherimgs/snow.svg";
import squall from "../resources/weatherimgs/squall.svg";
import thunderstorm from "../resources/weatherimgs/thunderstorms.svg";
import tornado from "../resources/weatherimgs/tornado.svg";

const WeatherContainer = () => {
  const [city, setCity] = useState({
    conditions: "",
    name: "null",
    temperature: 0,
    speed: 0,
    humidity: 0,
  });

  const [input, setInput] = useState("");
  const [isShown, setIsShown] = useState(false);

  let weatherPic: any = "";

  switch (city.conditions) {
    case "Clear":
      weatherPic = clear;
      break;
    case "Clouds":
      weatherPic = clouds;
      break;
    case "Drizzle":
      weatherPic = drizzle;
      break;
    case "Dust":
      weatherPic = dust;
      break;
    case "Fog":
      weatherPic = fog;
      break;
    case "Haze":
      weatherPic = haze;
      break;
    case "Mist":
      weatherPic = mist;
      break;
    case "Rain":
      weatherPic = rain;
      break;
    case "Smoke":
      weatherPic = smoke;
      break;
    case "Snow":
      weatherPic = snow;
      break;
    case "Squall":
      weatherPic = squall;
      break;
    case "Thunderstorm":
      weatherPic = thunderstorm;
      break;
    case "Tornado":
      weatherPic = tornado;
      break;
    case "Ash":
      weatherPic = dust;
      break;
    case "Sand":
      weatherPic = dust;
      break;
  }

  const key = `4a550628d96845a7da3b7a38a4285d38`;

  const handleCity = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${key}&units=metric`;
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setCity({
        ...city,
        name: res.data.name,
        conditions: res.data.weather[0].main,
        temperature: res.data.main.temp,
        speed: res.data.wind.speed,
        humidity: res.data.main.humidity,
      });

      setIsShown(true);
    } catch (error) {
      alert(`Enter a valid location (${error})`);
    }
  };

  const handlePress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCity();
    }
  };

  return (
    <>
      <div>
        <h1>Welcome to WeatherWiki!</h1>
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handlePress}
            type="search"
            placeholder="search location"
            name=""
            id=""
          />
        </form>
        <button onClick={handleCity}>Search</button>
        {isShown && (
          <>
            <div>
              <div>
                <h1>{city.name}</h1>
                <img src={weatherPic} alt=""></img>
              </div>
              <div>
                <p>Temperature</p>
                <h1>{Math.round(city.temperature)}</h1>
              </div>
              <div>
                <p>Wind Speed</p>
                <h1>{city.speed} km/h</h1>
              </div>
              <div>
                <p>Humidity</p>
                <h1>{city.humidity}%</h1>
              </div>
              <div>
                <WikiContainer city={city.name}></WikiContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherContainer;
