import React, { useState, ChangeEvent } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import styles from '@/styles/Calendar.module.css';
import { format } from 'path';

interface propsModalCalendar {
  onClick: VoidFunction;
}
const ComponenteCalendar: React.FC<propsModalCalendar> = (props) => {
  const [date, setDate] = useState<Date | Date[] | null>(new Date());

  const handleChange = (newDate: Date | Date[] | null) => {
    if (newDate !== null) {
      setDate(newDate);
    }
  };

  return (
    <div className={styles.backGroundCalendar}>
      <div className={styles.container}>
        <button className={styles.btnClose} onClick={props.onClick}>
          X
        </button>
        <h1>Meu Calendário</h1>

        <Calendar
          className={styles.calendarTileActive}
          value={date as any}
          onChange={handleChange as any}
        />
      </div>
    </div>
  );
};

export default ComponenteCalendar;
