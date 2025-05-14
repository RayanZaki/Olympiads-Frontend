"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Pen, 
  Square, 
  Circle, 
  Hash, 
  Droplet,
  CloudRain,
  CloudDrizzle,
  CloudSun,
  Upload,
  Download,
  TableProperties
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export function DroughtAnnotationTools() {
  const [droughtLevel, setDroughtLevel] = useState("severe")
  const [opacity, setOpacity] = useState(70)
  const [selectedTool, setSelectedTool] = useState("polygon")
  const [showDataLayers, setShowDataLayers] = useState(true)
  
  return (
    <Card className="border border-muted/30 bg-card/60 backdrop-blur-sm shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Pen className="h-4 w-4 mr-2 text-orange-500" />
          Annotation Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-0 pb-4">
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="draw" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center">
                <Pen className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Drawing Tools</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant={selectedTool === "polygon" ? "default" : "outline"} 
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedTool("polygon")}
                      >
                        <Square className="h-4 w-4 mr-1.5" />
                        Polygon
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Draw polygon drought regions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant={selectedTool === "freehand" ? "default" : "outline"} 
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedTool("freehand")}
                      >
                        <Pen className="h-4 w-4 mr-1.5" />
                        Freehand
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Draw freehand drought regions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="classification" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center">
                <Hash className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Classification</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <RadioGroup 
                defaultValue="severe" 
                value={droughtLevel}
                onValueChange={setDroughtLevel}
                className="space-y-2 mb-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="r1" className="text-green-500" />
                  <Label htmlFor="r1" className="flex items-center text-sm">
                    <CloudSun className="h-4 w-4 mr-1.5 text-green-500" />
                    Normal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="abnormal" id="r2" className="text-yellow-500" />
                  <Label htmlFor="r2" className="flex items-center text-sm">
                    <CloudDrizzle className="h-4 w-4 mr-1.5 text-yellow-500" />
                    Abnormally Dry
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="r3" className="text-amber-500" />
                  <Label htmlFor="r3" className="flex items-center text-sm">
                    <Droplet className="h-4 w-4 mr-1.5 text-amber-500" />
                    Moderate Drought
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="severe" id="r4" className="text-orange-500" />
                  <Label htmlFor="r4" className="flex items-center text-sm">
                    <CloudRain className="h-4 w-4 mr-1.5 text-orange-500" />
                    Severe Drought
                  </Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="appearance" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center">
                <TableProperties className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Appearance</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <div className="space-y-4 mb-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="opacity" className="text-xs">Opacity: {opacity}%</Label>
                  </div>
                  <Slider
                    id="opacity"
                    min={10}
                    max={100}
                    step={5}
                    defaultValue={[70]}
                    value={[opacity]}
                    onValueChange={(value) => setOpacity(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="label" className="text-xs">Custom Label</Label>
                  <Input id="label" placeholder="Optional annotation label" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="show-data-layers"
                    checked={showDataLayers}
                    onChange={(e) => setShowDataLayers(e.target.checked)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <Label htmlFor="show-data-layers" className="text-xs">Show Data Layers</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="data" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Data Import/Export</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <div className="space-y-2 mb-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Upload className="h-3.5 w-3.5 mr-1.5" />
                  Import GeoJSON
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Export Annotations
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex flex-col gap-2 mt-4">
          <Button className="w-full">Save Annotations</Button>
          <Button variant="outline" className="w-full">Cancel Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
