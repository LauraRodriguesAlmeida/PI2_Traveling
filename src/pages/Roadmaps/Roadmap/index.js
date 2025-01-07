import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import firebase from '../../../services/firebaseConnection';
import { format } from 'date-fns';

import { Container, Wrapper, Content, RoadmapWrapper, MapWrapper, Header, Section, TitleOpt, Title, MenuOptions, SpanDot, Options, Desc, Created, TitleEmpty, DescEmpty, PlaceList, Place, HeaderPlace, InfoPlace, TitlePlace, Obs, RoadmapForm, OptionIcon, CloudIcon, LocalIcon, EditIcon, NotesIcon, CloseIcon, TrashIcon, Dot } from './styles';
import { AnimatePresence } from 'framer-motion';

import Navbar from '../../../components/Navbar';
import Map from '../../../components/Map';
import Modal from '../../../components/Modal';
import Weather from '../../../components/Weather';
import Button from '../../../components/Button';


function Roadmap() {
   const { user } = useContext(AuthContext);
   const { id } = useParams();
   
   const [thisRoadmap, setThisRoadmap] = useState({});
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   
   const [thisPlace, setThisPlace] = useState({});
   const [places, setPlaces] = useState([]);
   const [place, setPlace] = useState('');
   const [obs, setObs] = useState('');

   const [modalRoadOpt, setModalRoadOpt] = useState(false);
   const [modalRoadmap, setModalRoadmap] = useState(false);
   const [modalPlace, setModalPlace] = useState(false);
   const [modalWeather, setModalWeather] = useState(false);
   
   const [modalPlaceOpt, setModalPlaceOpt] = useState('');
   const [placeIsOpen, setPlaceIsOpen] = useState(false);

   const placelist = {
      from: {y: -10, opacity: 0},
      to: {y: 0, opacity: 1, transition: {duration: .15}}
   }

   let menuRoadRef = useRef();
   let menuPlaceRef = useRef();

   useEffect(() => {
      getThisRoadmap();
      loadPlaces();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      function handleToggleModalRoadOpt() {
         const handler = (e) => {
            if (menuRoadRef?.current && !menuRoadRef.current.contains(e.target)) {
               setModalRoadOpt(false);
            }
         };
         document.addEventListener('mousedown', handler);

         return () => {
            document.removeEventListener('mousedown', handler);
         };
      }

      handleToggleModalRoadOpt();

   }, [setModalRoadOpt, menuRoadRef]);

   useEffect(() => {
      function handleToggleModalPlaceOpt() {
         const handler = (e) => {
            if (menuPlaceRef?.current && !menuPlaceRef.current.contains(e.target)) {
               setPlaceIsOpen(false);
            }
         };
         document.addEventListener('mousedown', handler);

         return () => {
            document.removeEventListener('mousedown', handler);
         };
      }

      handleToggleModalPlaceOpt();

   }, [setPlaceIsOpen, menuPlaceRef]);

   async function getThisRoadmap() {
      const roadmap = await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps')
      .doc(id).get();

      let data = {
         id: id,
         title: roadmap.data().title,
         desc: roadmap.data().desc,
         createdFormated: format(roadmap.data().created.toDate(), 'dd/MM/yyyy')
      };

      setThisRoadmap(data);
   }

   async function handleEditRoadmap(e) {
      e.preventDefault();
      
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps')
      .doc(id)
      .update({
         title: title.trim(),
         desc: desc.trim()
      })
      .then(() => {
         let data = {
            ...thisRoadmap,
            title: title.trim(),
            desc: desc.trim()
         };

         setThisRoadmap(data);
      })
      .catch((err) => {
         console.log(err)
      })

      setModalRoadmap(false);
   }

   async function loadPlaces() {
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps')
      .doc(id).collection('places').orderBy('created', 'desc')
      .get()
      .then((snapshot) => {
         let list = [];

         snapshot.forEach((doc) => {
            list.push({
               id: doc.id,
               place: doc.data().place,
               complement: doc.data().complement,
               lat: doc.data().lat,
               lng: doc.data().lng,
               obs: doc.data().obs,
               created: doc.data().created,
            })
         });

         setPlaces(list);
      })
      .catch((err) => {
         console.log(err);
      })
   }

   async function handleAddPlace(nameplace, complement, lat, lng) {
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps')
      .doc(id).collection('places')
      .add({
         place: nameplace,
         complement: complement,
         lat: lat,
         lng: lng,
         obs: 'Edite seu lugar de viagem adicionando observações.',
         created: new Date(),
      })
      .then(() => {
         let place = {
            place: nameplace,
            complement: complement,
            lat: lat,
            lng: lng,
         }

         handleShowInMap(place);
         console.log('Place saved successfully.');
      })
      .catch((err) => {
         console.log(err);
      })
      
      loadPlaces();
   }

   async function handleDeletePlace(pid) {
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps')
      .doc(id).collection('places').doc(pid)
      .delete()
      .then(() => {
         thisPlace.lat = null;
         thisPlace.lng = null

         console.log('Place deleted.');
      })
      .catch((err) => {
         console.log(err);
      })

      setPlaceIsOpen(false);
      loadPlaces();
	}

   async function handleEditPlace(e) {
      e.preventDefault();
      
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps')
      .doc(id).collection('places')
      .doc(thisPlace.id)
      .update({
         place: place.trim(),
         obs: obs.trim()
      })
      .then(() => {
         console.log('Place edited successfully')
      })
      .catch((err) => {
         console.log(err)
      })

      setModalPlace(false);
      loadPlaces();
   }

   function handleShowInMap(place) {
      setThisPlace(place);
      setPlaceIsOpen(false);
   }

   function handleToggleModalRoadmap() {
      setModalRoadmap(!modalRoadmap);
      
      setTitle(thisRoadmap && thisRoadmap.title);
      setDesc(thisRoadmap && thisRoadmap.desc)
   }
   
   function handleTogglemodalRoadOptions() {
      setModalRoadOpt(!modalRoadOpt);
   }

   function handleToggleModalPlace(place) {
      setModalPlace(!modalPlace);
      
      setThisPlace(place);
      setPlace(place.place);
      setObs(place.obs);
   }

   function handleToggleModalWeather(place) {
      setModalWeather(!modalWeather);

      setThisPlace(place);
      setPlace(place.place);
   }

   function handleTogglePlaceOptions(index) {
      setModalPlaceOpt(index);
      setPlaceIsOpen(!placeIsOpen);
   }


   return (
      <Container>
         <Navbar />

         <Wrapper>
            <Content>
               <RoadmapWrapper>
                  <Header>
                     <TitleOpt>
                        <Title>{thisRoadmap.title}</Title>
                        <OptionIcon onClick={handleTogglemodalRoadOptions} />

                        <AnimatePresence>
                           {modalRoadOpt && (
                              <MenuOptions
                                 ref={menuRoadRef}
                                 variants={placelist}
                                 initial='from'
                                 animate='to'
                                 exit={{y: -10, opacity: 0, transition: {duration: .09}}}
                              >
                                 <SpanDot>
                                    <Dot />
                                 </SpanDot>

                                 <Options onClick={() => handleToggleModalRoadmap()} >
                                    <EditIcon />
                                    <span>Editar roteiro</span>
                                 </Options>

                                 <Options onClick={() => {}} >
                                    <Link to='/notes'>
                                       <NotesIcon />
                                       <span>Escreva uma anotação</span>
                                    </Link>
                                 </Options>
                              </MenuOptions>
                           )}
                        </AnimatePresence>
                     </TitleOpt>

                     <Desc>{thisRoadmap.desc}</Desc>
                     <Created>criado em: {thisRoadmap.createdFormated}</Created>
                  </Header>

                  {places.length === 0 && (
                     <Section>
                        <TitleEmpty>Você criou uma roteiro!</TitleEmpty>
                        <DescEmpty>Salve os lugares que você gosta, organize seus planos e veja seus lugares em um mapa.</DescEmpty>

                     </Section>
                  )}

                  <PlaceList>
                     {places.map((place, index) => (
                        <Place key={index}>
                           <Section>
                              <HeaderPlace>
                                 <InfoPlace>
                                    <TitlePlace>{place.place}</TitlePlace>
                                    <span>{place.complement}</span>
                                 </InfoPlace>

                                 <div>
                                    <OptionIcon place onClick={() => handleTogglePlaceOptions(index)} />
                                    
                                    <AnimatePresence>
                                       {modalPlaceOpt === index && placeIsOpen &&  (
                                          <MenuOptions
                                             place
                                             ref={menuPlaceRef}
                                             variants={placelist}
                                             initial='from'
                                             animate='to'
                                             exit={{y: -10, opacity: 0, transition: {duration: .09}}}
                                          >
                                             <SpanDot>
                                                <Dot place />
                                             </SpanDot>

                                             <Options onClick={() => handleToggleModalWeather(place)} >
                                                <CloudIcon />
                                                <span>Visualizar clima do lugar</span>
                                             </Options>
                                             
                                             <Options onClick={() => handleShowInMap(place)} >
                                                <LocalIcon />
                                                <span>Ver no mapa</span>
                                             </Options>

                                             <Options onClick={() => handleToggleModalPlace(place)} >
                                                <EditIcon />
                                                <span>Editar observações</span>
                                             </Options>

                                             <Options onClick={() => handleDeletePlace(place.id)} >
                                                <TrashIcon />
                                                <span>Excluir lugar</span>
                                             </Options>
                                             
                                          </MenuOptions>
                                       )}
                                    </AnimatePresence>
                                 </div>
                              </HeaderPlace>
                              
                              <Obs>{place.obs}</Obs>
                           </Section>
                        </Place>
                     ))}
                  </PlaceList>
               </RoadmapWrapper> 

               <MapWrapper>
                  <Map
                     handleAddPlace={handleAddPlace}
                     lat={thisPlace.lat}
                     lng={thisPlace.lng}
                  />
               </MapWrapper>
               
               <AnimatePresence>
                  {modalRoadmap && (
                     <Modal title='Editar roteiro'>
                        <CloseIcon onClick={handleToggleModalRoadmap} />

                        <RoadmapForm onSubmit={handleEditRoadmap}>
                           <label>
                              <p>Título do roteiro <small>(obrigatório)</small></p>
                              <input
                                 defaultValue={title}
                                 onChange={(e) => setTitle(e.target.value)}
                                 type='text'
                              />
                           </label>

                           <label>
                              <p>Descrição</p>
                              <textarea
                                 defaultValue={desc}
                                 onChange={(e) => setDesc(e.target.value)}
                                 rows="5"
                              />
                           </label>

                           <Button type='submit' span='Salvar' disabled={title.trim().length !== 0 ? false : true} />
                        </RoadmapForm>
                     </Modal>
                  )}
               </AnimatePresence>

               <AnimatePresence>
                  {modalPlace && (
                     <Modal title={`Observações - ${thisPlace.place}`}>
                        <CloseIcon onClick={() => setModalPlace(false)} />

                        <RoadmapForm onSubmit={handleEditPlace}>
                           {/* <label>
                              <p>Nome do lugar <small>(obrigatório)</small></p>
                              <input
                                 type='text'
                                 defaultValue={place}
                                 onChange={(e) => setPlace(e.target.value)}
                              />
                           </label> */}

                           <label>
                              <p>Obervações</p>
                              <textarea
                                 defaultValue={obs}
                                 onChange={(e) => setObs(e.target.value)}
                                 rows="12"
                              />
                           </label>

                           <Button type='submit' span='Salvar'  disabled={place.trim().length !== 0 ? false : true} />
                        </RoadmapForm>
                     </Modal>
                  )}
               </AnimatePresence>

               <AnimatePresence>
                  {modalWeather && (
                     <Modal title={`Clima - ${thisPlace.place}`} >
                        <CloseIcon onClick={() => setModalWeather(false)} />

                        <Weather place={place} />                       
                     </Modal>
                  )}
               </AnimatePresence>
            </Content>
         </Wrapper>
      </Container>
   );
}

export default Roadmap;