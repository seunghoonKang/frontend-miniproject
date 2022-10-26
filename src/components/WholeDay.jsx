import React from 'react';
import { useRecoilValue } from 'recoil';
import { pharmacyWorking } from '../recoil/atom';

const WholeDay = ({ working }) => {
  // const pharmacyWK = useRecoilValue(pharmacyWorking);
  const {
    dutyTime1c,
    dutyTime2c,
    dutyTime3c,
    dutyTime4c,
    dutyTime5c,
    dutyTime6c,
    dutyTime7c,
    dutyTime8c,
    dutyTime1s,
    dutyTime2s,
    dutyTime3s,
    dutyTime4s,
    dutyTime5s,
    dutyTime6s,
    dutyTime7s,
    dutyTime8s,
  } = working;

  return (
    <div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-white ">월요일</div>
          <div className="text-base text-slate-50">
            {dutyTime1s} ~ {dutyTime1c}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-slate-50 ">
            화요일
          </div>
          <div className="text-base text-slate-50">
            {dutyTime2s} ~ {dutyTime2c}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-slate-50 ">
            수요일
          </div>
          <div className="text-base text-slate-50">
            {dutyTime3s} ~ {dutyTime3c}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-slate-50 ">
            목요일
          </div>
          <div className="text-base text-slate-50">
            {dutyTime4s} ~ {dutyTime4c}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-slate-50 ">
            금요일
          </div>
          <div className="text-base text-slate-50">
            {dutyTime5s} ~ {dutyTime5c}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-indigo-800 ">
            토요일
          </div>
          <div className="text-base text-slate-50">
            {dutyTime6c ? `${dutyTime6s} ~ ${dutyTime6c}` : '전화문의'}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-red-500 ">
            일요일
          </div>
          <div className="text-base text-slate-50">
            {dutyTime7c ? `${dutyTime7s} ~ ${dutyTime7c}` : '전화문의'}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl p-4 w-full mb-4 bg-slate-400">
          <div className="text-sm font-bold mb-1 flex text-red-500 ">
            공휴일
          </div>
          <div className="text-base text-slate-50">
            {dutyTime8c ? `${dutyTime8s} ~ ${dutyTime8c}` : '전화문의'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeDay;
