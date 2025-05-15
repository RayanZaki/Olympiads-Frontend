"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, useMemo } from "react";
import { DroughtMap } from "./drought-map";
import { useTheme } from "next-themes";

export function DroughtScore() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Drought level from 0 (no drought) to 5 (severe drought)
  const [droughtLevel, setDroughtLevel] = useState(5); // Default to D4

  // Drought categories definition
  const droughtCategories = [
    { name: "No Drought", label: "D0", color: isDark ? "#4b5563" : "#475569" },
    {
      name: "Abnormally Dry",
      label: "D1",
      color: isDark ? "#6b7280" : "#64748b",
    },
    {
      name: "Mild Drought",
      label: "D2",
      color: isDark ? "#9ca3af" : "#94a3b8",
    },
    { name: "Low Drought", label: "D3", color: "#737373" },
    { name: "Moderate Drought", label: "D4", color: "#d97706" },
    { name: "Severe Drought", label: "D5", color: "#f97316" },
  ];

  // Get current drought category based on level
  const currentDrought = droughtCategories[droughtLevel];

  // Calculate percentage based on drought level (0-5)
  const droughtPercentage = useMemo(
    () => Math.round((droughtLevel / 5) * 100),
    [droughtLevel]
  );

  // Prepare data for the pie chart
  const data = useMemo(
    () => [
      {
        name: "Drought",
        value: droughtPercentage,
        color: currentDrought.color,
      },
      {
        name: "Remaining",
        value: 100 - droughtPercentage,
        color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      },
    ],
    [droughtPercentage, currentDrought.color, isDark]
  );

  // Helper function to get background class for drought level indicator
  const getDroughtBgClass = (level: number) => {
    const colorMap: Record<number, string> = {
      0: "bg-slate-600", // D0
      1: "bg-slate-500", // D1
      2: "bg-slate-400", // D2
      3: "bg-neutral-500", // D3
      4: "bg-amber-600", // D4
      5: "bg-orange-500", // D5
    };
    return `h-3 w-3 rounded-full ${colorMap[level]}`;
  };

  return (
    <Card className="border border-muted/30 bg-card/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-base font-medium">Fay Basin Intrades</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Drought Severity Index
          </p>
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span
                className="text-3xl font-bold"
                style={{ color: currentDrought.color }}
              >
                {currentDrought.label}
              </span>
              <span className="block text-xs text-muted-foreground">
                {currentDrought.name}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Drought Level</span>
            <span className="text-xs text-muted-foreground">
              {droughtPercentage}%
            </span>
          </div>

          {/* Drought level selector */}
          <div className="grid grid-cols-6 gap-1 mb-4">
            {droughtCategories.map((category, index) => (
              <div
                key={index}
                className={`${getDroughtBgClass(
                  index
                )} w-full h-2 cursor-pointer ${
                  droughtLevel === index ? "ring-2 ring-offset-1" : ""
                }`}
                onClick={() => setDroughtLevel(index)}
                title={`${category.label} - ${category.name}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs">
            <span>No Drought (D0)</span>
            <span>Severe Drought (D5)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
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
  );
}
