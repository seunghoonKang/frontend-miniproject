import React, { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import axios from 'axios';

function Home() {
  axios.get('https://chamchimayo.shop/pharmacyList').then((res) => {
    console.log(res.data.items.item);
    localStorage.setItem('token', res.data.items.item);
  });

  const [myLocation, setMyLocation] = useState('');

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

  // navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);

  // $(position).ready(async function () {
  //     let XY = await getLocation();

  //     await naver.maps.Service.reverseGeocode(
  //     {
  //     location: new naver.maps.LatLng(XY.lat, XY.lng),
  //     },
  //     function (status, response) {
  //     let result = response.result;
  //     let items = result.items;

  //   let sido_arr = items[0].addrdetail.sido.split(" "); // 시도
  //   let gugun_arr = items[0].addrdetail.sigugun.split(" "); // 시구군

  //   if (sido_arr.length == 1) {
  //   console.log("here comes");
  //   sido = sido_arr[0];
  //   gugun = gugun_arr[0];
  //   } else if (sido_arr.length > 1) {
  //   console.log("here!!!!!!!!!!!!");
  //   sido = gugun_arr[0];
  //   gugun = gugun_arr[1];
  //   }

  //   $.ajax({
  //   url: "/pharmacyList",
  //   type: "GET",
  //   cache: false,
  //   dataType: "json",
  //   data: {
  //   Q0: sido,
  //   Q1: gugun,
  //   QT: "1~8",
  //   QN: "",
  //   ORD: "",
  //   pageNo: "1",
  //   numOfRows: "1000",

  return (
    <div>
      <header className="w-[99%] h-14 m-1.5 border-solid border-[1px] rounded-md border-gray-400 ">
        <div className="flex px-10">
          <div className="flex-auto py-4 text-xl text-blue-400">
            <AiFillHome />
          </div>

          <h1 className="flex-auto py-3 text-xl font-bold text-right text-blue-400">
            주말약국
          </h1>
        </div>
      </header>
      <div className="flex items-center justify-center">
        <div>
          <h1>내 주변 약국</h1>
          <div>
            <p>약국 이름</p>
            <p>영업중인지 아닌지?</p>
            <p>거리?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// $(document).ready(async function () {
//   let XY = await getLocation();

//   await naver.maps.Service.reverseGeocode(
//   {
//   location: new naver.maps.LatLng(XY.lat, XY.lng),
//   },
//   function (status, response) {
//   let result = response.result;
//   let items = result.items;

//   let sido_arr = items[0].addrdetail.sido.split(" "); // 시도
//   let gugun_arr = items[0].addrdetail.sigugun.split(" "); // 시구군

//   if (sido_arr.length == 1) {
//   console.log("here comes");
//   sido = sido_arr[0];
//   gugun = gugun_arr[0];
//   } else if (sido_arr.length > 1) {
//   console.log("here!!!!!!!!!!!!");
//   sido = gugun_arr[0];
//   gugun = gugun_arr[1];
//   }

//   $.ajax({
//   url: "/pharmacyList",
//   type: "GET",
//   cache: false,
//   dataType: "json",
//   data: {
//   Q0: sido,
//   Q1: gugun,
//   QT: "1~8",
//   QN: "",
//   ORD: "",
//   pageNo: "1",
//   numOfRows: "1000",
