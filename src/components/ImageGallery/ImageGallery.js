import styles from '../ImageGallery/imageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={styles.ImageGallery}>{children}</ul>;
};

export default ImageGallery;


// // Модули
// import React from 'react';
// import PropTypes from 'prop-types';

// // Компоненты
// import ImageGalleryItem from '../ImageGalleryItem';

// // Стили
// import styles from '../ImageGallery/imageGallery.module.css';

// const ImageGallery = ({ hits, onClick }) => (
//   <ul className={styles.ImageGallery} onClick={onClick}>
//     {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
//       <ImageGalleryItem
//         key={id}
//         webformatURL={webformatURL}
//         tags={tags}
//         largeImageURL={largeImageURL}
//       />
//     ))}
//   </ul>
// );

// ImageGallery.propTypes = {
//   hits: PropTypes.array.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

// export default ImageGallery;
