import styles from '../ImageGalleryItem/imageGalleryItem.module.css';
const ImageGalleryItem = ({ hitsId, srcWebformat, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={onClick}>
      <img src={srcWebformat} alt="" className={styles.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;


// // Модули
// import React from 'react';
// import PropTypes from 'prop-types';

// // Стили
// import styles from '../ImageGalleryItem/imageGalleryItem.module.css';

// const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => (
//   <li className={styles.ImageGalleryItem}>
//     <img src={webformatURL} alt={tags} data-url={largeImageURL} />
//   </li>
// );

// ImageGalleryItem.propTypes = {
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };

// export default ImageGalleryItem;
