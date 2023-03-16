import "../ManagerPopulationStats/ManagerPopulationStats.scss";
import formdata from "../../../testdata/formdatatest.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  const navigate = useNavigate();
  const { userid } = useParams();
  const [age, setAge] = useState([]);
  const [yearlyincome, setYearlyIncome] = useState([]);
  // const [ethnicity, setEthnicity] = useState([]);
  // const [occupation, setOccupation] = useState([]);
  // console.log(userid);
  function handleBack() {
    navigate(`/manager/home/${userid}`);
  }

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
        // console.log("age array", age);
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
        // console.log("yearlyincome array", yearlyincome);
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

  // console.log("income average:", income_result);

  return (
    <>
      <ArrowBackIcon className="backarrow" onClick={handleBack} />

      <div className="charts">
        <div className="charts__age">
          <BarChart
            width={480}
            height={400}
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
            <YAxis
              label={{
                value: "Average",
                angle: -90,
                position: "insideLeft",
                offset: -10,
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="age" fill="#8884d8" />
          </BarChart>
        </div>
        {/*************************************************/}
        <div className="charts__income">
          <BarChart
            width={480}
            height={400}
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
            <YAxis
              label={{
                value: "Average",
                angle: -90,
                position: "insideLeft",
                offset: -10,
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className="charts__comingsoon">
          <div className="charts__comingsoon--chart">
            <p>Occupation stats coming soon..</p>
          </div>
          <div className="charts__comingsoon--chart">
            <p>Ethnicity stats coming soon..</p>
          </div>
          <div className="charts__comingsoon--chart">
            <p>Gender stats coming soon..</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPopulationStats;
