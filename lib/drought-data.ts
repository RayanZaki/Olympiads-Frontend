// Drought and land use data for the dashboard visualization

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
    {
      type: 'Feature',
      properties: {
        intensity: 0.85,
        category: 'severe',
        color: '#f97316', // Orange
        description: 'Severe drought conditions'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-112, 38], [-110, 38], [-108, 40], 
          [-108, 42], [-110, 44], [-112, 44], 
          [-114, 42], [-114, 40], [-112, 38]
        ]]
      }
    },
    
    // Moderate Drought Regions (Central US)
    {
      type: 'Feature',
      properties: {
        intensity: 0.6,
        category: 'moderate',
        color: '#d97706', // Darker orange
        description: 'Moderate drought conditions'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-100, 35], [-98, 35], [-96, 37], 
          [-96, 39], [-98, 41], [-100, 41], 
          [-102, 39], [-102, 37], [-100, 35]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        intensity: 0.55,
        category: 'moderate',
        color: '#d97706', // Darker orange
        description: 'Moderate drought conditions'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-92, 32], [-90, 32], [-88, 34], 
          [-88, 36], [-90, 38], [-92, 38], 
          [-94, 36], [-94, 34], [-92, 32]
        ]]
      }
    },
    
    // Low Drought Regions (Eastern US)
    {
      type: 'Feature',
      properties: {
        intensity: 0.3,
        category: 'low',
        color: '#737373', // Gray
        description: 'Low drought conditions'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-80, 36], [-78, 36], [-76, 38], 
          [-76, 40], [-78, 42], [-80, 42], 
          [-82, 40], [-82, 38], [-80, 36]
        ]]
      }
    }
  ]
}

// Drought intensity points data
export const droughtPoints = [
  { lat: 37.7749, lng: -122.4194, intensity: 0.9, color: '#f97316', category: 'severe' }, // Orange
  { lat: 34.0522, lng: -118.2437, intensity: 0.85, color: '#f97316', category: 'severe' }, // Orange
  { lat: 36.1699, lng: -115.1398, intensity: 0.95, color: '#f97316', category: 'severe' }, // Orange
  { lat: 32.7157, lng: -117.1611, intensity: 0.8, color: '#f97316', category: 'severe' }, // Orange
  { lat: 40.7128, lng: -74.0060, intensity: 0.4, color: '#737373', category: 'low' }, // Gray
  { lat: 29.7604, lng: -95.3698, intensity: 0.7, color: '#d97706', category: 'moderate' }, // Darker orange
  { lat: 32.7767, lng: -96.7970, intensity: 0.65, color: '#d97706', category: 'moderate' }, // Darker orange
  { lat: 39.0997, lng: -94.5786, intensity: 0.5, color: '#d97706', category: 'moderate' }, // Darker orange
  { lat: 41.8781, lng: -87.6298, intensity: 0.3, color: '#737373', category: 'low' }, // Gray
  { lat: 33.4484, lng: -112.0740, intensity: 0.9, color: '#f97316', category: 'severe' }, // Orange
  { lat: 39.7392, lng: -104.9903, intensity: 0.8, color: '#f97316', category: 'severe' }, // Orange
  { lat: 47.6062, lng: -122.3321, intensity: 0.5, color: '#d97706', category: 'moderate' }, // Darker orange
  { lat: 45.5152, lng: -122.6784, intensity: 0.6, color: '#d97706', category: 'moderate' }, // Darker orange
  { lat: 44.9778, lng: -93.2650, intensity: 0.4, color: '#737373', category: 'low' }, // Gray
  { lat: 30.2672, lng: -97.7431, intensity: 0.7, color: '#d97706', category: 'moderate' }, // Darker orange
  { lat: 35.7796, lng: -78.6382, intensity: 0.35, color: '#737373', category: 'low' }, // Gray
  { lat: 28.5383, lng: -81.3792, intensity: 0.25, color: '#737373', category: 'low' }, // Gray
  { lat: 33.7490, lng: -84.3880, intensity: 0.4, color: '#737373', category: 'low' }, // Gray
  { lat: 36.1627, lng: -86.7816, intensity: 0.55, color: '#d97706', category: 'moderate' }, // Darker orange
  { lat: 38.9072, lng: -77.0369, intensity: 0.3, color: '#737373', category: 'low' }, // Gray
]
