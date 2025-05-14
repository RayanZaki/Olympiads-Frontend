"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import '../../styles/annotation.css'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Layers, ZoomIn, ZoomOut, Trash2, Check, X, Eye, EyeOff } from "lucide-react"
import { landUseData } from '@/lib/algeria-land-use-data'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-r from-orange-500/10 to-gray-200/20 dark:from-orange-950/30 dark:to-gray-800/20">Loading Map...</div>
})

const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
  ssr: false
})

const FeatureGroup = dynamic(() => import('react-leaflet').then(mod => mod.FeatureGroup), {
  ssr: false
})

const EditControl = dynamic(() => import('react-leaflet-draw').then(mod => mod.EditControl), {
  ssr: false
})

const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), {
  ssr: false
})

// Mock initial annotations
const initialAnnotations = [
  {
    id: "anno-1",
    label: "Severe Drought",
    level: "severe",
    color: "#f97316", // Orange
    coordinates: [
      [33.78, 2.85],
      [33.82, 2.88], 
      [33.79, 2.91]
    ],
    createdAt: "2024-05-12T15:30:00Z",
    createdBy: "Dr. John Smith"
  },
  {
    id: "anno-2",
    label: "Moderate Drought",
    level: "moderate",
    color: "#d97706", // Amber
    coordinates: [
      [33.83, 2.93],
      [33.85, 2.96],
      [33.81, 2.97]
    ],
    createdAt: "2024-05-13T10:15:00Z",
    createdBy: "Dr. Maria Johnson"
  }
];

export function DroughtAnnotationMap() {
  const mapRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const [annotations, setAnnotations] = useState(initialAnnotations)
  const [selectedTool, setSelectedTool] = useState("polygon")
  const [mapCenter, setMapCenter] = useState([33.8, 2.9]) // Laghouat, Algeria
  const [showLabels, setShowLabels] = useState(true)
  const [currentDroughtLevel, setCurrentDroughtLevel] = useState("severe")
  
  // Always use light tile layer for the map regardless of theme
  const tileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  // Function to handle new annotations created with drawing tools
  const handleCreated = (e) => {
    const { layerType, layer } = e;
    const coordinates = layerType === 'polygon' 
      ? layer.getLatLngs()[0].map(ll => [ll.lat, ll.lng])
      : layer.getLatLngs().map(ll => [ll.lat, ll.lng]);
      
    const newAnnotation = {
      id: `anno-${Date.now()}`,
      label: `${currentDroughtLevel.charAt(0).toUpperCase() + currentDroughtLevel.slice(1)} Drought`,
      level: currentDroughtLevel,
      color: currentDroughtLevel === 'severe' ? '#f97316' : 
             currentDroughtLevel === 'moderate' ? '#d97706' : 
             currentDroughtLevel === 'abnormal' ? '#eab308' : '#22c55e',
      coordinates: coordinates,
      createdAt: new Date().toISOString(),
      createdBy: "Current Expert" // Would be the actual user in a real app
    };
    
    setAnnotations([...annotations, newAnnotation]);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Card className="border border-muted/30 bg-card/60 backdrop-blur-sm shadow-sm">
      <CardContent className="p-0">
        <div className="relative w-full h-[500px] overflow-hidden">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-500/10 to-gray-200/20 dark:from-orange-950/10 dark:to-gray-800/10">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Loading annotation map...</p>
              </div>
            </div>
          ) : typeof window !== 'undefined' && (
            <MapContainer 
              center={mapCenter} 
              zoom={11} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              attributionControl={false}
              ref={mapRef}
            >
              <ZoomControl position="bottomright" />
              <TileLayer
                url={tileUrl}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              
              {/* EditControl for drawing polygons */}
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={handleCreated}
                  draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: selectedTool === 'polyline',
                    polygon: selectedTool === 'polygon',
                  }}
                />
              </FeatureGroup>
              
              {/* Annotation Layers */}
              {/* In a real implementation, we would map through annotations and create polygon components */}
              
              {/* Map Info */}
              <div className="absolute bottom-2 left-2 z-[500]">
                <div className="p-2 rounded-md shadow-md bg-white/95 backdrop-blur-sm border border-gray-200">
                  <div className="text-xs font-semibold mb-2 text-gray-800">
                    Drought Severity Legend
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#22c55e]"></div>
                      <span className="text-xs text-gray-800">Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#eab308]"></div>
                      <span className="text-xs text-gray-800">Abnormally Dry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#d97706]"></div>
                      <span className="text-xs text-gray-800">Moderate Drought</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#f97316]"></div>
                      <span className="text-xs text-gray-800">Severe Drought</span>
                    </div>
                  </div>
                </div>
              </div>
            </MapContainer>
          )}
          
          {/* Map overlay controls */}
          <div className="absolute top-2 right-2 z-[500] flex flex-col gap-1">
            <div className="p-2 rounded-md shadow-md bg-white/95 backdrop-blur-sm border border-gray-200">
              <div className="flex gap-1 items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-md bg-white text-gray-700"
                  onClick={() => setShowLabels(!showLabels)}
                >
                  {showLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-md bg-white text-gray-700"
                >
                  <Layers className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-md bg-white text-gray-700"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Active annotation info */}
          {annotations.length > 0 && (
            <div className="absolute bottom-2 right-2 z-[500]">
              <div className="p-2 rounded-md shadow-md bg-white/95 backdrop-blur-sm border border-gray-200">
                <div className="text-xs text-gray-800">
                  <span className="font-semibold">{annotations.length}</span> annotation(s) created
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
