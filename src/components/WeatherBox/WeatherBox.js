import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox.js';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setWeatherData('')
    setPending(true);
    setError(false);
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8cb3ac0cae021dd76a517f6161458b3f
&units=metric`)
   .then(res => { 
    if(res.status === 200) {
     return res.json()
    
   .then(data => {
      setPending(false)
     console.log(data);
     console.log(city);

     const Data = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
    }
    setWeatherData(Data)
    })
  } else {
    setError(true)
  }});
  });
  
  return (
    <section>
      <PickCity action={handleCityChange}/>
      {pending && !weatherData && !error && <Loader />}
      {weatherData && <WeatherSummary 
        city={weatherData.city}
        temp={weatherData.temp}
        icon={weatherData.icon}
        description={weatherData.description}

      />
      }
      {error && <ErrorBox/>}
    </section>
  )
};

export default WeatherBox;