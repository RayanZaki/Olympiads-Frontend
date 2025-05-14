"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { useTheme } from "next-themes"

export function DroughtAnalytics() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const data = [
    { name: "Score", value: 73 },
    { name: "Remaining", value: 27 },
  ]
  
  const data2 = [
    { name: "Score", value: 73.1 },
    { name: "Remaining", value: 26.9 },
  ]
  
  const COLORS = ["#f97316", isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"]
  const COLORS2 = ["#d97706", isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="border border-muted/30 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="relative h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke={index === 1 ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)") : "none"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-bold text-orange-500 dark:text-orange-400">2011</span>
                <span className="block text-sm text-muted-foreground">73%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-muted/30 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="relative h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data2}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data2.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS2[index % COLORS2.length]} 
                      stroke={index === 1 ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)") : "none"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-bold text-orange-500 dark:text-orange-400">73.1%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
