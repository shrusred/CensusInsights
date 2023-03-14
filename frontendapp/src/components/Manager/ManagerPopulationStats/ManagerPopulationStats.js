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
  LabelList,
} from "recharts";

function ManagerPopulationStats() {
  const { userid } = useParams();
  const [age, setAge] = useState([]);
  const [yearlyincome, setYearlyIncome] = useState([]);
  // const [ethnicity, setEthnicity] = useState([]);
  // const [occupation, setOccupation] = useState([]);
  // console.log(userid);

  const data = [
    { city: "Markham", age: 29 },
    { city: "Vaughn", age: 22 },
  ];
  const income = [
    { city: "Markham", income: 73300 },
    { city: "Vaughn", income: 90000 },
    { city: "Vaughn", income: 10000 },
    { city: "Vaughn", income: 50000 },
    { city: "Vaughn", income: 120000 },
  ];
  function addArrayElements(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return sum;
  }
  ////////////////////// AGE  ///////////////////////////////
  function getAgebyCity(userid) {
    axios
      .get(`http://localhost:8080/manager/${userid}/census`)
      .then((response) => {
        var cities = [];
        var age = [];

        response.data.map((i) => {
          cities.push(i.municipality_name);
        });
        //sets
        var cities_set = new Set(cities);
        //unique cities
        const unique_cities = Array.from(cities_set);
        //get metrics for cities
        response.data.map((i) => {
          for (let j = 0; j < unique_cities.length; j++) {
            if (i.municipality_name === unique_cities[j]) {
              let newfield_age = { city: unique_cities[j], age: i.age };

              age.push(newfield_age);
            }
          }
        });
        console.log("age array", age);
        setAge(age);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ///////////////////////// INCOME //////////////////////////////////////
  function getIncomebyCity(userid) {
    axios
      .get(`http://localhost:8080/manager/${userid}/census`)
      .then((response) => {
        var cities = [];

        var yearlyincome = [];
        response.data.map((i) => {
          cities.push(i.municipality_name);
        });
        //sets
        var cities_set = new Set(cities);
        //unique cities
        const unique_cities = Array.from(cities_set);
        //get metrics for cities
        response.data.map((i) => {
          for (let j = 0; j < unique_cities.length; j++) {
            if (i.municipality_name === unique_cities[j]) {
              let newfield_yearlyincome = {
                city: unique_cities[j],
                yearlyincome: i.income,
              };
              yearlyincome.push(newfield_yearlyincome);
            }
          }
        });
        console.log("yearlyincome array", yearlyincome);
        setYearlyIncome(yearlyincome);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAgebyCity(userid);
    getIncomebyCity(userid);
  }, []);

  /////////// AVG. AGE ///////////////

  let age_result = Object.entries(
    age.reduce((acc, x) => {
      let age = acc[x.city] || [];
      age.push(x.age);
      acc[x.city] = age;
      return acc;
    }, {})
  ).map((x) => {
    let city = x[0];
    // console.log(city);
    let ages = x[1];
    // console.log(ages);
    let sum = ages.reduce((a, b) => a + b, 0);
    let avg = sum / ages.length || 0;
    return { city: city, age: avg };
  });

  // console.log(age_result);

  ////////// AVG. INCOME ///////////////
  let income_result = Object.entries(
    yearlyincome.reduce((acc, x) => {
      let income = acc[x.city] || [];
      income.push(x.yearlyincome);
      acc[x.city] = income;
      return acc;
    }, {})
  ).map((x) => {
    let city = x[0];
    // console.log(city);
    let incomes = x[1];
    // console.log(ages);
    let sum = incomes.reduce((a, b) => a + b, 0);
    let avg = sum / incomes.length || 0;
    return { city: city, income: avg };
  });

  console.log("income average:", income_result);

  return (
    <>
      <BarChart
        width={500}
        height={300}
        data={age_result}
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
      {/*************************************************/}
      <BarChart
        width={500}
        height={300}
        data={income_result}
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
