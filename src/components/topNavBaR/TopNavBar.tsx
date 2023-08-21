import Image from 'next/image';
import styles from '@/styles/TopNavBar.module.css';
import { TfiMenu } from 'react-icons/tfi';
import { useState, useEffect } from 'react';

interface TopNavBarProps {
  toggleSideNavBar: VoidFunction;
}

export default function TopNavBar(props: TopNavBarProps) {
  const [nome, setNome] = useState('');
  const [escola, setEscola] = useState('');

  useEffect(() => {
    const nomeStorage = localStorage.getItem('userNome');
    const escolaStorage = localStorage.getItem('escola');
    setNome(nomeStorage || '');
    setEscola(escolaStorage || '');
  }, []);

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

      <a className={styles.user}>{`${nome} - ${escola}`}</a>
    </div>
  );
}
