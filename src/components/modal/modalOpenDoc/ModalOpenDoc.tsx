// import React from 'react';
// import styles from '@/styles/ModalOpenDoc.module.css';
// import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

// interface ModalValidationProps {
//   urlDoc?: string;
//   onCancel: () => void;
// }

// const ModalOpenDoc: React.FC<ModalValidationProps> = ({ urlDoc, onCancel }) => {
//   return (
//     <div className={styles.background}>
//       <div className={styles.container}>
//         <div className={styles.boxBtns}>
//           <div className={styles.thumbButtons}>
//             <button className={styles.thumbButton}>
//               <FaThumbsUp />
//             </button>
//             <button className={styles.thumbButton}>
//               <FaThumbsDown />
//             </button>
//           </div>
//           <button className={styles.btnClose} onClick={onCancel}>
//             X
//           </button>
//         </div>

//         <iframe src={urlDoc} width="100%" height="100%" title="Documento" />
//       </div>
//     </div>
//   );
// };

// export default ModalOpenDoc;

import React, { useState } from 'react';
import styles from '@/styles/ModalOpenDoc.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

interface ModalValidationProps {
  urlDoc?: string;
  onCancel: () => void;
}

const ModalOpenDoc: React.FC<ModalValidationProps> = ({ urlDoc, onCancel }) => {
  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);

  const handleThumbsUpClick = () => {
    setThumbsUpClicked(!thumbsUpClicked);
    setThumbsDownClicked(false);
  };

  const handleThumbsDownClick = () => {
    setThumbsDownClicked(!thumbsDownClicked);
    setThumbsUpClicked(false);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.boxBtns}>
          <div className={styles.thumbButtons}>
            <button
              className={`${styles.thumbButton} ${
                thumbsUpClicked ? styles.thumbUpActive : ''
              }`}
              onClick={handleThumbsUpClick}
            >
              <FaThumbsUp />
            </button>
            <button
              className={`${styles.thumbButton} ${
                thumbsDownClicked ? styles.thumbDownActive : ''
              }`}
              onClick={handleThumbsDownClick}
            >
              <FaThumbsDown />
            </button>
          </div>
          <button className={styles.btnClose} onClick={onCancel}>
            X
          </button>
        </div>
        <iframe src={urlDoc} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default ModalOpenDoc;
