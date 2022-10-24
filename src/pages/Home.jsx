import React from 'react';
import { AiFillHome } from 'react-icons/ai';
// import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

function Home() {
  return (
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
  );
}

export default Home;

// const textState = atom({
//   key: 'textState',
//   default: '',
// });

// function CharacterCount() {
//   const count = useRecoilValue(charCountState);

//   return <>Character Count: {count}</>;
// }

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

// const charCountState = selector({
//   key: 'charCountState',
//   get: ({ get }) => {
//     const text = get(textState);
//     return text.length;
//   },
// });

// function Home() {
//   return (
//     <div>
//       <TextInput />
//       <CharacterCount />
//     </div>
//   );
// }

// export default Home;
