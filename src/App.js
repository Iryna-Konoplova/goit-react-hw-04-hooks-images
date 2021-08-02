// Модули
// import React, { Component } from 'react';
import { useState, useEffect } from 'react';

// Компоненты
import api from "./services/news-api";
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem'
import Button from './components/Button';
import Modal from './components/Modal';
import GalleryLoader from './components/Loader';

// Стили
import styles from './App.module.css';


export default function App() {

  const [hits, setHits] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [largeImageURL, setLargeImageURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchHits();
  }, [searchQuery]);

    useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [hits]);

    const  onChangeQuery = query => {
      setSearchQuery(query);
      setHits([]);
      setCurrentPage(1);
      setError(null)
  };

  const fetchHits = () => {
    const option = { searchQuery, currentPage };
    setIsLoading(true);
    api
      .fetchHits(option)
      .then(
        (picturesArr) => setHits([...hits, ...picturesArr]),
        setCurrentPage(currentPage + 1)
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const handleImageClick = (url) => {
    setLargeImageURL(url);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

      return (
      <div className={styles.Container}>
          <Searchbar onSubmit={onChangeQuery} />
          {error && <h1>Ошибка</h1>}

              <ImageGallery>
        {hits.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            srcWebformat={webformatURL}
            pictureId={id}
            onClick={() => handleImageClick(largeImageURL)}
          />
        ))}
      </ImageGallery>  

           {/* <ImageGallery hits={hits} onClick={handleImageClick(largeImageURL)} /> */}
        {/* <ImageGallery hits={hits} onClick={this.handleImageClick} /> */}

        {isLoading && <GalleryLoader />}

        {shouldRenderLoadMoreButton && <Button onClick={fetchHits} />}

        {/* {isModalOpen && (
          <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
            <img src={url} alt={tag} />
          </Modal>
          )} */}
                {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
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
