import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const See = () => {
  const token = localStorage.getItem('token');
  const [working, setWorking] = useState('');
  axios
    .get(`https://chamchimayo.shop/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setWorking(res.data.getUser));

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-blue-400">
        <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center text-center>">
          <h3 className="text-3xl text-gray-800">회원정보 보기</h3>
          <form className="flex flex-col px-5 mt-5">
            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              ID : {working.userId}
            </p>
            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              닉네임 : {working.nickname}
            </p>
            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              성별 : {working.gender}
            </p>
            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              나이 : {working.age}
            </p>
            <button className="px-5 py-3 mt-3 text-lg text-white bg-blue-400 rounded-lg focus:outline-none hover:opacity-90">
              <Link to="/home">Home</Link>
            </button>
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

export default See;
