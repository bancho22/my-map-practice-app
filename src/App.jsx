import { useState, useEffect, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import mapboxTokenTxt from './config/mapbox-access-token.txt'
import './App.css'

function App() {
  const [mapboxToken, setMapboxToken] = useState('')

  const loadToken = useCallback(async() => {
    const rawToken = await fetch(mapboxTokenTxt)
    const token = await rawToken.text()
    setMapboxToken(token)
  })

  useEffect(() => {
    loadToken()
    if( mapboxToken ) {
      mapboxgl.accessToken = mapboxToken
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [24, 42], // starting position [lng, lat]
        zoom: 9, // starting zoom
      })
    }
  }, [mapboxToken, loadToken])

  return (
    <>
      <div id='logos'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div id='map' />
    </>
  )
}

export default App
