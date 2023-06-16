import axios from "axios";
import { useEffect, useState } from "react";
import WikiContainer from "./WikiContainer";
const WeatherContainer = () => {
const [city, setCity] = useState({
  name: "palermo",
  humidity:0
})

const [input, setInput] = useState("")

const handleClick = ()=> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=4a550628d96845a7da3b7a38a4285d38&units=metric`;
    axios.get(url)
    .then(res=>{console.log(res.data);
    setCity({...city, name:res.data.name, humidity: res.data.main.humidity})
  })
    
    .catch( error => alert(`Enter a valid location (${error})`))
 
}
return (
    <>
      <div>
      <button onClick={handleClick}>cliccami</button>
        <form>
          <input
            onChange={e=> setInput(e.target.value)}
            type="search"
            placeholder="search location"
            name=""
            id=""
            
          />
        </form>
        <h1>{city.name}</h1>
        <div></div>
        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt=""></img>
        <h1>{city.humidity}</h1>
      </div>
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
      </div>
   <WikiContainer city={city.name}></WikiContainer>
    </>
  );
};

export default WeatherContainer;
