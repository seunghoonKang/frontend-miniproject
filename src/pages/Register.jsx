import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//아이디 중복 검사-
//비밀번호 reg, 비밀번호 재확인

const Register = () => {
  const navigate = useNavigate();
  const regId = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/; // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~20자리

  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자

  const [checkRegister, setCheckRegister] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const [errCheck, setErrCheck] = useState(null);
  const [userRegister, setUserRegister] = useState({
    userId: '',
    password: '',
    confirmPw: '',
    nickname: '',
    gender: '',
    age: '',
  });

  const checkDuplicate = (e) => {
    e.preventDefault();
    setCheckCount(() => checkCount + 1);
    axios
      .post('https://chamchimayo.shop/users/checkDuplicatedId', {
        userId: userRegister.userId,
      })
      .then((res) => alert(res.data.message))
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.errorMessage);
        }
      });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (checkCount === 0) {
      return alert('아이디 중복검사를 확인해주세요');
    } else {
      axios
        .post('https://chamchimayo.shop/users/signup', userRegister)
        .then((res) => {
          if (res.status === 201) {
            alert(res.data);
            navigate('/');
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.errorMessage);
          }
        });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-rose-200 ">
      <h1 className="mb-6 text-5xl font-bold text-rose-500 ">회원가입</h1>
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg bg-rose-200">
        {/* 아이디 */}
        {/* 서버에 동일한 아이디가 있는지 확인해야돼 */}
        <div className="flex flex-wrap justify-between mb-6 -mx-3">
          <div className="w-3/4 px-3 ">
            <label
              htmlFor="userId"
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            >
              아이디
            </label>
            <input
              onChange={onChangeHandler}
              value={userRegister.userId}
              minLength="5"
              maxLength="20"
              type="text"
              id="userId"
              name="userId"
              placeholder="아이디를 입력해주세요."
              required
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            ></input>
          </div>
          <div className="mt-6 mb-6 ml-0 mr-2 ">
            <button
              type="button"
              value={checkCount}
              onClick={checkDuplicate}
              className="shadow bg-rose-500 hover:bg-rose-400 focus:shadow-outline focus:outline-none text-white font-bold py-2.5 px-4 rounded"
            >
              중복검사
            </button>
          </div>
          <div className="ml-3">
            {userRegister.userId.length === 0 ? (
              <></>
            ) : !regId.test(userRegister.userId) ? (
              <p className="text-xs italic text-red-500">
                영문자로 시작하는 영문자 또는 숫자 6~20자
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            >
              비밀번호
            </label>
            <input
              onChange={onChangeHandler}
              value={userRegister.password}
              maxLength="12"
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              required
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            ></input>
            {userRegister.password.length > 11 ? (
              <p className="text-xs italic text-red-500">
                최대 12자까지 가능합니다.
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              htmlFor="confirmPw"
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            >
              비밀번호 확인
            </label>
            <input
              onChange={onChangeHandler}
              value={userRegister.confirmPw}
              maxLength="12"
              type="password"
              id="confirmPw"
              name="confirmPw"
              placeholder="비밀번호를 한번 더 확인해주세요."
              required
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            ></input>
            {userRegister.password !== userRegister.confirmPw &&
            userRegister.confirmPw.length >= 1 ? (
              <p className="text-xs italic text-red-500">
                동일한 비밀번호를 입력해주세요
              </p>
            ) : userRegister.confirmPw.trim() !== '' &&
              !regPassword.test(userRegister.password) ? (
              <p className="text-xs italic text-red-500">
                최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자가
                되어야 합니다.
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* 닉네임 */}
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              htmlFor="nickname"
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            >
              닉네임
            </label>
            <input
              onChange={onChangeHandler}
              value={userRegister.nickname}
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              required
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            ></input>
          </div>
        </div>

        {/* 성별 */}
        <div className="flex flex-row flex-wrap mb-2 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
            <label
              htmlFor="gender"
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            >
              성별
            </label>
            <div className="relative">
              <select
                onChange={onChangeHandler}
                id="gender"
                name="gender"
                required
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">선택</option>
                <option value="0">남</option>
                <option value="1">여</option>
              </select>
            </div>
          </div>

          {/* 나이 */}
          <div className="w-full px-3 mb-6 md:w-2/3 md:mb-0">
            <label
              htmlFor="age"
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            >
              나이
            </label>
            <input
              onChange={onChangeHandler}
              value={userRegister.age}
              type="number"
              id="age"
              name="age"
              placeholder="나이를 입력해주세요."
              required
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            ></input>
          </div>
        </div>

        <div className=" md:flex md:justify-center">
          <button
            className="px-4 py-2 font-bold text-white rounded shadow bg-rose-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none"
            disabled={checkRegister}
          >
            회원가입하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
