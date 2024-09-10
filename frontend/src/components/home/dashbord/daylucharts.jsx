import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
const Dailychart = ({ data }) => {
    const dates = data.map(item => format(new Date(item.date), 'yy MMM dd'));
    const counts = data.map(item => item.count);
    const chartData = {
        labels: dates,
        datasets: [
          {
            label: 'Inscription quotidienne des représentants', 
            data: counts,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.6)',
            hoverBorderColor: 'rgba(75,192,192,1)',
          },
        ],
      };

    return <Line data={chartData} />;
};

export default Dailychart;