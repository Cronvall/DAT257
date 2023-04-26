import React, {useEffect, useRef, useState} from 'react';
import { NextPage } from 'next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from '../pages/stock/stock.module.css';
interface stockgraph {
  prices: Array<number>;
dates: Array<string>;
}


const StockGraph: NextPage<stockgraph> = ({ prices,dates }) => {
  const data = dates.map((date, i) => ({ date, price: prices[i] }));

  
  


  return (
    
      <LineChart width={525} height={275} data={data} className={styles.chart}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
    </LineChart>
    
    
  );
};

export default StockGraph;

