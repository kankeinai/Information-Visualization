import React from 'react';
import {useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useWorldAtlas } from './useWorldAtlas';
import { useDisasters } from './useDisasters';
import { useTemperatures } from './useTemp';
import {BubbleMap} from './BubbleMap/index';
import {DateHistogram} from './DateHistogram/index'
import {min, max} from 'd3';

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

const xValue = d => d['start date'];
const type = d => d['Disaster Subgroup'];
const xTime = d => d['date'];

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

const App = () => {
  

    const worldAtlas = useWorldAtlas();
    const disasters = useDisasters();
  	const temperatures = useTemperatures();
  	
  	const [brushExtent, setBrushExtent] = useState();
  	const [bubbleShow, setBubble] = useState([0, 0, 0]);
  	const [defaultShow, setDefault] = useState([color, min_t, max_t, average, chosen_disaster, "none"]);
  
  
  	const [colorScale, setColorScale] = useState("Average");
  
    if (!worldAtlas || !disasters || !temperatures) {
      return <pre>Loading...</pre>;
    }
  	
  	var min_temp = -1.318
    var max_temp = 2.191
  
  	if (temperatures!== undefined){
    	 min_temp = min(temperatures, d=> d.Anomaly)
			 max_temp = max(temperatures, d=> d.Anomaly)
    }
  
    var filteredData = brushExtent ? disasters.filter(d => {
    	const date = xValue(d);
    	return date > brushExtent[0] && date < brushExtent[1];
  	}) : disasters;
  
  
  const filteredData2 = brushExtent ? temperatures.filter(d => {
    	const date = xTime(d);
    	return date > brushExtent[0] && date < brushExtent[1];
  	}) : temperatures;

    
   const Change1 = () => { 

    
     var temp = bubbleShow
     if (temp[0] == 1){    
     		temp[0] = 0
       
     }else{
     	temp[0] = 1
       
     }
     for (let i = 0; i < disasters.length; i++) {
      if (disasters[i]['Disaster Subgroup'] == 'Hydrological'){
        disasters[i]['display'] = temp[0]
      }
    }

     setBubble(temp)
      
  	}; 
  
  const Change2 = () => { 

  
     var temp = bubbleShow
     if (temp[1] == 1){
     		temp[1] = 0
     }else{
     	temp[1] = 1
       
     }
    for (let i = 0; i < disasters.length; i++) {
      if (disasters[i]['Disaster Subgroup'] == 'Meteorological'){
        disasters[i]['display'] = temp[1]
      }
    }
     setBubble(temp)
     
  	}; 
  
  const Change3 = () => {   

     var temp = bubbleShow
     if (temp[2] == 1){
     		temp[2] = 0
     }else{
     	temp[2] = 1
      
     }
    for (let i = 0; i < disasters.length; i++) {
      if (disasters[i]['Disaster Subgroup'] == 'Climatological'){
        disasters[i]['display'] = temp[2]
      }
    }
     setBubble(temp)
    
  	};
  
    const onChangeValue1 = () => { 
      setColorScale("Min")
  	}; 
  
  const onChangeValue2 = () => { 
    setColorScale("Average")
  	}; 
  const onChangeValue3 = () => { 
    setColorScale("Max")    
  	}; 
  	var min_date = ""
    var max_date = ""

  	if (brushExtent===undefined || brushExtent===null){
    	min_date = "start date"
      
    }else{
      min_date =brushExtent[0].toLocaleDateString('en-us', { year:"numeric", month:"short"})
    }

  if (brushExtent===undefined || brushExtent===null){
    	max_date = "end date"
    }else{
      max_date = brushExtent[1].toLocaleDateString('en-us', { year:"numeric", month:"short"})
    }

  
    return(
      <g>
        <p className="title">Disasters in [{min_date} - {max_date}] </p>
        <div className="filtering">
          <div className="check">Choose:</div>
      
          <div className="check">
          	<label>
            	<input type="checkbox" className ={"checkBlue"} onClick={Change1} /> Hydrological
          	</label>
          </div>
          <div className="check">
          	<label>
            	<input type="checkbox" className ={"checkGreen"} onClick={Change2} /> Meteorological
          	</label>
          </div>
          <div className="check">
          	<label>
            	<input type="checkbox" className ={"checkRed"} onClick={Change3} /> Climatological
          	</label>
          </div>
        </div>
        <div className="color_filtering" >
          <div className="check">Color:</div>
          <div className="check check1">
            <label>
              <input type="radio"  onClick={onChangeValue1}  name="color" value="Min" /> Min
            </label>
          </div>
          <div className="check check2">
          <label>
            <input type="radio"  onClick={onChangeValue2} name="color" value="Average" /> Average
          </label>	
            </div>
            <div className="check check3" >
          <label>
            <input type="radio"  onClick={onChangeValue3}  name="color"  value="Max"/> Max
        </label>
              </div>
          </div>
        
        
        <svg height={height} width={width}>      
          <g>
            <defs>
          <linearGradient
              id="linear-gradient"
          >
              <stop offset="0%" stop-color="hsl(80,90%,50%)" />
      				<stop offset="100%" stop-color="hsl(0,90%,50%)" />	
          </linearGradient>
              </defs>
          
          <rect x={650} y={100} width={225} height={50} fill='url(#linear-gradient)'/>
            
            <line x1="650" y1="155" x2="650" y2="160" stroke="black" />
            <line x1="875" y1="155" x2="875" y2="160" stroke="black" />
            <line x1="650" y1="160" x2="875" y2="160" stroke="black" />
            <g transform={`translate(630, 180)`}>
            	<text className="tickss">{min_temp.toPrecision(4)}</text>
            </g>
            <g transform={`translate(860, 180)`}>
            	<text className="tickss">{max_temp.toPrecision(4)}</text>
            </g>
            
          </g>
          <g>
            <BubbleMap worldAtlas={worldAtlas} colorScale={colorScale} brushExtent={brushExtent} disasters={filteredData} bubbleShow={bubbleShow} temperatures = {filteredData2} min_temp ={min_temp} max_temp={max_temp} />
          </g>		

          <g transform={`translate(0, ${height - dateHistogramSize*height - 125})`}>
            <DateHistogram setDefault={setDefault} data={disasters} height = {dateHistogramSize*height} width={580} setBrushExtent={setBrushExtent} xValue={xValue}/>
          </g>		
           <g transform={`translate(33, 268)`}>
            	<text className="tickss">Select range of dates</text>
            </g>
      	</svg>
      
        
      </g>
    );


};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
