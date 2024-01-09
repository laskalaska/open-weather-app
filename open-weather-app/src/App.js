import './App.scss';
import {useState} from "react";
import axios from "axios";
import {useFormik} from "formik";

function App() {
    const formik = useFormik({
        initialValues: {
            searchBar: ''
        },
        c: (value) => setLocation(value),
        onSubmit: () => searchLocation()
    })
    let {searchBar} = formik.values;

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=059c7c9b1b27534bc48766a3fb562d3a`;

  const searchLocation = () => {
      axios.get(url)
          .then((res) => {
              setData(res.data);
              console.log(res.data)
          })
  }

  return (
    <div className="App">
        <header>
            <form>
                <input type="text" name="searchBar" onChange={event => setLocation(event.target.value)}/>
                <input type="button" value="Search" onClick={formik.handleSubmit}/>
            </form>
        </header>
        {!data.main && <p className="default-text">Search for a city to see the weather forecast</p>}
        {data.main && <div className="main-container">
            <h2 className="location">{data.name}</h2>
            <div className="bottom">
                <div className="left-side">
                    {/*{data.main ? <span className="degree">{data.main.temp.toFixed()}°C</span> : null}*/}
                    <span className="degree">{data.main.temp.toFixed()}°C</span>
                    <span className="description">{data.weather[0].main}</span>
                    <div className="feels-like">Feels like {data.main.feels_like.toFixed()}°C</div>
                </div>
                <div className="right-side">
                    <div className="min-max">
                        <p className="temp-min">Min: <span>{data.main.temp_max.toFixed()}°C</span> Max: <span>{data.main.temp_min.toFixed()}°C</span></p>
                        {/*<span className="temp-min">Min: {data.main.temp_max}°C </span>*/}
                        {/*<span className="temp-max">Max: {data.main.temp_min}°C</span>*/}
                    </div>
                    <div className="humidity">Humidity: <span>{data.main.humidity}%</span></div>
                </div>
            </div>
        </div>}
    </div>
  );
}

export default App;
