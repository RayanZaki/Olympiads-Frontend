// Land use data for the drought dashboard

// Land use data for FIPS 1001 (Autauga County, Alabama)
export const landUseData = {
  fips: "1001",
  lat: 32.536382,
  lon: -86.64449,
  elevation: 63,
  slope: {
    slope1: 0.0419, // 0-2%
    slope2: 0.2788, // 2-5%
    slope3: 0.2984, // 5-10%
    slope4: 0.2497, // 10-15%
    slope5: 0.1142, // 15-30%
    slope6: 0.017,  // 30-45%
    slope7: 0.0,    // 45-60%
    slope8: 0.0     // >60%
  },
  aspect: {
    north: 0.1033,
    east: 0.1859,
    south: 0.2003,
    west: 0.1898,
    unknown: 0.3207
  },
  landCover: {
    water: 0.997399985790253,
    nonVegetated: 27.9404983520508,
    urban: 0.28889998793602,
    grassland: 2.75027370452881,
    forest: 10.7147026062012,
    cultivatedRainfed: 56.2934112548828,
    cultivatedIrrigated: 1.01481103897095,
    cultivatedTotal: 57.3082237243652
  },
  soilQuality: {
    sq1: 1,
    sq2: 1,
    sq3: 1,
    sq4: 1,
    sq5: 1,
    sq6: 1,
    sq7: 2
  }
};

// Convert the land use data to GeoJSON format
export const countyGeoJson = {
  type: 'FeatureCollection',
  features: [
    // County polygon showing drought level
    {
      type: 'Feature',
      properties: {
        intensity: 0.75,
        category: 'moderate',
        color: '#d97706', // Amber
        description: 'Moderate drought conditions in Autauga County',
        fips: '1001',
        name: 'Autauga County, Alabama'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-86.8, 32.4], [-86.5, 32.4], [-86.3, 32.6], 
          [-86.5, 32.7], [-86.8, 32.7], [-87.0, 32.6], 
          [-86.8, 32.4]
        ]]
      }
    }
  ]
};

// Land use markers for visualization
export const landUseMarkers = [
  {
    lat: 32.536382,
    lng: -86.64449,
    category: 'forest',
    intensity: 0.11, // Normalized forest coverage
    color: '#166534', // Green
    value: landUseData.landCover.forest
  },
  {
    lat: 32.526382,
    lng: -86.67449,
    category: 'cropland',
    intensity: 0.57, // Normalized cultivated land coverage
    color: '#f59e0b', // Amber
    value: landUseData.landCover.cultivatedTotal
  },
  {
    lat: 32.546382,
    lng: -86.61449,
    category: 'urban',
    intensity: 0.28, // Normalized urban coverage
    color: '#6b7280', // Gray
    value: landUseData.landCover.urban + landUseData.landCover.nonVegetated
  },
  {
    lat: 32.516382,
    lng: -86.63449,
    category: 'water',
    intensity: 0.01, // Normalized water coverage
    color: '#3b82f6', // Blue
    value: landUseData.landCover.water
  }
];

// Drought intensity points - for scatter plot or heatmap
export const droughtPoints = [
  {
    lat: 32.536382,
    lng: -86.64449,
    category: 'moderate',
    intensity: 0.68,
    color: '#d97706', // Amber
  },
  {
    lat: 32.546382,
    lng: -86.66449,
    category: 'moderate',
    intensity: 0.72,
    color: '#d97706',
  },
  {
    lat: 32.526382,
    lng: -86.62449,
    category: 'moderate',
    intensity: 0.65,
    color: '#d97706',
  },
  {
    lat: 32.516382,
    lng: -86.68449,
    category: 'severe',
    intensity: 0.83,
    color: '#f97316', // Orange
  }
];

// Monthly drought indices for temporal analysis (for charts)
export const droughtIndices = [
  { month: 'Jan', value: 0.45 },
  { month: 'Feb', value: 0.48 },
  { month: 'Mar', value: 0.53 },
  { month: 'Apr', value: 0.61 },
  { month: 'May', value: 0.68 },
  { month: 'Jun', value: 0.74 },
  { month: 'Jul', value: 0.72 },
  { month: 'Aug', value: 0.65 },
  { month: 'Sep', value: 0.58 },
  { month: 'Oct', value: 0.51 },
  { month: 'Nov', value: 0.49 },
  { month: 'Dec', value: 0.47 }
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
