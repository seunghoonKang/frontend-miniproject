import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/atom';
import axios from 'axios'; // axios import 합니다.
// import {
//   // selector,
//   // useRecoilState,
//   // useRecoilValue,
// } from 'recoil';

const Login = () => {
  const idRef = useRef('');
  const pwRef = useRef('');

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
            <button
              onClick={(e) => {
                e.preventDefault();
                const login = {
                  userId: idRef.current.value,
                  password: pwRef.current.value,
                };
                axios.post('http://tunamayo.shop/users/login', login);
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

// function TextInput() {
//   const [text, setText] = useRecoilState(textState);

//   const onChange = (event) => {
//     setText(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={text} onChange={onChange} />
//       <br />
//       Echo: {text}
//     </div>
//   );
// }
// // textstate 아툼 키 = > text를 useRecoilState에 넣어줌으로서 찍힐떄마다 화면에 랜더링된다.

// const charCountState = selector({
//   key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const text = get(textState);

//     return text.length;
//   },
// });

// function CharacterCount() {
//   const count = useRecoilValue(charCountState);

//   return <>Character Count: {count}</>;
// }
