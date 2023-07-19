import React, { useEffect, useState } from 'react';
import styles from '@/styles/ModalOpenDoc.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import { IconType } from 'react-icons';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { Action } from '@/components/actions';
import { BiCalendar } from 'react-icons/bi';
import ComponenteCalendar from '@/components/calendar/componenteCalendar/Calendar';

interface ModalValidationProps {
  unitsKey: string;
  urlDoc: string;
  onCancel: () => void;
  unitsData: { id: string; doc: string }[];
}

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: '1.1rem' } });
}
const ModalOpenDocLP: React.FC<ModalValidationProps> = ({
  urlDoc,
  onCancel,
  unitsKey,
}) => {
  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
  const [formData, setFormData] = useState<string>(urlDoc);
  const [units, setUnits] = useState<any[]>([]);
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [showCalendar, setShowCalendar] = useState('');

  const handleThumbsUpClick = () => {
    setThumbsUpClicked(!thumbsUpClicked);
    setThumbsDownClicked(false);
  };
  const handleClickOpenCalendar = () => {
    setShowCalendar(unitsKey);
  };
  const handleThumbsDownClick = () => {
    setThumbsDownClicked(!thumbsDownClicked);
    setThumbsUpClicked(false);
  };

  const handlePrevUnit = () => {
    if (currentUnitIndex > 0) {
      setCurrentUnitIndex(currentUnitIndex - 1);
      const unitData = units[currentUnitIndex - 1];
      if (unitData) {
        setFormData(unitData.doc);
      }
    }
  };

  const handleNextUnit = () => {
    if (currentUnitIndex < units.length - 1) {
      setCurrentUnitIndex(currentUnitIndex + 1);
      const unitData = units[currentUnitIndex + 1];
      if (unitData) {
        setFormData(unitData.doc);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const unitsData = await backendApi.getUnits();
        setUnits(unitsData);
        const unitData = unitsData.find((unit) => unit.id === unitsKey);
        if (unitData) {
          setFormData(unitData.doc);
        }
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          throw error;
        } else {
          throw error;
        }
      } finally {
        setLoaded(true);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.background}>
      {showCalendar === unitsKey && (
        <ComponenteCalendar onClick={() => setShowCalendar('')} />
      )}
      <div className={styles.container}>
        <div className={styles.boxBtns}>
          <div className={styles.boxCalendarThumbs}>
            <Action
              icon={reactIcon(BiCalendar)}
              onClick={() => handleClickOpenCalendar()}
            />
            <div className={styles.thumbButtons}>
              <button
                className={`${styles.thumbButton} ${
                  thumbsUpClicked ? styles.thumbUpActive : ''
                }`}
                onClick={handleThumbsUpClick}
              >
                {reactIcon(FaThumbsUp)}
              </button>
              <button
                className={`${styles.thumbButton} ${
                  thumbsDownClicked ? styles.thumbDownActive : ''
                }`}
                onClick={handleThumbsDownClick}
              >
                {reactIcon(FaThumbsDown)}
              </button>
            </div>
          </div>
          <div className={styles.pagination}>
            <button onClick={handlePrevUnit}>{reactIcon(ImArrowLeft2)}</button>
            <button onClick={handleNextUnit}>{reactIcon(ImArrowRight2)}</button>
          </div>
          <button className={styles.btnClose} onClick={onCancel}>
            X
          </button>
        </div>
        <iframe src={formData} width="100%" height="93%" />
      </div>
    </div>
  );
};

export default ModalOpenDocLP;

//reactIcon(ImArrowLeft2)
