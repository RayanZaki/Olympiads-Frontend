"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useState, useMemo } from "react"
import { DroughtMap } from "./drought-map"
import { useTheme } from "next-themes"

export function DroughtScore() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const [droughtStats, setDroughtStats] = useState({
    score: 67.1,
    remaining: 32.9,
    categories: [
      { name: "Severe Drought", color: "#f97316", percentage: 28 },
      { name: "Moderate Drought", color: "#d97706", percentage: 24 },
      { name: "Low Drought", color: "#737373", percentage: 19 },
      { name: "Normal", color: isDark ? "#9ca3af" : "#94a3b8", percentage: 16 },
      { name: "Surplus", color: isDark ? "#6b7280" : "#64748b", percentage: 13 }
    ]
  });
  
  const data = useMemo(() => [
    { name: "Score", value: droughtStats.score },
    { name: "Remaining", value: droughtStats.remaining },
  ], [droughtStats]);
  
  const COLORS = ["#f97316", isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"];

  return (
    <Card className="border border-muted/30 bg-card/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-base font-medium">Fay Basin Intrades</h3>
          <p className="text-xs text-muted-foreground mt-1">Drought Severity Index</p>
        </div>
        <div className="relative h-[170px] w-full">
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
              <span className="text-4xl font-bold text-orange-500 dark:text-orange-400">671</span>
              <span className="block text-xs text-muted-foreground">{droughtStats.score}%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {droughtStats.categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: category.color }}
              ></div>
              <div className="flex-1 flex justify-between">
                <span className="text-xs">{category.name}</span>
                <span className="text-xs text-muted-foreground">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DroughtHeader() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 overflow-hidden rounded-lg border border-muted/30 bg-card/50 backdrop-blur-sm shadow-lg">
        <DroughtMap />
      </div>
      <div className="lg:col-span-1 h-full">
        <DroughtScore />
      </div>
    </div>
  )
}
