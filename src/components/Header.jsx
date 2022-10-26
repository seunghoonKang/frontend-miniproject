import React, { useState, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loginState, setLoginState] = useState(false);
  const [nickName, setNickname] = useState('00님');
  useEffect(() => {
    if (token) {
      setLoginState(true);
      axios
        .get(`https://chamchimayo.shop/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setNickname(res.data.getUser.nickname));
    }
  }, []);

  const loginHandler = () => {
    navigate('/');
  };

  const logoutHandler = () => {
    localStorage.clear();
    setLoginState(false);
  };

  const goToUserDetail = () => {
    navigate('/see');
  };

  return (
    <header className="w-[99%] h-14 m-1.5 border-solid border-[1px] rounded-md border-gray-400 ">
      <div className="flex px-10">
        <div className=" py-[15px] mr-3 text-xl text-blue-400">
          <button onClick={() => navigate('/home')}>
            <AiFillHome />
          </button>
        </div>
        <h1 className="flex-auto py-3 text-xl font-bold  text-blue-400">
          주말약국
        </h1>
        {loginState ? (
          <div className=" py-4 text-ml font-bold flex">
            <div className=" mr-10">
              <span className="text-blue-400">{nickName}님</span>, 반갑습니다 😎{' '}
            </div>
            <div onClick={goToUserDetail} className="cursor-pointer mr-10">
              회원 정보
            </div>
            <div onClick={logoutHandler} className="cursor-pointer">
              로그아웃
            </div>
          </div>
        ) : (
          <div
            className=" py-4 text-ml font-bold cursor-pointer"
            onClick={loginHandler}
          >
            로그인
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
