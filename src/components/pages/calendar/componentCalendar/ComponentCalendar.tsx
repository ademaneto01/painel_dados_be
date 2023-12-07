import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '@/styles/Calendar.module.css';

interface propsModalCalendar {
  onChange: (newDate: Date | Date[] | null) => void;
  setYearObservation: (newDate: Date | Date[] | null) => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ComponenteCalendar: React.FC<propsModalCalendar> = ({
  onChange,
  setYearObservation,
}) => {
  const [value, setValue] = useState<Value>(new Date());

  const handleChange = (newDate: Date | Date[] | null) => {
    onChange(newDate);
    setYearObservation(newDate);
  };

  return (
    <div className={styles.backGroundCalendar}>
      <div className={styles.container}>
        <Calendar onChange={handleChange as any} value={value} />
      </div>
    </div>
  );
};

export default ComponenteCalendar;
