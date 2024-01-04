import React from 'react';
import styles from '@/styles/Tooltip.module.css';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

function Tooltip(props: TooltipProps) {
  const { text, children } = props;
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltiptext}>{text}</span>
    </div>
  );
}

export default Tooltip;
