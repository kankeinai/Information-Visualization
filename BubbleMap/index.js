import { Marks } from './Marks';
import { Legend } from './Legend';
import {useState} from 'react';

export const BubbleMap = ({worldAtlas, colorScale, brushExtent, disasters, bubbleShow, temperatures, min_temp, max_temp}) =>{

    return(
      <g>
      <Legend x={35} y={10+70+300} text={"Hydrological disaster"} color={"hsl(180, 55%, 50%)"} class_legend={"legend_hydrological"}/>
    	<Legend x={235} y={10+70+300} text={"Meteorological disaster"} color={"hsl(266, 55%, 50%)"} class_legend={"legend_meteorological"}/>
    	<Legend x={435} y={10+70+300} text={"Climatological disaster"} color={"hsl(98, 73%, 50%)"} class_legend={"legend_climatological"}/>
      <Marks worldAtlas={worldAtlas} colorScale={colorScale} brushExtent={brushExtent} disasters={disasters} bubbleShow={bubbleShow} temperatures={temperatures} min_temp={min_temp} max_temp={max_temp}/>
      </g>
      );
  };
