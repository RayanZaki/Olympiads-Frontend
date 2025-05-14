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
  Legend
} from "recharts"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { landUseData, droughtIndices } from '@/lib/algeria-land-use-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon } from "lucide-react"

export function DroughtMonitoring() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const [loadedDroughtIndices, setLoadedDroughtIndices] = useState<{ month: string; value: number }[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import('@/lib/algeria-land-use-data')
        setLoadedDroughtIndices(data.droughtIndices)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load drought data:", error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
  const axisColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
  const tooltipBg = isDark ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)"
  const tooltipBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
  const tooltipColor = isDark ? "#fff" : "#0f172a"

  // Create precipitation data from drought indices
  const precipitationData = loadedDroughtIndices.length > 0 
    ? loadedDroughtIndices 
    : droughtIndices;
  
  // Additional drought intensity levels data
  const droughtLevels = [
    { level: "None", value: 0.05, color: "#22c55e" }, // Green
    { level: "Abnormally Dry", value: 0.15, color: "#eab308" }, // Yellow
    { level: "Moderate", value: 0.25, color: "#d97706" }, // Amber
    { level: "Severe", value: 0.35, color: "#f97316" }, // Orange
    { level: "Extreme", value: 0.15, color: "#ef4444" }, // Red
    { level: "Exceptional", value: 0.05, color: "#7c2d12" }, // Dark Red
  ];

  // Annual drought trends (simulated historical data)
  const annualDroughtTrends = [
    { year: "2018", value: 0.38 },
    { year: "2019", value: 0.42 },
    { year: "2020", value: 0.51 },
    { year: "2021", value: 0.62 },
    { year: "2022", value: 0.68 },
    { year: "2023", value: 0.59 },
    { year: "2024", value: 0.65 },
  ];

  return (
    <Card className="border border-muted/30 bg-card/60 backdrop-blur-sm shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Drought Monitoring</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex h-3 w-3 rounded-full bg-orange-500"></div>
          <span className="text-xs text-muted-foreground">Laghouat, Algeria</span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
            <TabsTrigger value="intensity">Intensity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={precipitationData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorPrecip" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={axisColor} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    stroke={axisColor} 
                    domain={[0, 1]}
                    label={{ 
                      value: 'Drought Index', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: axisColor, fontSize: 12 }
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${Number(value).toFixed(2)}`, 'Drought Index']}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "6px",
                      color: tooltipColor,
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f97316" 
                    fillOpacity={1} 
                    fill="url(#colorPrecip)" 
                    name="Drought Index"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Higher values indicate more severe drought conditions</span>
              </div>
              <div className="text-right">Laghouat, Algeria, 2024</div>
            </div>
          </TabsContent>
          
          <TabsContent value="annual">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={annualDroughtTrends}
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
                    domain={[0, 1]} 
                  />
                  <Tooltip
                    formatter={(value: any) => [`${Number(value).toFixed(2)}`, 'Drought Index']}
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
                    name="Annual Drought Index"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Historical trend shows increasing drought severity</span>
              </div>
              <div className="text-right">7-year historical data</div>
            </div>
          </TabsContent>
          
          <TabsContent value="intensity">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={droughtLevels}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="level" tick={{ fontSize: 10 }} stroke={axisColor} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    stroke={axisColor} 
                    label={{ 
                      value: 'Coverage %', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: axisColor, fontSize: 12 }
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${(Number(value) * 100).toFixed(1)}%`, 'Area Coverage']}
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "6px",
                      color: tooltipColor,
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Drought Coverage" 
                    fill="#f97316"
                    radius={[4, 4, 0, 0]}
                  >
                    {droughtLevels.map((entry, index) => (
                      <Bar 
                        key={`cell-${index}`}
                        dataKey="value"
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Distribution of drought intensity levels</span>
              </div>
              <div className="text-right">Current month</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
