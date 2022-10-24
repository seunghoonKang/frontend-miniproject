/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';

const NaverMapAPI = () => {
  // const [naverMaps, setNaverMaps] = useState();
  // useEffect(() => {
  //   // const navermap = new naver.maps.Map();
  //   setNaverMaps(window.naver.maps);
  //   console.log(naverMaps);
  // }, [naverMaps]);
  // function initMap() {
  //   map = new naver.maps.Map('map', {
  //     center: new naver.maps.LatLng(37.3595704, 127.105399),
  //     zoom: 10,
  //   });
  // }
  //const navermaps = new naver.maps.Map();

  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(
      37.40242465877038,
      126.9102104886459
    );
    const mapOption = {
      center: new naver.maps.LatLng(37.40242465877038, 126.9102104886459),
      zoom: 16,
      zoomControl: true,
    };
    const map = new naver.maps.Map(mapElement.current, mapOption);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);
  console.log(mapElement);
  return (
    <>
      <div
      // id="map"
      // style={{
      //   width: '100%',
      //   height: '400px',
      // }}
      // defaultCenter={{ lat: 37.40242465877038, lng: 126.9102104886459 }}
      // defaultZoom={16}
      // zoomControl={true} // 지도 zoom 허용
      >
        <div ref={mapElement} style={{ minHeight: '400px' }} />
      </div>
      {/* <Marker
        //position={{ lat: 37.40242465877038, lng: 126.9102104886459 }}
        position={new navermaps.LatLng(37.40242465877038, 126.9102104886459)}
        title={'hi'}
        animation={1}
        onClick={() => {
          alert('여기는 네이버 입니다.');
        }}
      /> */}
    </>
  );
};

export default NaverMapAPI;
