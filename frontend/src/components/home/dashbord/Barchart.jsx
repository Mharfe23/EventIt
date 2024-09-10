import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React from 'react';


const RepresentativesBarChart = ({ data }) => {
  if(data.length === 0) return <div>No data</div>
    return (
      <ResponsiveContainer width="100%"  height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
        top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="business_name" hide />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Représentant" fill="#8884d8" />
       
      </BarChart>
      </ResponsiveContainer>
    );
};
export default RepresentativesBarChart;