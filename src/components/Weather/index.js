import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, SearchForm, WeatherDiv, WeatherData1, City, WeatherData2, Sense, MaxMin, Humidity, Wind, Pressure, WeatherError, CloudErrIcon, MaxIcon, MinIcon, HumIcon, WinIcon, PressIcon } from './styles';
import SearchBar from '../../components/SearchBar';


function Weather({place}) {
   const [data, setData] = useState({});
   const [location, setLocation,] = useState(place);
   const [error, setError] = useState(false);

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location.trim()}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

   useEffect(() => {
      handleSearchLocation();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   async function handleSearchLocation(e) {
      if (e) {
         e.preventDefault();
      }
      
      await axios.get(url)
      .then((response) => {
         setData(response.data);
         setError(false);
      })
      .catch(err => {
         console.log(err);
         setError(true);
      })

      setLocation('');
   }

   return (
      <Container>
         <SearchForm onSubmit={handleSearchLocation}>
            <SearchBar>
               <input
                  type='text'
                  defaultValue={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder='Pesquisar lugar'
               />
            </SearchBar>
         </SearchForm>


         <WeatherDiv>
            {error && (
               <WeatherError>
                  <CloudErrIcon />
                  <p>Ops! Não foram encontrados dados para o seu lugar.</p> 
                  <p>Por favor, pesquise outro nome.</p>
               </WeatherError>
            )}

            <WeatherData1>
               <City>{data.name}</City>
               <p>{data.main ? data.main.temp.toFixed() : null}°</p>
               <span>{data.weather ? data.weather[0].main : null}</span>
            </WeatherData1>

            <WeatherData2>
               <Sense>
                  <span>Sensação: </span>
                  <span className='teste'>{data.main ? data.main.feels_like.toFixed() : null}°</span>
               </Sense>

               <MaxMin>
                  <MaxIcon /><span>{data.main ? data.main.temp_max.toFixed() : null}°</span>
                  <MinIcon /><span>{data.main ? data.main.temp_min.toFixed() : null}°</span>
               </MaxMin>

               <Humidity>
                  <HumIcon />
                  <span>Umidade: </span>
                  <span className='teste'>{data.main ? data.main.humidity : null}%</span>
               </Humidity>

               <Wind>
                  <WinIcon />
                  <span>Ventos: </span>
                  <span className='teste'>{data.wind ? data.wind.speed : null} km/h</span>
               </Wind>

               <Pressure>
                  <PressIcon />
                  <span>Pressão: </span>
                  <span className='teste'>{data.main ? data.main.pressure : null} mBar</span>
               </Pressure>
            </WeatherData2>
         </WeatherDiv>
      </Container>
   );
}

export default Weather;