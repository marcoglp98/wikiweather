import axios from "axios";
import { useState } from "react";
import WikiContainer from "./WikiContainer";
const WeatherContainer = () => {
  const [city, setCity] = useState({
    name: "null",
    humidity: 0,
  });

  const [input, setInput] = useState("");
  const [isShown, setIsShown] = useState(false);
  const key = `4a550628d96845a7da3b7a38a4285d38`;

  const handleCity = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${key}&units=metric`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setCity({
          ...city,
          name: res.data.name,
          humidity: res.data.main.humidity,
        });
        setIsShown(true);
      })

      .catch((error) => alert(`Enter a valid location (${error})`));
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
        <button onClick={handleCity}>cliccami</button>
        {isShown && (
          <>
            <h1>{city.name}</h1>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt=""
            ></img>
            <h1>{city.humidity}</h1>
            <div>
              <h1>5°</h1>
            </div>
            <div>
              <p></p>
              <h1>5km/h</h1>
            </div>
            <div>
              <p>Humidity</p>
              <h1>10%</h1>
            </div>
            <div>
              <p>Feels Like</p>
              <h1>4°</h1>
              <WikiContainer city={city.name}></WikiContainer>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherContainer;
