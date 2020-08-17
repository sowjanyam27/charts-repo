import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highchartsMap from "highcharts/modules/map";
import mapData from "@highcharts/map-collection/custom/world.geo.json";

highchartsMap(Highcharts);
let data = null;

const plotOptions = {
  series: {
    color: "black",
  },
};

const chart = {
  chart: {
    map: "world",
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  tooltip: { enabled: true },
  mapNavigation: {
    enabled: true, //ability to zoom
  },
  colors: [
    "#BD5BB3",
    "#B140A6",
    "#9A32A1",
    "#751E7B",
    "#662DA6",
    "#220D7A",
    "#1B0967",
  ],

  plotOptions,

  legend: {
    title: {
      text: "Users per Country",
    },
    align: "right",
    verticalAlign: "top",
    floating: true,
    layout: "vertical",
    valueDecimals: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    symbolRadius: 0,
    symbolHeight: 14,
  },
  colorAxis: {
    dataClassColor: "category",
    dataClasses: [
      {
        to: 3,
      },
      {
        from: 3,
        to: 10,
      },
      {
        from: 10,
        to: 30,
      },
      {
        from: 30,
        to: 100,
      },
      {
        from: 100,
        to: 300,
      },
      {
        from: 300,
        to: 1000,
      },
      {
        from: 1000,
      },
    ],
  },

  series: [
    {
      data,
      mapData: mapData,
      joinBy: ["iso-a2", "code"],
      name: "Number of Users",
      states: {
        hover: {
          borderColor: "#303030",
          borderWidth: 2,
        },
      },
    },
  ],
};

export default function MainPage(props) {
  const [countries, setCountries] = useState("");
  const [options, setOptions] = useState(chart);
  if (props.countries.length) {
    chart.series[0].data = props.countries;
  } else {
    return <p>Loading</p>;
  }
  return (
    <div id="container">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={"mapChart"}
      />
    </div>
  );
}
