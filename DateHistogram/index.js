import {Marks} from './Marks'
import { csv, scaleLinear, scaleTime, max, timeFormat,sum, extent, histogram as bin, timeYears, brushX, select, event} from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import  React, {useRef, useState, useEffect} from 'react';

const addOneDayToDate = (date) => {
  date.setDate(date.getDate() + 1)
  return date
}
const subtractOneDayToDate = (date) => {
  date.setDate(date.getDate() - 1)
  return date
}
  
const margin = { top: 0, right: 10, bottom: 30, left: 40 };

var color = "hsl(204, 8%, 76%)"
var min_t = "..."
var max_t = "..."
var average = "..."
const chosen_disaster = {
        "Disaster Subgroup": "...",
        "Disaster Type": "...",
        "Event Name": "...",
        "Latitude": "...",
        "Longitude": "...",
        'Total Affected':"..."
}

export const DateHistogram = (

  {
   setDefault, data, height, width, setBrushExtent, xValue
  }) =>{
   
  
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  const xAxisLabelOffset = 25;
	const yAxisLabelOffset = 25;

  const xAxisLabel = 'Time';


  const xAxisTickFormat = timeFormat('%Y');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  
  function check1(value){
  	if (value['Disaster Subgroup'] == "Climatological"){
    	return true;
    }else{
    	return false;
    }
  };
    function check2(value){

  	if (value['Disaster Subgroup'] == "Hydrological"){
    	return true;
    }else{
    	return false;
    }
  };
    function check3(value){
  	if (value['Disaster Subgroup'] == "Meteorological"){
    	return true;
    }else{
    	return false;
    }
  };
  
  const [start, stop] = xScale.domain()
  
  const binnedData = bin()
  .value(xValue)
  .domain(xScale.domain())
  .thresholds(timeYears(start, stop))(data)
  .map(array=>({
    totalClimatological: (array).filter(check1).length,
    totalHydrological: (array).filter(check2).length,
    totalMeteorological: (array).filter(check3).length,
    x0: array.x0,
    x1: array.x1
  }));
  
  const yAxisLabel = 'Frequency';
  const yScale = scaleLinear()
    .domain([0, max(binnedData, d=> d.totalClimatological+d.totalHydrological+d.totalMeteorological )])
    .range([innerHeight, 0]);
  
  const brushRef = useRef();

  useEffect(() => {
    
    const brush = brushX().extent([[1, 1], [innerWidth, innerHeight]]);
    brush(select(brushRef.current));
    brush.on('brush end', () => { 
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight]);
  
  return(
     <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={d => d}
          circleRadius={2}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
      </g>
    </>
  )

};
