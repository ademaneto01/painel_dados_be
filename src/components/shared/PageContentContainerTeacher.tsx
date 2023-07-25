import styles from '@/styles/ContainerTeachers.module.css';
import sharedStyles from '@/styles/Shared.module.css';
import { PropsWithChildren } from 'react';

export default function PageContentContainerTeacher(
  props: PropsWithChildren,
): JSX.Element {
  const className = [
    styles.pageContentContainer,
    sharedStyles.shadowBorder,
  ].join(' ');
  return <div className={className}>{props.children}</div>;
}
