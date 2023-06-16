import axios from "axios";
import { useEffect, useState } from "react";

const WeatherContainer = () => {
  const [city, setCity] = useState({
    name: "",
    humidity: 0,
  });

  const [input, setInput] = useState("");

  const handleClick = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=4a550628d96845a7da3b7a38a4285d38&units=metric`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setCity({
          ...city,
          name: res.data.name,
          humidity: res.data.main.humidity,
        });
      })

      .catch((error) => alert(`Enter a valid location (${error})`));
  };
  return (
    <>
      <div>
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="search"
            placeholder="search location"
            name=""
            id=""
          />
          <button onClick={handleClick}>cliccami</button>
        </form>

       
        <img  alt=""></img>
        <h1>{city.humidity}</h1>
      </div>
      <div>
      <h1>{city.name}</h1>
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
      </div>
    </>
  );
};

export default WeatherContainer;
