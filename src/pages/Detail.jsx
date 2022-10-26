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
  const [myLocation, setMyLocation] = useState({
    lat: 37.4979517,
    lng: 127.0276188,
  });

  //   $(document).ready(async function () {
  // let XY = await getLocation();

  // $.ajax({
  // url: "/pharmacyList",
  // type: "GET",
  // cache: false,
  // dataType: "json",
  // data: {
  // Q0: sido,
  // Q1: gugun,
  // QT: "1~8",
  // QN: "",
  // ORD: "",
  // pageNo: "1",
  // numOfRows: "1000",}

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
      setMyLocation({ lat: 37.4979517, lng: 127.0276188 });
    }
  }, []);
  console.log(
    'myLocation.lat',
    myLocation.lat,
    'myLocation.lng',
    myLocation.lng
  );

  useEffect(() => {
    const { naver } = window;
    async function reverseGeo() {
      await naver.maps.Service.reverseGeocode(
        {
          location: new naver.maps.LatLng(myLocation.lat, myLocation.lng),
        },
        function (status, response) {
          let result = response.result;
          let items = result.items;
          let sido_arr = items[0].addrdetail.sido.split(' '); // 시도
          let gugun_arr = items[0].addrdetail.sigugun.split(' '); // 시구군
          let sido = undefined;
          let gugun = undefined;
          if (sido_arr.length == 1) {
            console.log('here comes');
            sido = sido_arr[0];
            gugun = gugun_arr[0];
            console.log(sido, gugun);
          } else if (sido_arr.length > 1) {
            console.log('here!!!!!!!!!!!!');
            sido = gugun_arr[0];
            gugun = gugun_arr[1];
            console.log(sido, gugun);
          }

          if (status === naver.maps.Service.Status.ERROR) {
            alert('서버에 오류가 있어요. 다음에 다시 시도해주세요😰');
          }
        }
      );
    }
    reverseGeo();
  }, [myLocation]);

  return (
    <div>
      <div className="w-full max-w-lg m-auto bg-slate-500">
        <div className="sticky ">
          <FiChevronLeft size="30" />
        </div>
        <section>
          <h1 className="text-2xl font-bold mb-4 mt-2.5">약국이름</h1>
          <NaverMapAPI />
          <div className="mb-1 text-sm">경기도 안양시리야 응답해</div>
        </section>
        {test}
      </div>
    </div>
  );
};

export default Detail;
