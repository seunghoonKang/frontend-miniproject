/* eslint-disable */
import React, { useEffect } from 'react';
import markerImage from '../img/pill.png';
const NaverMapAPI = () => {
  useEffect(() => {
    const initMap = () => {
      const { naver } = window;
      // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
      const location = new naver.maps.LatLng(
        37.40242465877038,
        126.9102104886459
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

  //https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html 왜 아이콘 안바껴!!!!!!!!
  return (
    <>
      <div id="map" style={{ minHeight: '200px', margin: '30px 0 20px 0' }} />
    </>
  );
};

export default NaverMapAPI;
