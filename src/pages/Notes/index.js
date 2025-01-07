import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

import { Container, SearchForm, LoadWrapper, NoteList, Note, NoteContent, NoteFooter, NoteForm, PlusIcon, NotesOffIcon, CloseIcon, EditIcon, TrashIcon } from './styles';
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

function Notes() {
   const { user } = useContext(AuthContext);

   const [notes, setNotes] = useState([]);
   const [loading, setLoading] = useState(true);

   const [thisNote, setThisNote] = useState({});
   const [title, setTitle] = useState('');
   const [text, setText] = useState('');

   const [modalNote, setModalNote] = useState(false);
   const [modalEditNote, setModalEditNote] = useState(false);

   const [search, setSearch] = useState('');
   const lowerSearch = search.toLowerCase();
   const notesFiltereds = notes.filter((note) => note.text.toLowerCase().includes(lowerSearch.trim()))

   const notelist = {
      from: {opacity: 0},
      to: {opacity: 1}
   }

   const noteitem = {
      from: {opacity: 0 },
      to: {opacity: 1, transition: {duration: .05}}
   };
   
   useEffect(() => {
      loadNotes();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   async function loadNotes() {
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('notes').orderBy('created', 'desc')
      .get()
      .then((snapshot) => {
         let list = [];

         snapshot.forEach((doc) => {
            list.push({
               id: doc.id,
               title: doc.data().title,
               text: doc.data().text,
               created: doc.data().created,
               createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
            })
         });

         setNotes(list);
      })
      .catch((err) => {
         console.log(err);
      })

      setLoading(false);
   }


   async function handleAddNote(e) {
      e.preventDefault();

      await firebase.firestore().collection('users')
      .doc(user.uid).collection('notes')
      .add({
         title: title.trim(),
         text: text.trim(),
         created: new Date(),
      })
      .then(() => {
         toast('Anotação criada.', {
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

      setModalNote(false);
      setTitle('');
      setText('');

      loadNotes();
	}


   async function handleDeleteNote(id) {
      await firebase.firestore().collection('users')
      .doc(user.uid).collection('notes').doc(id)
      .delete()
      .then(() => {
         toast('Anotação excluída.', {
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

      loadNotes();
	}


   async function handleAddEditNote(e) {
      e.preventDefault();

      await firebase.firestore().collection('users')
      .doc(user.uid).collection('notes').doc(thisNote.id)
      .update({
         title: title.trim(),
         text: text.trim()
      })
      .then(() => {
         toast('Anotação editada.', {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            pauseOnHover: true,
            className: 'toast-edit',
         });
      })
      .catch((err) => {
         console.log(err)
      })

      setModalEditNote(false);
      loadNotes();

   }


   function handleToggleModalNote(e) {
      e.preventDefault();

      setModalNote(!modalNote);
      setTitle('');
      setText('');
   }

   function handleToggleModalEditNote(note) {
      setModalEditNote(!modalEditNote);
      
      setThisNote(note);
      setTitle(note.title);
      setText(note.text);
   }

   return (
      <Container>
         <Navbar />

         <Wrapper>
            <Title title='Anotações' />

            <SearchForm onSubmit={handleToggleModalNote}>
               <SearchBar>
                  <input
                     type='text'
                     defaultValue={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Pesquisar anotação'
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

            {(notes.length === 0 && !loading) && (
               <EmptyWrapper>
                  <div>
                     <NotesOffIcon />
                  </div>

                  <p>Nenhuma anotação criada.</p>
                  <span>Crie uma nova anotação e salve suas notas.</span>
               </EmptyWrapper>
            )}

            {notesFiltereds.length === 0 && notes.length !== 0 && (
               <EmptyWrapper>
               <p>Nenhuma anotação encontrada.</p>
               <span>Crie uma nova anotação ou faça outra busca.</span>
            </EmptyWrapper>
            )}

            <NoteList
               variants={notelist}
               initial='from'
               animate='to'
            >
               {notesFiltereds.length !== 0 && (
                  notesFiltereds.map((note, index) => (
                     <Note key={index} variants={noteitem}>
                        <NoteContent>
                           <div>
                              <p>{note.title}</p>
                              <span>{note.text}</span>
                           </div>
            
                           <NoteFooter>
                              <span>{note.createdFormated}</span>
                              <EditIcon onClick={() => handleToggleModalEditNote(note)} />
                              <TrashIcon onClick={() => handleDeleteNote(note.id)} />
                           </NoteFooter>
                        </NoteContent>
                     </Note>
                  ))
               )}
            </NoteList>

            <AnimatePresence>
               {modalNote && (
                  <Modal title='Nova anotação'>
                     <CloseIcon onClick={handleToggleModalNote} />

                     <NoteForm onSubmit={handleAddNote}>
                        <input
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder='Título da anotação'
                        />
                        
                        <hr />

                        <textarea
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                           placeholder='Digite uma anotação...'
                        />
                        
                        <Button type='submit' span='Salvar' disabled={title.trim().length !== 0 ? false : true} />
                     </NoteForm>
                  </Modal>
               )}
            </AnimatePresence>

            <AnimatePresence>
               {modalEditNote && (
                  <Modal title='Editar anotação'>
                     <CloseIcon onClick={handleToggleModalEditNote} />

                     <NoteForm onSubmit={handleAddEditNote}>
                        <input
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder='Título da anotação'
                        />
                        
                        <hr />

                        <textarea
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                           placeholder='Digite uma anotação...'
                        />
                        
                        <Button type='submit' span='Salvar' disabled={title ? false : true} />
                     </NoteForm>
                  </Modal>
               )}
            </AnimatePresence>
         </Wrapper>
      </Container>
   );
}

export default Notes;
