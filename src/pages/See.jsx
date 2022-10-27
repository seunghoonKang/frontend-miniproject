import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { __deleteSeung } from '../store/modules/seungSlice';

const See = () => {
  const token = localStorage.getItem('token');
  const [working, setWorking] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [modifyNickName, setModifyNickName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://chamchimayo.shop/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setWorking(res.data.getUser));
  }, []);

  useEffect(() => {
    setModifyNickName(working.nickname);
  }, [working]);

  const onEditBtn = () => {
    setIsEdit(true);
  };

  const onCancleBtn = () => {
    setIsEdit(false);
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen bg-rose-300">
        <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center text-center>">
          <h3 className="text-3xl text-gray-800">회원정보 보기</h3>
          <form className="flex flex-col px-5 mt-5">
            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              ID : {working.userId}
            </p>
            {!isEdit ? (
              <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
                닉네임 : {working.nickname}
              </p>
            ) : (
              <input
                type="text"
                name="modifyNickName"
                value={modifyNickName}
                onChange={(e) => {
                  setModifyNickName(e.target.value);
                }}
                className="px-5 py-3 mb-3 bg-rose-300 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-rose-600 text-center"
              ></input>
            )}

            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              성별 : {working.gender}
            </p>
            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              나이 : {working.age}
            </p>
          </form>
          {!isEdit ? (
            <>
              <button
                onClick={() => dispatch(__deleteSeung(working))}
                className="py-3 mt-3 mr-5 text-lg text-white rounded-lg bg-rose-400 px-7 focus:outline-none hover:opacity-90"
              >
                회원 탈퇴
              </button>
              <button
                onClick={onEditBtn}
                className="px-3 py-3 mt-3 ml-5 text-lg text-white rounded-lg bg-sky-400 focus:outline-none hover:opacity-90"
              >
                회원정보 수정
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onCancleBtn}
                className="py-3 mt-3 mr-5 text-lg text-white bg-blue-500 rounded-lg px-7 focus:outline-none hover:opacity-90"
              >
                취소
              </button>
              <button className="px-3 py-3 mt-3 ml-5 text-lg text-white bg-blue-500 rounded-lg focus:outline-none hover:opacity-90">
                수정완료
              </button>
            </>
          )}
        </div>
      </div>
      ;
    </div>
  );
};

export default See;
