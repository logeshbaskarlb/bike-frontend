import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import "chart.js/auto";

import {
  Chart as ChartJs, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Chart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5050/getBikeSelections');

      const labels = res.data.map(entry => entry.username); 
      const data = res.data.map(entry => {
        const startTime = new Date(entry.startTime).getTime();
        const stopTime = entry.stopTime ? new Date(entry.stopTime).getTime() : Date.now();
        return (stopTime - startTime) / 1000 / 60;
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Time Spent (Minutes)',
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get the data on component mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>Bike Assembly Time Chart</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && chartData && (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default Chart;
