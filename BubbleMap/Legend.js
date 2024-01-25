export const Legend = ({x, y, text, color, class_legend}) =>{
return(
  <g className={class_legend}>
        <rect x={x-35} y={y} fill={color} width={25} height={15}/>
        <text x={x}  y={y+13} width={100} height={200} className="legend">{text}</text>
  </g>
      
);
};