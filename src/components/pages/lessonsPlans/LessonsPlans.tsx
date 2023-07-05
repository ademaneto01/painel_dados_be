import Lessons from './lessons/Lessons';
import styles from '@/styles/CardLessons.module.css';
export default function LessonsPlans() {
  return (
    <div className={styles.pageContainer}>
      <Lessons />
    </div>
  );
}
