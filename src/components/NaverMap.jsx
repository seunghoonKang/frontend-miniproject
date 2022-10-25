/* eslint-disable */
import React, { useEffect } from 'react';

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
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      const map = new naver.maps.Map('map', mapOptions);

      const ICON_IMAGE_URL = '../img/pill.png';

      const markerOptions = {
        position: location,
        map: map,
        icon: {
          url: ICON_IMAGE_URL,
          // size: new naver.maps.Size(22, 35),
          // origin: new naver.maps.Point(0, 0),
          // anchor: new naver.maps.Point(11, 35),
        },
      };
      const marker = new naver.maps.Marker(markerOptions);
    };
    initMap();
  }, []);

  //https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html 왜 아이콘 안바껴!!!!!!!!
  return (
    <>
      <div id="map" style={{ minHeight: '400px' }} />
    </>
  );
};

export default NaverMapAPI;
