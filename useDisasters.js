import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const options = {
  style: 'decimal',  // Other options: 'currency', 'percent', etc.
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};
const csvUrl = 'https://gist.githubusercontent.com/kankeinai/eb8b665e1110802d5101bc9389697dd0/raw/edaea70273a804090c50772b1f6b0cdbdec6aee8/disasters.csv'
const row = d =>{
  d.Latitude = +d.Latitude;
  d.Longitude = +d.Longitude;
  
  d.Latitude = d.Latitude.toPrecision(4);
  d.Longitude = d.Longitude.toPrecision(4);
  
  if (d['Event Name'] == ""){
  	d['Event Name'] = "Not given"
  }
  
  d['Total Affected'] = +d['Total Affected'];
  d['Total Affected'] = d['Total Affected'].toLocaleString('en-US', options);
  d['Size'] = +d['Size'];
  d['start date'] = new Date(d['start date']);
  if (d['color']=="blue"){
  	d['sub_color'] = "hsl(180, 55%, 50%)";
  }
  if (d['color']=="red"){
  	d['sub_color'] = "hsl(98, 73%, 50%)";
  }
  if (d['color']=="green"){
  	d['sub_color'] = "hsl(266, 55%, 50%)"
  }
  d['display'] = 0
  return d;
  
}

export const useDisasters = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
