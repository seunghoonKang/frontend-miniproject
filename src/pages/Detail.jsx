import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, selector, useSetRecoilState } from 'recoil';
import { pharmacyWorking } from '../recoil/atom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import Home from './Home';
import NaverMapAPI from '../components/NaverMap';
import WorkingDay from '../components/WorkingDay';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [working, setWorking] = useState('');
  const setpharmacyWK = useSetRecoilState(pharmacyWorking);

  //약국 한 개 가져오기
  useEffect(() => {
    axios
      .get(`https://chamchimayo.shop/pharmacyList/C2109236`)
      .then((res) => setWorking(res.data.item));
    setpharmacyWK(working);
  }, []);
  //console.log(working);
  //const { dutyTime1c: 월요일 } = working;
  //console.log(pharmacyWk);
  //console.log(working.dutyTime1s, working.dutyTime1c);

  return (
    <div>
      <Home />
      <div className="w-full max-w-lg  m-auto ">
        <div className="px-5 py-3 pt-3 pr-5 bg-white sticky z-10 top-0">
          <BsFillArrowLeftSquareFill size="30" className=" ml-1" />
          <span className=" text-xs">뒤로가기</span>
        </div>
        <section className="p-5">
          <h1 className="text-2xl font-bold mb-4 mt-2.5">{working.dutyName}</h1>
          <NaverMapAPI />
          <div className="text-sm mb-1">{working.dutyAddr}</div>
        </section>
        <section className="p-5">
          <div>
            <button className=" border-solid border-b-2 border-black-100 pb-3">
              <span className="font-bold text-sm">약국정보</span>
            </button>
          </div>
        </section>
        <section className="p-5">
          <div className=" text-sm mt-1 mb-5">
            <h1 className="text-lg font-bold">영업 시간</h1>
          </div>
          <div>
            <div className="rounded-2xl p-4 w-full mb-4 bg-blue-400">
              <div className="text-sm font-bold mb-1 flex text-slate-50 ">
                화요일
              </div>
              <div className="text-base text-slate-50">09:00 ~ 20:00</div>
            </div>
          </div>
        </section>
        <WorkingDay />
        {/* {test} */}
      </div>
    </div>
  );
};

export default Detail;
