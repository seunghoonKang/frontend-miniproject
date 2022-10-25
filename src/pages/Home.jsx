import React, { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [itemList, setItemList] = useState([]);
  const [myLocation, setMyLocation] = useState({
    lat: 37.4979517,
    lng: 127.0276188,
  }); //useState로 위도, 경도의 기본값을 서울특별시 강남구로 지정해 두었다.

  const navigator = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      //navigator은 사용자의 상태와 신원정보 조회(읽기전용) // geolocation 사용자 위치 검색
      navigator.geolocation.getCurrentPosition(success, error);
    }
    function success(pos) {
      // 성공했을때 위치임
      let crd = pos.coords;
      setMyLocation({
        lat: crd.latitude, //position.cords.latitud로 사용자 위치에 있는 위도임
        lng: crd.longitude, //위와 같으나 경도임
      });
    }
    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    } //에러 났을때 위치임
  }, []);
  console.log(myLocation);

  useEffect(() => {
    const { naver } = window;
    async function reverseGeo() {
      //역지오 코딩이다. 주소 반환
      await naver.maps.Service.reverseGeocode(
        {
          location: new naver.maps.LatLng(myLocation.lat, myLocation.lng), //기본주소가 먼저 나옴
        },
        function (status, response) {
          let result = response.result; // 결과 응답
          let items = result.items; //결과 아이템
          console.log(items);
          let sido_arr = items[0].addrdetail.sido.split(' '); // 시도 (서울시) split으로 ''으로 쪼개면 충청북도 청주시
          let gugun_arr = items[0].addrdetail.sigugun.split(' '); // 시구군 (강남구)
          let sido = undefined; //시도는 언디파인 (그냥 빈값 처리한거임) else에 있기 때문에 귀찮아서 선언한거임
          let gugun = undefined; //구군 언디파인
          if (sido_arr.length == 1) {
            //충청북도[1] 청주시[2]이기 때문에 1보다 이상임
            console.log('here comes'); //콘솔에다가 여기있다.
            sido = sido_arr[0]; //시도의 첫번쨰 내용 ex) 충청북도 청주시
            gugun = gugun_arr[0]; // 구군 첫번째 내용
            console.log(sido, gugun); // 콘솔로그에 시도, 군이 나오도록 찍는다.
          } else if (sido_arr.length > 1) {
            // 그게 아니라면 1보다 크다면 시도에
            console.log('here!!!!!!!!!!!!');
            sido = gugun_arr[0]; //sido gugun_arr[0]를 넣음
            gugun = gugun_arr[1]; // gugu gugun_arr[1] 그거에 두번째 인덱스
            console.log(sido, gugun); //시도랑 군을 찍는다.
          }

          if (status === naver.maps.Service.Status.ERROR) {
            alert('서버에 오류가 있어요. 다음에 다시 시도해주세요😰');
          } //주소 잘못요청하면 서버에 오류가 뜰 경우에는 이렇게 뜸

          axios
            .get(
              `https://chamchimayo.shop/pharmacyList?Q0=${sido}&Q1=${gugun}&QT=1~8&pageNo=1&numOfRows=1000`
            )
            .then((res) => {
              setItemList(res.data.items.item);
              // 이건 백엔드에서 준 서버야 ~
              console.log(res);
            });
        }
      );
    }
    reverseGeo();
  }, [myLocation]); //위도 경도를 찾을때만 useEffectㅇ 실행

  // navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
  //state 에 넣어서 사용함 slecter에 데이터 넣어서 처리하는것도 가능함
  return (
    <div>
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
      <div className="flex items-center justify-center">
        <div>
          <h1 className="pt-3 pb-5 mt-10 text-xl text-blue-500">
            내 주변 약국
          </h1>
          {itemList.map((items) => (
            <div key={items.hpid} className="pb-8">
              <button
                onClick={() => {
                  navigator(`/Detail/${items.hpid}`);
                }}
                className="px-4 pt-1 pb-2 text-blue-500 bg-blue-200 rounded-t-lg hover:bg-blue-300"
              >
                {items.dutyName}
              </button>
              <p className="pt-3 pb-3 pl-2 bg-blue-100">
                약국위치 : {items.dutyAddr}{' '}
              </p>
              <p className="pt-3 pb-3 pl-2 bg-blue-100">{items.dutyTel1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

// $(document).ready(async function () {
//   let XY = await getLocation();

//   await naver.maps.Service.reverseGeocode(
//   {
//   location: new naver.maps.LatLng(XY.lat, XY.lng),
//   },
//   function (status, response) {
//   let result = response.result;
//   let items = result.items;

//   let sido_arr = items[0].addrdetail.sido.split(" "); // 시도
//   let gugun_arr = items[0].addrdetail.sigugun.split(" "); // 시구군

//   if (sido_arr.length == 1) {
//   console.log("here comes");
//   sido = sido_arr[0];
//   gugun = gugun_arr[0];
//   } else if (sido_arr.length > 1) {
//   console.log("here!!!!!!!!!!!!");
//   sido = gugun_arr[0];
//   gugun = gugun_arr[1];
//   }

//   $.ajax({
//   url: "/pharmacyList",
//   type: "GET",
//   cache: false,
//   dataType: "json",
//   data: {
//   Q0: sido,
//   Q1: gugun,
//   QT: "1~8",
//   QN: "",
//   ORD: "",
//   pageNo: "1",
//   numOfRows: "1000",
