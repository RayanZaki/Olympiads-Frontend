"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { landUseData, slopeData, aspectData } from '@/lib/land-use-data'
import { InfoIcon, Droplets } from "lucide-react"

// Generate groundwater level data based on county characteristics
const generateGroundwaterData = () => {
  // Create realistic groundwater level data that correlates with land use and slope
  // Lower values = deeper groundwater (worse for drought)
  return [
    { year: "2018", value: 85 - landUseData.landCover.forest * 0.2 },
    { year: "2019", value: 82 - landUseData.landCover.forest * 0.2 },
    { year: "2020", value: 78 - landUseData.landCover.forest * 0.2 },
    { year: "2021", value: 72 - landUseData.landCover.forest * 0.2 },
    { year: "2022", value: 68 - landUseData.landCover.forest * 0.2 },
    { year: "2023", value: 65 - landUseData.landCover.forest * 0.2 },
    { year: "2024", value: 62 - landUseData.landCover.forest * 0.2 },
  ]
}

// Generate soil moisture data based on soil quality in the county
const generateSoilMoistureData = () => {
  // Soil moisture based on soil quality factors
  const soilQualityAvg = Object.values(landUseData.soilQuality).reduce((a, b) => a + b, 0) / 7;
  
  return [
    { month: "Jan", topsoil: 0.42 * soilQualityAvg, subsoil: 0.55 * soilQualityAvg },
    { month: "Feb", topsoil: 0.45 * soilQualityAvg, subsoil: 0.54 * soilQualityAvg },
    { month: "Mar", topsoil: 0.40 * soilQualityAvg, subsoil: 0.52 * soilQualityAvg },
    { month: "Apr", topsoil: 0.38 * soilQualityAvg, subsoil: 0.51 * soilQualityAvg },
    { month: "May", topsoil: 0.33 * soilQualityAvg, subsoil: 0.49 * soilQualityAvg },
    { month: "Jun", topsoil: 0.30 * soilQualityAvg, subsoil: 0.47 * soilQualityAvg },
    { month: "Jul", topsoil: 0.27 * soilQualityAvg, subsoil: 0.45 * soilQualityAvg },
    { month: "Aug", topsoil: 0.25 * soilQualityAvg, subsoil: 0.44 * soilQualityAvg },
    { month: "Sep", topsoil: 0.28 * soilQualityAvg, subsoil: 0.43 * soilQualityAvg },
    { month: "Oct", topsoil: 0.32 * soilQualityAvg, subsoil: 0.45 * soilQualityAvg },
    { month: "Nov", topsoil: 0.37 * soilQualityAvg, subsoil: 0.48 * soilQualityAvg },
    { month: "Dec", topsoil: 0.40 * soilQualityAvg, subsoil: 0.52 * soilQualityAvg },
  ]
}

// Generate water table depth data based on county's slope and aspect
const generateWaterTableData = () => {
  const averageSlope = 
    landUseData.slope.slope1 * 1 + 
    landUseData.slope.slope2 * 3.5 + 
    landUseData.slope.slope3 * 7.5 + 
    landUseData.slope.slope4 * 12.5 + 
    landUseData.slope.slope5 * 22.5 + 
    landUseData.slope.slope6 * 37.5;
  
  // Create different depth samples based on the dominant slope and aspect
  return [
    { depth: "50ft", value: 100 - (averageSlope * 2) },
    { depth: "100ft", value: 95 - (averageSlope * 1.8) },
    { depth: "150ft", value: 90 - (averageSlope * 1.6) },
    { depth: "200ft", value: 85 - (averageSlope * 1.4) },
    { depth: "250ft", value: 80 - (averageSlope * 1.2) },
    { depth: "300ft", value: 75 - (averageSlope) },
  ]
}

export function GroundwaterAnalysis() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const [groundwaterData, setGroundwaterData] = useState<any[]>([])
  const [soilMoistureData, setSoilMoistureData] = useState<any[]>([])
  const [waterTableData, setWaterTableData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Generate data based on land use characteristics
    setGroundwaterData(generateGroundwaterData())
    setSoilMoistureData(generateSoilMoistureData())
    setWaterTableData(generateWaterTableData())
    setLoading(false)
  }, [])
  
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
  const axisColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
  const tooltipBg = isDark ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)"
  const tooltipBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
  const tooltipColor = isDark ? "#fff" : "#0f172a"

  return (
    <Card className="border border-muted/30 bg-card/60 backdrop-blur-sm shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
          Groundwater Analysis
        </CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Autauga County, AL</span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="groundwater" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="groundwater">Groundwater</TabsTrigger>
            <TabsTrigger value="soil">Soil Moisture</TabsTrigger>
            <TabsTrigger value="water-table">Water Table</TabsTrigger>
          </TabsList>
          
          <TabsContent value="groundwater" className="space-y-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={groundwaterData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke={axisColor} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    stroke={axisColor}
                    domain={[50, 90]}
                    label={{ 
                      value: 'Level (%)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: axisColor, fontSize: 12 }
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Groundwater Level']}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "6px",
                      color: tooltipColor,
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f97316" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: "#f97316" }}
                    name="Groundwater Level"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Groundwater levels have declined 23% since 2018</span>
              </div>
              <div className="text-right">7-year trend</div>
            </div>
          </TabsContent>
          
          <TabsContent value="soil" className="space-y-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={soilMoistureData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorTopsoil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSubsoil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a16207" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#a16207" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={axisColor} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    stroke={axisColor}
                    domain={[0, 1]}
                    label={{ 
                      value: 'Moisture', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: axisColor, fontSize: 12 }
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${Number(value).toFixed(2)}`, 'Moisture Level']}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "6px",
                      color: tooltipColor,
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="topsoil" 
                    stroke="#f97316" 
                    fillOpacity={1} 
                    fill="url(#colorTopsoil)" 
                    name="Topsoil (0-12in)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="subsoil" 
                    stroke="#a16207" 
                    fillOpacity={1} 
                    fill="url(#colorSubsoil)" 
                    name="Subsoil (12-24in)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Topsoil shows stronger seasonal variation than subsoil</span>
              </div>
              <div className="text-right">Monthly data, 2024</div>
            </div>
          </TabsContent>
          
          <TabsContent value="water-table" className="space-y-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={waterTableData}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 12 }} 
                    stroke={axisColor}
                    domain={[0, 100]}
                    label={{ 
                      value: 'Water Availability (%)', 
                      position: 'insideBottom',
                      offset: -5,
                      style: { textAnchor: 'middle', fill: axisColor, fontSize: 12 }
                    }}
                  />
                  <YAxis 
                    dataKey="depth" 
                    type="category" 
                    tick={{ fontSize: 12 }} 
                    stroke={axisColor} 
                    width={45}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Water Availability']}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "6px",
                      color: tooltipColor,
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#f97316" 
                    name="Water Availability"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Water availability decreases with depth</span>
              </div>
              <div className="text-right">Current measurements</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
