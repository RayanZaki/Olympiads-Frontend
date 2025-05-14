// Land use data for the drought dashboard for Algeria

// Land use data for Laghouat, Algeria (Wilaya code 03)
export const landUseData = {
  code: "03",
  name: "Laghouat",
  lat: 33.8,
  lon: 2.9,
  elevation: 751,
  slope: {
    slope1: 0.3419, // 0-2%
    slope2: 0.2788, // 2-5%
    slope3: 0.1984, // 5-10%
    slope4: 0.1497, // 10-15%
    slope5: 0.0242, // 15-30%
    slope6: 0.007,  // 30-45%
    slope7: 0.0,    // 45-60%
    slope8: 0.0     // >60%
  },
  aspect: {
    north: 0.2033,
    east: 0.1859,
    south: 0.3003,
    west: 0.2898,
    unknown: 0.0207
  },
  landCover: {
    water: 0.297399985790253,
    nonVegetated: 47.9404983520508, // Saharan region has more non-vegetated land
    urban: 0.48889998793602,
    grassland: 5.75027370452881,
    forest: 3.7147026062012,
    cultivatedRainfed: 36.2934112548828,
    cultivatedIrrigated: 5.51481103897095, // More irrigation in arid regions
    cultivatedTotal: 41.8082237243652
  },
  soilQuality: {
    sq1: 1,
    sq2: 2,
    sq3: 3,
    sq4: 2,
    sq5: 1,
    sq6: 1,
    sq7: 0
  }
};

// Convert the land use data to GeoJSON format
export const countyGeoJson = {
  type: 'FeatureCollection',
  features: [
    // Wilaya polygon showing drought level
    {
      type: 'Feature',
      properties: {
        intensity: 0.82, // Higher intensity for Saharan region
        category: 'severe',
        color: '#f97316', // Orange
        description: 'Severe drought conditions in Laghouat Wilaya',
        code: '03',
        name: 'Laghouat, Algeria'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [2.7, 33.6], [3.1, 33.6], [3.3, 33.8], 
          [3.1, 34.0], [2.8, 34.0], [2.6, 33.8], 
          [2.7, 33.6]
        ]]
      }
    }
  ]
};

// Land use markers for visualization
export const landUseMarkers = [
  {
    lat: 33.8,
    lng: 2.9,
    category: 'forest',
    intensity: 0.04, // Less forest in Saharan region
    color: '#166534', // Green
    value: landUseData.landCover.forest
  },
  {
    lat: 33.78,
    lng: 2.87,
    category: 'cropland',
    intensity: 0.42, // Less cultivation due to desert climate
    color: '#f59e0b', // Amber
    value: landUseData.landCover.cultivatedTotal
  },
  {
    lat: 33.83,
    lng: 2.93,
    category: 'urban',
    intensity: 0.48, // Urban areas
    color: '#6b7280', // Gray
    value: landUseData.landCover.urban + landUseData.landCover.nonVegetated
  },
  {
    lat: 33.76,
    lng: 2.85,
    category: 'water',
    intensity: 0.03, // Very little water in desert regions
    color: '#3b82f6', // Blue
    value: landUseData.landCover.water
  }
];

// Drought intensity points - for scatter plot or heatmap
export const droughtPoints = [
  {
    lat: 33.8,
    lng: 2.9,
    category: 'severe',
    intensity: 0.88, // Higher intensity for desert areas
    color: '#f97316', // Orange
  },
  {
    lat: 33.83,
    lng: 2.93,
    category: 'severe',
    intensity: 0.85,
    color: '#f97316',
  },
  {
    lat: 33.78,
    lng: 2.87,
    category: 'severe',
    intensity: 0.82,
    color: '#f97316',
  },
  {
    lat: 33.75,
    lng: 2.84,
    category: 'extreme',
    intensity: 0.93, // Extreme drought in some parts
    color: '#ef4444', // Red
  }
];

// Monthly drought indices for temporal analysis (for charts)
export const droughtIndices = [
  { month: 'Jan', value: 0.65 },
  { month: 'Feb', value: 0.68 },
  { month: 'Mar', value: 0.73 },
  { month: 'Apr', value: 0.81 },
  { month: 'May', value: 0.88 }, // Peak in summer months
  { month: 'Jun', value: 0.94 },
  { month: 'Jul', value: 0.92 },
  { month: 'Aug', value: 0.85 },
  { month: 'Sep', value: 0.78 },
  { month: 'Oct', value: 0.71 },
  { month: 'Nov', value: 0.69 },
  { month: 'Dec', value: 0.67 }
];

// Land use breakdown for pie charts
export const landUseBreakdown = [
  { name: 'Cultivated', value: landUseData.landCover.cultivatedTotal },
  { name: 'Forest', value: landUseData.landCover.forest },
  { name: 'Urban/Non-Vegetated', value: landUseData.landCover.urban + landUseData.landCover.nonVegetated },
  { name: 'Grassland', value: landUseData.landCover.grassland },
  { name: 'Water', value: landUseData.landCover.water }
];

// Slope data for slope analysis chart
export const slopeData = [
  { category: '0-2%', value: landUseData.slope.slope1 * 100 },
  { category: '2-5%', value: landUseData.slope.slope2 * 100 },
  { category: '5-10%', value: landUseData.slope.slope3 * 100 },
  { category: '10-15%', value: landUseData.slope.slope4 * 100 },
  { category: '15-30%', value: landUseData.slope.slope5 * 100 },
  { category: '30-45%', value: landUseData.slope.slope6 * 100 },
  { category: '45-60%', value: landUseData.slope.slope7 * 100 },
  { category: '>60%', value: landUseData.slope.slope8 * 100 }
];

// Aspect data for aspect analysis chart
export const aspectData = [
  { direction: 'North', value: landUseData.aspect.north * 100 },
  { direction: 'East', value: landUseData.aspect.east * 100 },
  { direction: 'South', value: landUseData.aspect.south * 100 },
  { direction: 'West', value: landUseData.aspect.west * 100 },
  { direction: 'Unknown', value: landUseData.aspect.unknown * 100 }
];