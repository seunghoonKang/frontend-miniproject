/* eslint-disable */
import React, { useEffect } from 'react';
import markerImage from '../img/pill.png';
// import { useRecoilValue } from 'recoil';
// import { pharmacyWorking } from '../recoil/atom';

const NaverMapAPI = ({ working }) => {
  // const pharmacyLoc = useRecoilValue(pharmacyWorking);

  useEffect(() => {
    const initMap = () => {
      const { naver } = window;
      // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
      const location = new naver.maps.LatLng(
        working.wgs84Lat,
        working.wgs84Lon
      );
      const mapOptions = {
        center: location,
        zoom: 16,
        minZoom: 13,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      const map = new naver.maps.Map('map', mapOptions);

      const markerOptions = {
        position: location,
        map: map,
        icon: {
          url: markerImage,
          // size: new naver.maps.Size(150, 150),
          // origin: new naver.maps.Point(0, 0),
          // anchor: new naver.maps.Point(11, 35),
        },
      };
      const marker = new naver.maps.Marker(markerOptions);
    };
    initMap();
  });

  return (
    <>
      <div id="map" style={{ minHeight: '200px', margin: '30px 0 20px 0' }} />
    </>
  );
};

export default NaverMapAPI;
