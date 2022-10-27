import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteSeung } from '../store/modules/seungSlice';
import { __modifyUserInfo, __getUserInfo } from '../store/modules/hoonSlice';
import { useNavigate } from 'react-router-dom';

const See = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modifyNickName, setModifyNickName] = useState('');
  const nicknameRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = useSelector((state) => state.hoon.user);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    setModifyNickName(getUser.nickname);
  }, [getUser]);

  useEffect(() => {
    if (nicknameRef.current) {
      const end = nicknameRef.current.value.length;
      nicknameRef.current.setSelectionRange(end, end);
      nicknameRef.current.focus();
    }
  }, [isEdit]);

  const onEditBtn = () => {
    dispatch(__deleteSeung([getUser]));
    setIsEdit(true);
  };

  const onCancleBtn = () => {
    setIsEdit(false);
    setModifyNickName(getUser.nickname);
  };

  const onCompleteBtn = () => {
    dispatch(
      __modifyUserInfo({
        ...getUser,
        nickname: modifyNickName,
      })
    );
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
              ID : {getUser.userId}
            </p>
            {!isEdit ? (
              <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
                닉네임 : {getUser.nickname}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  name="modifyNickName"
                  ref={nicknameRef}
                  value={modifyNickName}
                  maxLength="20"
                  onChange={(e) => {
                    setModifyNickName(e.target.value);
                  }}
                  className="px-5 py-3 mb-3 text-center border-2 rounded-lg shadow-inner bg-violet-500 focus:outline-none focus:border-opacity-50 focus:border-violet-100 text-stone-200"
                ></input>
                <p className="mb-3 text-xs italic text-left text-violet-500">
                  최대 20자까지 가능합니다
                </p>
              </>
            )}

            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              성별 : {getUser.gender}
            </p>
            <p className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600">
              나이 : {getUser.age}
            </p>
          </form>
          {!isEdit ? (
            <>
              <button
                onClick={() => dispatch(__deleteSeung(getUser))}
                className="py-3 mt-3 mr-5 text-lg text-white rounded-lg bg-rose-400 px-7 focus:outline-none hover:opacity-90"
              >
                회원 탈퇴
              </button>
              <button
                onClick={onEditBtn}
                className="px-3 py-3 mt-3 ml-5 text-lg text-white rounded-lg bg-sky-400 focus:outline-none hover:opacity-90"
              >
                닉네임 바꾸기
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onCancleBtn}
                className="py-3 mt-3 mr-5 text-lg text-white bg-blue-400 rounded-lg px-7 focus:outline-none hover:opacity-90"
              >
                뒤로 가기
              </button>
              <button
                onClick={onCompleteBtn}
                className="py-3 mt-3 ml-5 text-lg text-white rounded-lg bg-rose-400 px-7 focus:outline-none hover:opacity-90"
              >
                수정 완료
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
