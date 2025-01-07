import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

import { Container, SearchForm, LoadWrapper, RoadMList, Roadmap, RoadmapContent, RoadmapFooter, RoadmapForm, PlusIcon, MapsOffIcon, CloseIcon, TrashIcon } from './styles';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import Navbar from '../../components/Navbar';
import Wrapper from '../../components/Wrapper';
import Title from '../../components/Title';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import EmptyWrapper from '../../components/WrapperEmpty';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

function Roadmaps() {
   const { user } = useContext(AuthContext);

   const [roadmaps, setRoadmaps] = useState([]);
   const [loading, setLoading] = useState(true);
   
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   
   const [modalRoadmap, setModalRoadmap] = useState(false);
   const [search, setSearch] = useState('');

   const lowerSearch = search.toLowerCase();
   const roadmapsFiltereds = roadmaps.filter((note) => note.title.toLowerCase().includes(lowerSearch.trim()))
   
   const roadlist = {
      from: {opacity: 0},
      to: {opacity: 1}
   }

   const roaditem = {
      from: {opacity: 0 },
      to: {opacity: 1, transition: {duration: .05}}
   };

   useEffect(() => {
      loadRoadmaps();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   async function loadRoadmaps() {
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps').orderBy('created', 'desc')
      .get()
      .then((snapshot) => {
         let list = [];

         snapshot.forEach((doc) => {
            list.push({
               id: doc.id,
               title: doc.data().title,
               desc: doc.data().desc,
               created: doc.data().created,
               createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
            })
         });

         setRoadmaps(list);
      })
      .catch((err) => {
         console.log(err);
      })

      setLoading(false);
   }


   async function handleAddRoadmap(e) {
      e.preventDefault();
      
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps')
      .add({
         title: title.trim(),
         desc: desc.trim(),
         created: new Date(),
      })
      .then(() => {
         toast('Roteiro criado.', {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            pauseOnHover: true,
            className: 'toast-success',
         });
      })
      .catch((err) => {
         console.log(err);
      })
      
      setModalRoadmap(false);
      setTitle('');
      setDesc('');
      
      loadRoadmaps();
   }


   async function handleDeleteRoadap(id) {
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('roadmaps').doc(id)
      .delete()
      .then(() => {
         toast('Roteiro excluído.', {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            pauseOnHover: true,
            className: 'toast-fail',
         });
      })
      .catch((err) => {
         console.log(err);
      })

      loadRoadmaps();
	};


   function handleToggleModalRoadmap(e) {
      e.preventDefault();

      setModalRoadmap(!modalRoadmap);
      setTitle('');
      setDesc('');
   }

   return (
      <Container>
         <Navbar />

         <Wrapper>
            <Title title='Roteiros' />

            <SearchForm onSubmit={handleToggleModalRoadmap}>
               <SearchBar>
                  <input
                     type='text'
                     defaultValue={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Pesquisar roteiro'
                  />
               </SearchBar>

               <Button type='submit' span='Criar'>
                  <PlusIcon />
               </Button>
            </SearchForm>

            {loading && (
               <LoadWrapper>
                  <Loading />
               </LoadWrapper>
            )}

            {(roadmaps.length === 0 && !loading) && (
               <EmptyWrapper>
                  <div>
                     <MapsOffIcon />
                  </div>

                  <p>Nenhum roteiro encontrado.</p>
                  <span>Salve os lugares que você gosta e organize seus planos.</span>
               </EmptyWrapper>
            )}

            
            {roadmapsFiltereds.length === 0 && roadmaps.length !== 0 && (
               <EmptyWrapper>
                  <p>Nenhum roteiro encontrado.</p>
                  <span>Crie um novo roteiro ou faça outra busca.</span>
               </EmptyWrapper>
            )}

            <RoadMList
               variants={roadlist}
               initial='from'
               animate='to'
            >
               {roadmapsFiltereds.length !== 0 && (
                  roadmapsFiltereds.map((roadmap, index) => (
                     <Roadmap
                        key={index}
                        variants={roaditem}
                        whileHover={{ scale: 1.01, transition: {duration: .2} }}
                     >
                        <Link to={`/roadmap/${roadmap.id}`} draggable='false'>
                           <RoadmapContent>
                              <div>
                                 <p>{roadmap.title}</p>
                                 <span>{roadmap.desc}</span>
                              </div>

                              <RoadmapFooter>
                                 <span>criado em: {roadmap.createdFormated}</span>
                              </RoadmapFooter>
                           </RoadmapContent>
                        </Link>
                        <TrashIcon
                           onClick={() => handleDeleteRoadap(roadmap.id)}
                        />
                     </Roadmap>
                  ))
               )}
            </RoadMList>

            <AnimatePresence>
               {modalRoadmap && (
                  <Modal title='Novo roteiro' >
                     <CloseIcon onClick={handleToggleModalRoadmap} />

                     <RoadmapForm onSubmit={handleAddRoadmap}>
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
                           />
                        </label>

                        <Button type='submit' span='Salvar' disabled={title.trim().length !== 0 ? false : true} />
                     </RoadmapForm>
                  </Modal>
               )}
            </AnimatePresence>
         </Wrapper>
      </Container>
   );
}

export default Roadmaps;