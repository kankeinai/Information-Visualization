export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  circleRadius,
  innerHeight 
}) =>
  binnedData.map(d => (
    <g>
      <rect
        className="mark"
      	x={xScale(d.x0)}
        y={yScale(d.totalClimatological)}
        width = {xScale(d.x1)-xScale(d.x0)}
        height ={innerHeight - yScale(d.totalClimatological)}
        fill={"hsl(98, 73%, 50%)"}
      >

        <title>{tooltipFormat(d.totalClimatological)}</title>
      </rect>
      <rect
        className="mark"
        x={xScale(d.x0)}
        y={yScale(d.totalClimatological+d.totalMeteorological)}
        width = {xScale(d.x1)-xScale(d.x0)}
        height ={innerHeight - yScale(d.totalMeteorological)}

        fill={"hsl(266, 55%, 50%)"}
      >

        <title>{tooltipFormat(d.totalMeteorological)}</title>
      </rect>
      <rect
        className="mark"
        x={xScale(d.x0)}
        y={yScale(d.totalClimatological+d.totalMeteorological+d.totalHydrological)}
        width = {xScale(d.x1)-xScale(d.x0)}
        height ={innerHeight - yScale(d.totalHydrological)}
        fill={"hsl(180, 55%, 50%)"}
      >
        <title>{tooltipFormat(d.totalHydrological)}</title>
      </rect>
    </g>
  ));
