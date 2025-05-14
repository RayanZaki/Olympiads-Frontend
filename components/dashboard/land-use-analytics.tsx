"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function LandUseAnalytics() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const [landUseData, setLandUseData] = useState([])
  const [slopeData, setSlopeData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import('@/lib/land-use-data')
        setLandUseData(data.landUseBreakdown)
        setSlopeData(data.slopeData)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load land use data:", error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  const COLORS = ["#f97316", "#84cc16", "#6b7280", "#22c55e", "#3b82f6"]
  
  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white shadow-md rounded-md border border-gray-200">
          <p className="text-xs font-medium">{`Slope ${label}`}</p>
          <p className="text-xs text-gray-600">{`${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="border border-muted/30 bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium">Land Use Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="relative h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={landUseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                    nameKey="name"
                    stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
                    strokeWidth={1}
                  >
                    {landUseData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      padding: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value.toFixed(2)}%`, 'Coverage']}
                  />
                  <Legend 
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{fontSize: '10px'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border border-muted/30 bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium">Slope Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="relative h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={slopeData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <XAxis 
                    dataKey="category" 
                    tick={{fontSize: 10}}
                    tickLine={false}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                    tick={{fontSize: 10}}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="#f97316" 
                    opacity={0.8}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
