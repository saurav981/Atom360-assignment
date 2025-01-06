import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

export const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const apiURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/charts`;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(apiURL);
      setChartData(data);
    })();
  }, [apiURL]);

  return (
    <div className="flex">
      <ResponsiveContainer height={300} width={500}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
