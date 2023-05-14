import React, { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";


interface Iprops {
    data?: any;
}


export default function LeagueChart(props: Iprops) {

    const [graphdata, setGraphData] = useState([
        {
          name: "Jan",
          return: 10000,
          leaugeReturn: 10000,
          NASDAQ: 10000
          },
          {
          name: "Feb",
          return: 8000,
          leaugeReturn: 11500,
          NASDAQ: 9000
          },
          {
          name: "Mar",
          return: 11000,
          leaugeReturn: 9600,
          NASDAQ: 10300
          },
          {
          name: "Apr",
          return: 15000,
          leaugeReturn: 12000,
          NASDAQ: 10300
          },
          {
          name: "May",
          return: 22000,
          leaugeReturn: 11000,
          NASDAQ: 10400
          },
          {
          name: "Jun",
          return: 3000,
          leaugeReturn: 10750,
          NASDAQ: 11200
          },
        ]);

    return (
        <div 
            style={{
            width: "35vw", height:"25rem",
            minHeight:"20rem", minWidth:"35rem",
            backgroundColor: "rgba(255,255,255,0.25)",
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)"
        }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={graphdata}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="return" stroke="#8884d8"  />
                    <Line type="monotone" dataKey="leaugeReturn" stroke="#82ca9d" strokeDasharray="3 5"/>
                    <Line type="monotone" dataKey="NASDAQ" stroke="#dec018"  strokeDasharray="3 5"/>
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
