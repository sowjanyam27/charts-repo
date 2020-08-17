import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LanguagesPage(props) {
  return (
    <div style={{ marginLeft: "400px" }}>
      <p style={{ marginLeft: "200px" }}>Languages Spoken </p>
      <BarChart
        width={500}
        height={300}
        data={props.lang}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="language" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="male" fill="#63A1E7" />
        <Bar dataKey="female" fill="#B01DA2" />
      </BarChart>
    </div>
  );
}
