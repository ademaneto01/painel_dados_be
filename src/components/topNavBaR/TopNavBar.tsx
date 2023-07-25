import Image from 'next/image';
import styles from '@/styles/TopNavBar.module.css';
import { TfiMenu } from 'react-icons/tfi';
import { HiChevronDown } from 'react-icons/hi';

interface TopNavBarProps {
  toggleSideNavBar: VoidFunction;
}

export default function TopNavBar(props: TopNavBarProps) {
  return (
    <div className={styles.topNavBar}>
      <a className={styles.toogleTopNav} onClick={props.toggleSideNavBar}>
        <TfiMenu size="1.1em" />
      </a>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/beyond_by_be.png"
          alt="Beyond by Be"
          priority={true}
          width={120}
          height={28}
        />
      </div>

      <div className={styles.spacer} />

      <a className={styles.user}>
        Ademar - BeEducation
        <HiChevronDown />
      </a>
    </div>
  );
}
