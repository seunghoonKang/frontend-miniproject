import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

function TextInput() {
  const [text, setText] = useRecoilState(textState); //textState는 atom인데 atom을 구독할거야, useState마냥 text, setText야~_
  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

function Home() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}
// const Home = () => {

//   return <div className=" w-52 h-52 bg-slate-600 ">Home</div>;
// };

export default Home;
