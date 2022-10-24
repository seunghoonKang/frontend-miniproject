import React, { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import axios from 'axios';

function Home() {
  axios.get('http://localhost:3001/items').then((res) => {
    console.log(res.data.item);
    localStorage.setItem('token', res.data.item);
  });

  function onGeoOkay(position) {
    console.log(position);
  }

  function onGeoError() {
    alert("I can't find you. no weather for you.");
  }

  navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);

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
