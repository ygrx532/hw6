import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


export function BarChart (props) {
    const {offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline} = props;
    let maximunCount = max(data, d => d.Count);
    const xScale = scaleLinear().range([0, width]).domain([0, maximunCount]).nice();
    const yScale = scaleBand().range([0, height]).domain(data.map(a => a.AirlineName)).padding(0.2) //The domain is the list of ailines names
    let color = (d) => d.AirlineID===selectedAirline? "#992a5b":"#2a5599";
    //TODO:
    //1.Change the mouse event in <rect/> to onClick;
    //2.Remove the onMouseOut in <rect />;
    const onClick = (d) => {
        if (selectedAirline === d.AirlineID) {
            setSelectedAirline(null);
        } else {
            setSelectedAirline(d.AirlineID);
        }
    };
    //4.Remove the onMouseOver and onMouseOut;
    
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        { data.map( d => {
            return <rect key={d.AirlineID} x={0} y={yScale(d.AirlineName)}
                width={xScale(d.Count)} height={yScale.bandwidth()} 
                onClick={() => onClick(d)}
                stroke="black" fill={color(d)}/>
        }) }
        <YAxis yScale={yScale} height={height} offsetX={offsetX}/>
        <XAxis xScale={xScale} width={width} height={height} />
    </g>
}