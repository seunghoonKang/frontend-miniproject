import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-[99%] h-14 m-1.5 border-solid border-[1px] rounded-md border-gray-400 ">
      <div className="flex px-10">
        <div className="flex-auto py-4 text-xl text-blue-400">
          <button onClick={() => navigate('/home')}>
            <AiFillHome />
          </button>
        </div>
        <h1 className="flex-auto py-3 text-xl font-bold text-right text-blue-400">
          주말약국
        </h1>
      </div>
    </header>
  );
};

export default Header;
