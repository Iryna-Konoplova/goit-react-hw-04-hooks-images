// Модули
// import React, { Component } from 'react';
import { useState, useEffect } from 'react';

// Компоненты
import axios from 'axios';
// import * as newsApi from './services/news-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import GalleryLoader from './components/Loader';

// Стили
import styles from './App.module.css';



axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '21824668-10aeb8c8af54ec25684dd6884&';

const fetchHits = ({ searchQuery = '', currentPage = 1 }) =>
  axios
    .get(
      `?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);




export default function App() {

  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchHits({ searchQuery: query, currentPage }).then(
      responseHits => {
        setHits(prevHits => [...prevHits, responseHits]);
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
      })
      .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
  }, [query, currentPage]);


  
  const onChangeQuery = query => {
    setQuery(query);
    setCurrentPage(1);
    setHits([]);
    setError(null)
  };

  const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

  return (
   
    <div className={styles.Container}>
      {error && <h1>Ошибка</h1>}

      <Searchbar onSubmit={onChangeQuery} />
      
      <ImageGallery hits={hits} />
      
      {isLoading && <GalleryLoader />}

      {shouldRenderLoadMoreButton && <Button onClick={this.fetchHits} />}

        {/* <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery hits={hits} onClick={this.handleImageClick} />

        {isLoading && <GalleryLoader />}

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchHits} />}

        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
            <img src={url} alt={tag} />
          </Modal>
        )} */}
      </div>
    );

}

// class App extends Component {
//   state = {
//     hits: [],
//     currentPage: 1,
//     currentPageImages: [],
//     searchQuery: '',
//     isLoading: false,
//     error: null,
//     showModal: false,
//     url: '',
//     tag: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchHits();
//     }
//   }

//   onChangeQuery = query => {
//     this.setState({
//       searchQuery: query,
//       currentPage: 1,
//       hits: [],
//       error: null,
//       url: '',
//       tag: '',
//     });
//   };

//   fetchHits = () => {
//     const { searchQuery, currentPage } = this.state;
//     const options = { searchQuery, currentPage };
//     this.setState({ isLoading: true });
//     newsApi
//       .fetchHits(options)
//       .then(hits => {
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...hits],
//           currentPage: prevState.currentPage + 1,
//           currentPageImages: [...hits],
//         }));
//         if (hits.length === 0) {
//           this.setState({
//             error: 'Nothing was find by your query. Try again.',
//           });
//         }
//       })
//       .then(() => {
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   fetchHits = () => {
//     const { searchQuery, currentPage } = this.state;
//     const options = { searchQuery, currentPage };

//     this.setState({ isLoading: true });

//     newsApi
//       .fetchHits(options)
//       .then(hits => {
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...hits],
//           currentPage: prevState.currentPage + 1,
//         }));
//         this.scrollDown();
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   scrollDown = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollTop + window.innerHeight,
//       behavior: 'smooth',
//     });
//   };

//   handleImageClick = ({ target }) => {
//     if (target.nodeName !== 'IMG') {
//       return;
//     }
//     const { url } = target.dataset;
//     const tag = target.alt;
//     this.setState({
//       url,
//       tag,
//     });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { hits, isLoading, showModal, url, tag } = this.state;
//     const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

//     return (
//       <div className={styles.Container}>
//         <Searchbar onSubmit={this.onChangeQuery} />

//         <ImageGallery hits={hits} onClick={this.handleImageClick} />

//         {isLoading && <GalleryLoader />}

//         {shouldRenderLoadMoreButton && <Button onClick={this.fetchHits} />}

//         {showModal && (
//           <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
//             <img src={url} alt={tag} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
