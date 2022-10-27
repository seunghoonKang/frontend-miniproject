import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import NaverMapAPI from '../components/NaverMap';
import WholeDay from '../components/WholeDay';
import WorkingDay from '../components/WorkingDay';
import Header from '../components/Header';
import Loading from '../components/Loading';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [working, setWorking] = useState('');
  const [isShow, setIsShow] = useState(false);
  const { isLoading } = useSelector((state) => state.seung);

  //약국 한 개 가져오기
  useEffect(() => {
    axios
      .get(`https://chamchimayo.shop/pharmacyList/${id}`)
      .then((res) => setWorking(res.data.item));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="w-full max-w-lg m-auto ">
        <div className="sticky top-0 z-10 px-5 py-3 pt-3 pr-5 bg-white ">
          <button onClick={() => navigate(-1)}>
            <BsFillArrowLeftSquareFill size="30" className="ml-1 " />
            <span className="text-xs ">뒤로가기</span>
          </button>
        </div>
        <section className="p-5">
          <h1 className="text-2xl font-bold mb-4 mt-2.5">{working.dutyName}</h1>
          <NaverMapAPI working={working} />
          <div className="mb-3 text-sm">{working.dutyAddr}</div>
          {working.dutyMapimg ? (
            <div className="text-sm ">
              <span className="text-sm font-bold">상세 🕵️ </span>
              {working.dutyMapimg}
            </div>
          ) : (
            <></>
          )}
        </section>
        <section className="p-5">
          <div>
            <button className="pb-3 border-b-2 border-solid border-black-100">
              <span className="text-sm font-bold">약국정보</span>
            </button>
          </div>
        </section>
        <section className="p-5">
          <div className="mt-1 mb-5 text-sm ">
            <h1 className="text-lg font-bold">영업 시간</h1>
          </div>
          <WorkingDay working={working} />
          <div
            onClick={() => {
              setIsShow((show) => !show);
            }}
            className="mb-5 "
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
