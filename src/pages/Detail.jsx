import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, selector } from 'recoil';
import { loginState } from '../recoil/atom';
import { FiChevronLeft } from 'react-icons/fi';
import Home from './Home';
import NaverMapAPI from '../components/NaverMap';

const Detail = () => {
  const { id } = useParams();
  const [myLocation, setMyLocation] = useState('');

  //약국 한 개 가져오기
  // const pharmacy = axios
  //   .get(`http://tunamayo.shop/pharmacyList?lat=${위도}&lng=${경도}`)
  //   .then((res) => console.log(res));
  // console.log(pharmacy);
  const [test, setTest] = useRecoilState(loginState);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    function success(pos) {
      let crd = pos.coords;
      setMyLocation({
        lat: crd.latitude,
        lng: crd.longitude,
      });
    }
    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);
  console.log(myLocation);
  return (
    <div>
      <Home />
      <div className="w-full max-w-lg bg-slate-500 m-auto">
        <div className=" sticky">
          <FiChevronLeft size="30" />
        </div>
        <section>
          <h1 className="text-2xl font-bold mb-4 mt-2.5">dutyName</h1>
          <NaverMapAPI />
        </section>
        {test}
      </div>
    </div>
  );
};

export default Detail;
