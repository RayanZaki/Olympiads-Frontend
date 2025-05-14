"use client"

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from "react"
import 'leaflet/dist/leaflet.css'
import { useTheme } from "next-themes"

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-500/10 to-gray-200/20 dark:from-orange-950/30 dark:to-gray-800/20">Loading Map...</div>
})

const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
  ssr: false
})

const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), {
  ssr: false
})

const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), {
  ssr: false
})

const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), {
  ssr: false
})

const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), {
  ssr: false
})

export function DroughtMap() {
  const mapRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  
  // Import drought data
  const [countyData, setCountyData] = useState(null)
  const [landUseMarkers, setLandUseMarkers] = useState([])
  const [landUseData, setLandUseData] = useState(null)
  
  // Load drought data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, you would fetch this from an API
        const data = await import('@/lib/land-use-data')
        setCountyData(data.countyGeoJson)
        setLandUseMarkers(data.landUseMarkers)
        setLandUseData(data.landUseData)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load land use data:", error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  // Style for GeoJSON drought regions
  const countyStyle = (feature) => {
    const category = feature.properties.category;
    return {
      className: `drought-${category}`, // This will use our CSS variables from leaflet-fix.css
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.7
    }
  }

  // Always use light tile layer for the map regardless of theme
  const tileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className="relative w-full h-full p-[1px] rounded-lg overflow-hidden bg-background">
      <div className="absolute inset-0 rounded-lg z-0 bg-gradient-to-tr from-orange-500/10 to-gray-500/10 dark:from-orange-400/5 dark:to-gray-600/5" />
      {loading ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-500/10 to-gray-200/20 dark:from-orange-950/30 dark:to-gray-800/20">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading land use data...</p>
          </div>
        </div>
      ) : typeof window !== 'undefined' && (
        <MapContainer 
          center={[landUseData.lat, landUseData.lon]} 
          zoom={10} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          zoomAnimation={true}
          attributionControl={false}
          ref={mapRef}
          className="z-10"
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url={tileUrl}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {/* Render GeoJSON county region */}
          {countyData && (
            <GeoJSON 
              data={countyData} 
              style={countyStyle}
              onEachFeature={(feature, layer) => {
                const intensity = Math.round(feature.properties.intensity * 100);
                const category = feature.properties.category;
                const name = feature.properties.name;
                layer.bindTooltip(
                  `<div class="p-2 rounded-md shadow-md" style="background-color: white; color: #374151;">
                    <p class="font-bold text-sm">${name}</p>
                    <p class="text-xs">${category.charAt(0).toUpperCase() + category.slice(1)} Drought</p>
                    <p class="text-xs opacity-80">Intensity: ${intensity}%</p>
                  </div>`,
                  { direction: 'top', sticky: true, className: 'custom-tooltip' }
                );
              }}
            />
          )}
          
          {/* Render land use markers */}
          {landUseMarkers?.map((point, idx) => (
            <CircleMarker 
              key={idx}
              center={[point.lat, point.lng]}
              radius={5 + (point.intensity * 10)}
              pathOptions={{
                fillColor: point.color,
                color: point.color,
                fillOpacity: 0.6,
                weight: 1
              }}
            >
              <Tooltip direction="top" offset={[0, -5]} opacity={0.9}>
                <div className="p-1 rounded-md shadow-md bg-white text-gray-800">
                  <p className="font-bold text-xs">{point.category.charAt(0).toUpperCase() + point.category.slice(1)}</p>
                  <p className="text-xs text-gray-600">
                    {point.value.toFixed(2)}%
                  </p>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
          
          {/* Map Legend */}
          <div className="absolute bottom-2 left-2 z-[500]">
            <div className="p-2 rounded-md shadow-md bg-white/90 backdrop-blur-sm border border-gray-200">
              <div className="text-xs font-medium mb-2 text-gray-800">
                Land Use Categories
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#166534]"></div>
                <span className="text-xs text-gray-800">Forest</span>
                <div className="mx-1"></div>
                <div className="h-3 w-3 rounded-full bg-[#f59e0b]"></div>
                <span className="text-xs text-gray-800">Cropland</span>
                <div className="mx-1"></div>
                <div className="h-3 w-3 rounded-full bg-[#6b7280]"></div>
                <span className="text-xs text-gray-800">Urban</span>
              </div>
            </div>
          </div>
          
          {/* Map Title */}
          <div className="absolute top-2 right-2 z-[500]">
            <div className="p-2 rounded-md shadow-md bg-white/90 backdrop-blur-sm border border-gray-200">
              <div className="text-xs font-medium text-gray-800">
                Autauga County, AL (FIPS 1001)
              </div>
            </div>
          </div>
        </MapContainer>
      )}
    </div>
  )
}
