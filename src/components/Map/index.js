import React, { useState, useEffect } from 'react';
import { GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';

import { Container, SearchWrapper } from './styles';

import SearchBar from '../SearchBar';


function Map({handleAddPlace, lat, lng}) {
   const [autocomplete, setAutocomplete] = useState('');
   const [coordinate, setCoordinate] = useState({ lat: 0-22.955126254802835, lng: -43.16871903229074 });

   const options = {
      disableDefaultUI: true,
   }
   
   const onLoad = (autoC) => setAutocomplete(autoC);
   
   const onPlaceChanged = () => {
      const place = autocomplete.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const address = place.formatted_address.split(',');
      address.shift();

      const name = place.name;
      const complement = address.join(', ');

      setCoordinate({ lat, lng });

      handleAddPlace(name, complement, lat, lng);
   }

   useEffect(() => {
      setCoordinate({lat: lat, lng: lng})
   }, [lat, lng])


   return (
      <Container>
         <SearchWrapper>
            <span>Encontre e adicione lugares</span>

            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
               <SearchBar>
                  <input
                     type='text'
                     placeholder='Pesquisar lugares'
                  />
               </SearchBar>
            </Autocomplete>
         </SearchWrapper>

         <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={coordinate}
            options={options}
            zoom={13}

         >
            <Marker position={{lat: parseFloat(lat), lng: parseFloat(lng)}} />
         </GoogleMap>
      </Container>
   );
}

export default Map;