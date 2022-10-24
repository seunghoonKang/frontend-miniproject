import axios from 'axios';
import React from 'react';
import { useRecoilState, selector } from 'recoil';
import { loginState } from '../recoil/atom';

const Detail = () => {
  const pharmacy = axios
    .get('http://tunamayo.shop/pharmacyList')
    .then((res) => console.log(res));
  console.log(pharmacy);
  const [test, setTest] = useRecoilState(loginState);
  return <div>{test}</div>;
};

export default Detail;
