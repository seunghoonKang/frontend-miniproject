import React from 'react';
import Spinner from '../img/Spinner.gif';

const Loading = () => {
  return (
    <div className=" w-screen h-screen top-0 left-0 bg-[#ffffffb7] z-40 flex flex-col items-center justify-center">
      <img src={Spinner} width="5%" />
    </div>
  );
};

export default Loading;
