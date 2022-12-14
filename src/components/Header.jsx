import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoImage from '../img/logo.png';
import { __getUserInfo } from '../store/modules/hoonSlice';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loginState, setLoginState] = useState(false);
  const dispatch = useDispatch();

  const getUser = useSelector((state) => state.hoon.user);

  useEffect(() => {
    if (token) {
      setLoginState(true);
      dispatch(__getUserInfo());
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
    navigate(`/see/${getUser.userNum}`);
  };

  return (
    <header className=" w-full max-w-full ">
      <div className="flex justify-around border-solid border-b-[2px] flex-wrap ">
        <div className="flex py-[15px]">
          <button onClick={() => navigate('/home')}>
            <img src={logoImage} className=" max-w-[30%]" />
          </button>
          <div>
            <h1 className=" py-8 text-4xl font-bold text-red-400">약꾹루트</h1>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {loginState ? (
            <div className=" py-8 text-ml font-bold flex flex-wrap">
              <div className=" mr-10">
                <span className=" text-rose-300">{getUser.nickname}님</span>,
                반갑습니다 😎{' '}
              </div>
              <div
                onClick={goToUserDetail}
                className="cursor-pointer mr-10 hover:text-rose-400 transition-all"
              >
                회원 정보
              </div>
              <div
                onClick={logoutHandler}
                className="cursor-pointer hover:text-rose-400 transition-all"
              >
                로그아웃
              </div>
            </div>
          ) : (
            <div
              className=" pr-4 py-4 text-ml font-bold cursor-pointer hover:text-rose-400 transition-all"
              onClick={loginHandler}
            >
              로그인
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
