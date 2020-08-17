import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import variablePie from "highcharts/modules/variable-pie.js";

variablePie(Highcharts);
let data = null;

const chart = {
  chart: {
    type: "variablepie",
  },
  title: {
    text: "Moible App Users",
  },
  credits: {
    enabled: false,
  },
  tooltip: { enabled: true },

  series: [
    {
      minPointSize: 10,
      innerSize: "20%",
      zMin: 0,
      name: "appUsers",
      data,
    },
  ],
};

export default function AppUsersPage({ appUsers }) {
  const [countries, setCountries] = useState("");
  const [options, setOptions] = useState(chart);
  if (appUsers.length) {
    chart.series[0].data = appUsers;
  } else {
    return <p>Loading</p>;
  }
  return (
    <div id="container">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={"chart"}
      />
    </div>
  );
}
