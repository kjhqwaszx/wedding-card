import classNames from 'classnames/bind'
import Section from '@shared/Section'
import styles from './Map.module.scss'
import React, { useEffect, useRef } from 'react'
import { Location } from '@models/wedding'

declare global {
  interface Window {
    kakao: any
  }
}

const cx = classNames.bind(styles)

function Map({ location }: { location: Location }) {
  // 지도를 렌더링 할 Dom 요소
  const mapContainer = useRef(null)

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      // kakao 객체가 전역에 존재하면, 중복 로딩을 피하고 바로 지도 생성
      loadMap()
      return
    }

    // kakao map 스크립트가 삽입되어 있는지 여부
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com"]',
    )

    if (!existingScript) {
      // 스크립트가 없으면 비동기적으로 로드한다. ( autoload = false )
      const script = document.createElement('script')
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
      script.async = true

      document.head.appendChild(script)

      script.onload = () => {
        // 스크립트가 로드 되면 카카오 지도를 그려준다.
        window.kakao.maps.load(loadMap)
      }
    } else {
      // 스크립트는 존재하지만, 아직 로드 중이라면, 로드 완료 후 지도 초기화
      existingScript.addEventListener('load', () => {
        window.kakao.maps.load(loadMap)
      })
    }

    // 실제 지도를 그리는 함수
    function loadMap() {
      // 위경도를 기반으로 지도 위치 설정
      const position = new window.kakao.maps.LatLng(location.lat, location.lng)

      // 중심좌표, 확대 레벨 설정
      const options = {
        center: position,
        level: 3,
      }

      // 지도 인스턴스 및 마커 생성
      const map = new window.kakao.maps.Map(mapContainer.current, options)
      const marker = new window.kakao.maps.Marker({ position })

      // 지도 위에 마커 생성
      marker.setMap(map)
    }
  }, [location])

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-title')}>오시는길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapContainer}></div>
        <a
          className={cx('btn-find-way')}
          href={location.link}
          target="_blank"
          rel="noreferrer"
        >
          길찾기
        </a>
      </div>

      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  )
}

function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode
  list: string[]
}) {
  return (
    <div className={cx('wrap-waytocome')}>
      <div className={cx('txt-label')}>{label}</div>
      <ul>
        {list.map((waytocome, index) => (
          <li key={index}>{waytocome}</li>
        ))}
      </ul>
    </div>
  )
}

export default Map
