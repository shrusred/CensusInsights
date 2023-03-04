import "../ManagerPopulationStats/ManagerPopulationStats.scss";
import formdata from "../../../testdata/formdatatest.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ManagerPopulationStats() {
  console.log(formdata);
  const data = [
    { city: "Markham", age: 29 },
    { city: "Vaughn", age: 22 },
  ];
  const income = [
    { city: "Markham", income: 73300 },
    { city: "Vaughn", income: 90000 },
  ];

  return (
    <>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="age" fill="#8884d8" />
      </BarChart>
      <BarChart
        width={500}
        height={300}
        data={income}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#82ca9d" />
      </BarChart>
    </>
  );
}

export default ManagerPopulationStats;
