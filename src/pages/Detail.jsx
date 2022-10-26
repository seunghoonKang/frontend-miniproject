import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { pharmacyWorking } from '../recoil/atom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import NaverMapAPI from '../components/NaverMap';
import WholeDay from '../components/WholeDay';
import WorkingDay from '../components/WorkingDay';
import Header from '../components/Header';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [working, setWorking] = useState('');
  const [isShow, setIsShow] = useState(false);
  //const setpharmacyWK = useSetRecoilState(pharmacyWorking);

  //약국 한 개 가져오기
  useEffect(() => {
    axios
      .get(`https://chamchimayo.shop/pharmacyList/${id}`)
      .then((res) => setWorking(res.data.item));
    console.log(working);
    //setpharmacyWK(working);
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full max-w-lg  m-auto ">
        <div className="px-5 py-3 pt-3 pr-5 bg-white sticky z-10 top-0 ">
          <button onClick={() => navigate(-1)}>
            <BsFillArrowLeftSquareFill size="30" className=" ml-1" />
            <span className=" text-xs">뒤로가기</span>
          </button>
        </div>
        <section className="p-5">
          <h1 className="text-2xl font-bold mb-4 mt-2.5">{working.dutyName}</h1>
          <NaverMapAPI working={working} />
          <div className="text-sm mb-3">{working.dutyAddr}</div>
          {working.dutyMapimg ? (
            <div className="text-sm ">
              <span className="font-bold text-sm">상세 🕵️ </span>
              {working.dutyMapimg}
            </div>
          ) : (
            <></>
          )}
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
          <WorkingDay working={working} />
          <div
            onClick={() => {
              setIsShow((show) => !show);
            }}
            className=" mb-5"
          >
            {isShow ? (
              <h1 className="text-lg font-bold">👨🏻‍⚕️ 전체 시간보기</h1>
            ) : (
              <h1 className="text-lg font-bold">👨🏻‍⚕️ 전체 시간보기</h1>
            )}
          </div>

          <div className={isShow ? ' ' : ' hidden  '}>
            <WholeDay working={working} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Detail;
