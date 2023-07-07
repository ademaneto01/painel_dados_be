import { PageContentContainerLessons } from '@/components/shared';
import { Dispatch, SetStateAction } from 'react';
import React from 'react';

import { PageEnumLessons } from '@/enums';

interface pageClassPlanProps {
  setPage: Dispatch<SetStateAction<PageEnumLessons>>;
}

export default function ClassPlans(props: pageClassPlanProps): JSX.Element {
  return (
    <>
      <h4>Class Plans</h4>
      <PageContentContainerLessons></PageContentContainerLessons>
    </>
  );
}
