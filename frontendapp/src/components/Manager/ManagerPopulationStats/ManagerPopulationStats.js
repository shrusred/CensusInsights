import "../ManagerPopulationStats/ManagerPopulationStats.scss";
import formdata from "../../../testdata/formdatatest.json";
import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
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
  const { userid } = useParams();
  // const [age, setAge] = useState([]);
  // const [gender, setGender] = useState([]);
  // const [yearlyincome, setYearlyIncome] = useState([]);
  // const [ethnicity, setEthnicity] = useState([]);
  // const [occupation, setOccupation] = useState([]);

  console.log(userid);

  const data = [
    { city: "Markham", age: 29 },
    { city: "Vaughn", age: 22 },
  ];
  const income = [
    { city: "Markham", income: 73300 },
    { city: "Vaughn", income: 90000 },
  ];
  function addArrayElements(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return sum;
  }

  function getCensusData(userid) {
    axios
      .get(`http://localhost:8080/manager/${userid}/census`)
      .then((response) => {
        console.log(response.data);
        var cities = [];
        var ethnicities = [];
        var occupations = [];
        var genders = [];
        var age = [];
        var yearlyincome = [];
        response.data.map((i) => {
          // console.log("age", i.age);
          // console.log(i.municipality_name);
          cities.push(i.municipality_name);
          genders.push(i.gender);
          ethnicities.push(i.ethnicity);
          occupations.push(i.occupation);
        });
        // console.log(cities);
        var cities_set = new Set(cities);
        var genders_set = new Set(genders);
        var ethnicites_set = new Set(ethnicites);
        var occupations_set = new Set(occupation);

        const unique_cities = Array.from(cities_set);
        const unique_genders = Array.from(genders_set);
        const unique_ethnicities = Array.from(ethnicites_set);
        const unique_occupations = Array.from(occupations_set);
        console.log(unique_cities);
        response.data.map((i) => {
          ///cities
          for (let j = 0; j < unique_cities.length; j++) {
            if (i.municipality_name === unique_cities[j]) {
              let newfield_age = { city: unique_cities[j], age: i.age };
              let newfield_yearlyincome = {
                city: unique_cities[j],
                yearlyincome: i.income,
              };
              age.push(newfield_age);
              yearlyincome.push(newfield_yearlyincome);
            }
          }
          ///gender
          for (let k = 0; k < unique_genders.length; k++) {
            if (i.gender === unique_genders[k]) {
              let newfield_gender = { city: unique_genders[k], age: i.gender };
            }
          }

          ///ethnicities
          for (let l = 0; l < unique_ethnicities.length; l++) {}

          ///occupation
          for (let m = 0; m < unique_occupations.length; m++) {}
        });
        console.log(age);
        console.log(yearlyincome);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCensusData(userid);
  }, []);

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
