import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import connection from '../../../services/sqlConnection';
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
      connection.query(
         'SELECT * FROM Roteiro WHERE IdRoteiro = ? AND Usuario_idUsuario = ?',
         [id, user.uid],
         (err, results) => {
            if (err) {
               console.error('Erro ao carregar roteiro:', err);
               return;
            }

            const roadmap = results[0];
            let data = {
               id: id,
               title: roadmap.title,
               desc: roadmap.desc,
               createdFormated: format(new Date(roadmap.created), 'dd/MM/yyyy'),
            };

            setThisRoadmap(data);
         }
      );
   }

   async function handleEditRoadmap(e) {
      e.preventDefault();
      
      connection.query(
         'UPDATE Roteiro SET Titulo = ?, Descricao = ? WHERE IdRoteiro = ? AND Usuario_idUsuario = ?',
         [title.trim(), desc.trim(), id, user.uid],
         (err) => {
            if (err) {
               console.error('Erro ao editar roteiro:', err);
               return;
            }

            let data = {
               ...thisRoadmap,
               title: title.trim(),
               desc: desc.trim(),
            };

            setThisRoadmap(data);
         }
      );

      setModalRoadmap(false);
   }

   async function loadPlaces() {
      connection.query(
         'SELECT * FROM Lugar WHERE Roteiro_idRoteiro = ? AND Usuario_idUsuario = ? ORDER BY created DESC',
         [id, user.uid],
         (err, results) => {
            if (err) {
               console.error('Erro ao carregar lugares:', err);
               return;
            }

            const list = results.map((place) => ({
               id: place.id,
               place: place.place,
               complement: place.complement,
               lat: place.lat,
               lng: place.lng,
               obs: place.obs,
               created: place.created,
            }));

            setPlaces(list);
         }
      );
   }

   async function handleAddPlace(nameplace, observations) {
      connection.query(
         'INSERT INTO Lugar (Roteiro_idRoteiro, Usuario_idUsuario, NomeLugar, Observacao) VALUES (?, ?, ?, ?)',
         [id, user.uid, nameplace, observations],
         (err) => {
            if (err) {
               console.error('Erro ao adicionar lugar:', err);
               return;
            }

            let place = {
               place: nameplace,
               observations: observations,
            };

            handleShowInMap(place);
            console.log('Place saved successfully.');
         }
      );

      loadPlaces();
   }

   async function handleDeletePlace(pid) {
      connection.query(
         'DELETE FROM Lugar WHERE IdLugar = ? AND Roteiro_idRoteiro = ? AND Usuario_idUsuario = ?',
         [pid, id, user.uid],
         (err) => {
            if (err) {
               console.error('Erro ao excluir lugar:', err);
               return;
            }

            thisPlace.lat = null;
            thisPlace.lng = null;

            console.log('Place deleted.');
         }
      );

      setPlaceIsOpen(false);
      loadPlaces();
    }

   async function handleEditPlace(e) {
      e.preventDefault();
      
      connection.query(
         'UPDATE Lugar SET NomeLugar = ?, Observacao = ? WHERE IdLugar = ? AND Roteiro_idRoteiro = ? AND Usuario_idUsuario = ?',
         [place.trim(), obs.trim(), thisPlace.id, id, user.uid],
         (err) => {
            if (err) {
               console.error('Erro ao editar lugar:', err);
               return;
            }

            console.log('Place edited successfully');
         }
      );

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