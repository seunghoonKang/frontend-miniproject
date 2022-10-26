import React, { useRef } from 'react';
import axios from 'axios'; // axios import 합니다.
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const idRef = useRef('');
  const pwRef = useRef('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-blue-400">
        <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center text-center>">
          <h3 className="text-3xl text-gray-800">Log In</h3>
          <form className="flex flex-col px-5 mt-5">
            <input
              ref={idRef}
              placeholder="ID"
              className="px-5 py-3 mb-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600"
            />
            <input
              type="password"
              ref={pwRef}
              placeholder="PW "
              className="px-5 py-3 bg-gray-100 border-2 rounded-lg shadow-inner focus:outline-none focus:border-opacity-50 focus:border-green-600"
            />
            <div className="flex justify-center my-3">
              <div className="mx-3">
                <p className="container mx-auto">회원이 아니신가요?</p>
              </div>

              <div className="mx-3 text-blue-600">
                <button onClick={() => navigate('/register')}>
                  회원가입 하기
                </button>
              </div>
            </div>
            <button
              onClick={(e) => {
                if (idRef.current.value == '' || pwRef.current.value == '') {
                  alert('내용을 입력해 주세요');
                  return;
                }
                e.preventDefault();
                const login = {
                  userId: idRef.current.value,
                  password: pwRef.current.value,
                };

                axios
                  .post('https://chamchimayo.shop/users/login', login)
                  .then((res) => {
                    console.log(res.status);
                    localStorage.setItem('token', res.data.token);
                    if (res.status === 200) {
                      navigate('/home');
                    }
                  });
              }}
              className="px-5 py-3 mt-3 text-lg text-white bg-blue-400 rounded-lg focus:outline-none hover:opacity-90"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
