import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { pharmacyWorking } from '../recoil/atom';

const WorkingDay = () => {
  const pharmacyWK = useRecoilValue(pharmacyWorking);
  console.log(pharmacyWK);

  return <div>workingDay</div>;
};

export default WorkingDay;
