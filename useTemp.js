import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/kankeinai/eb8b665e1110802d5101bc9389697dd0/raw/edaea70273a804090c50772b1f6b0cdbdec6aee8/temperatures.csv'
const row = d =>{
  d.Average = +d.Average;
  d.Anomaly = +d.Anomaly;
  d.date = new Date(d['date']);
  return d;
}

export const useTemperatures = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
