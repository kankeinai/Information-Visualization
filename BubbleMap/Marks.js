import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
import {useState} from 'react';
const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
import {min, max, maxIndex} from 'd3';

const xSize = d => d['size'];


export const Marks = ({ worldAtlas: { land, interiors },  colorScale, brushExtent, disasters, bubbleShow, temperatures, min_temp, max_temp}) =>{


  var average = "...";  
  var climate = 0
  var hydro = 0
  var meteo = 0
    
  
  	var min_t = -1.318
    var max_t = 2.191
  
  	if (temperatures!== undefined || temperatures!==null){
       var sum = 0;

      	for (var item of temperatures) {
              sum += item['Anomaly'];
        }
      average = sum/temperatures.length
      
    	 max_t = max(temperatures, d=> d.Anomaly);
			 min_t = min(temperatures, d=> d.Anomaly);
      if (max_t== undefined){
        max_t = "NaN";
      }
      if (min_t== undefined){
        
      	min_t = "NaN";
      };
    }else{
      min_t = "..."
    	max_t = "..."
    	average = "..."
    
    }
  
  
  var min_date = min(disasters, d=> d['start date'])
  var max_date = max(disasters, d=> d['start date'])
  
  

  var percentage = 1
  
  if (colorScale == "Average"){
  	percentage = 1-(average-min_temp)/(max_temp-min_temp);
  }

	if (colorScale == "Max"){
  	percentage = 1-(max_t-min_temp)/(max_temp-min_temp);
  }
	
  if (colorScale == "Min"){
  	percentage = 1-(min_t-min_temp)/(max_temp-min_temp);
  }
	var chosen_disaster = undefined
  if (disasters!==undefined){
    var colSize = disasters.map(function(d){return d.Size})
    var idx = colSize.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    chosen_disaster = disasters[idx]
  }
  
  if (chosen_disaster===undefined || brushExtent===undefined || brushExtent===null){
      chosen_disaster = {
        "Disaster Subgroup": "...",
        "Disaster Type": "...",
        "Event Name": "...",
        "Latitude": "...",
        "Longitude": "...",
        'Total Affected':"..."
      }
      
    }
  var color = "hsl(204, 8%, 76%)"
  
  if (brushExtent===undefined || brushExtent===null || temperatures===null){
  	min_t = "..."
    max_t = "..."
    average = "..."
    color = "hsl(204, 8%, 76%)"
  }else{

  	color = "hsl("+80*percentage+",90%,50%)"
    average = average.toPrecision(4)
  }
  
  
    
  
  
  return(
  <g>
      <g transform={`translate(600, 15)`}>
        <text className="cat">Anomaly temperature</text>  
      </g>
      <g transform={`translate(600, 45)`}>
        <text>Min anomaly: {min_t}</text>  
      </g>
      <g transform={`translate(600, 65)`}>
      	<text>Average anomaly: {average}</text>    
      </g>
      <g transform={`translate(600, 85)`}>
      <text>Max anomaly: {max_t}</text>  
       </g>
      
      <line x1="600" y1="200" x2="900" y2="200" stroke="hsl(197, 10%, 87%)" />
      
      <g transform={`translate(600, 230)`}>
        <text className="cat">The worst disaster in period</text>  
      </g>
      <g transform={`translate(600, 265)`}>
        <text>Disaster Subgroup: {chosen_disaster['Disaster Subgroup']}</text>  
      </g>
      <g transform={`translate(600, 285)`}>
      	<text>Disaster Type: {chosen_disaster['Disaster Type']}</text>    
      </g>
      <g transform={`translate(600, 305)`}>
      <text>Event Name: {chosen_disaster['Event Name']}</text>  
       </g>
      <g transform={`translate(600, 325)`}>
      <text>Location: ({chosen_disaster['Latitude']}, {chosen_disaster['Longitude']})</text>  
       </g>
      
      <g transform={`translate(600, 355)`}>
      <text>Total number affected: {chosen_disaster['Total Affected']}</text>  
       </g>

      
   		
  <g className="marks"  transform={`scale(0.6 0.6) translate(0, 15)`}>
      
    <path className="sphere" d={path({ type: 'Sphere' })} />
    <path className="graticules" d={path(graticule())} />
    {land.features.map(feature => (
      <path className="land" d={path(feature)} fill={color}/>
    ))}
    <path className="interiors" d={path(interiors)} fill={color}/>
    
  	
     
    {
    
      disasters.map(d=>{
        var display = "block"
        if (brushExtent === undefined || brushExtent=== null){
        	display="none"
        }
      
    	const [x,y] = projection([d.Longitude, d.Latitude]);
      return (
        <g>
        	<circle cx={x} cy={y} r={(d.Size*60+2)} className={"bubble_"+d["color"]} fill={d["sub_color"]} opacity={d['display']*0.8} display={display}/>
        </g>
        )})
    };
  	</g> 
    </g>
     

)
} ;

