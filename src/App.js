import React from "react";
import Papa from "papaparse";
import MainPage from "./components/MainPage";
import LanguagesPage from "./components/LanguagesPage";
import AppUsersPage from "./components/AppUsersPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function () {
  const [rows, setRows] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [appUsers, setAppUsers] = React.useState([]);
  React.useEffect(() => {
    async function getData() {
      const csv = await fetch("/data/Data.csv")
        .then((response) => response.text())
        .then((text) => text);
      const results = Papa.parse(csv, { header: true });
      const rows = results.data;

      setRows(rows);
      const countriesData = [...new Set(rows.map((s) => s.countryCode))].map(
        (c) => {
          return {
            code: c !== undefined ? c.toUpperCase() : c,
            value: rows.filter((s) => s.countryCode === c).length,
          };
        }
      );
      setCountries(countriesData);
      const languageData = [...new Set(rows.map((s) => s.language))].map(
        (c) => {
          return {
            language: c,
            male: rows.filter((s) => s.language === c && s.gender === "M")
              .length,
            female: rows.filter((s) => s.language === c && s.gender === "F")
              .length,
          };
        }
      );
      setLanguages(languageData);

      const appUsersData = [
        {
          name: "IosUsers",
          y: rows.filter(
            (s) => s.hasAndroidApp === "False" && s.hasIosApp === "True"
          ).length,
          z: 92.9,
        },
        {
          name: "BothIos&Andriod",
          y: rows.filter(
            (s) => s.hasAndroidApp === "True" && s.hasIosApp === "True"
          ).length,
          z: 235.6,
        },
        {
          name: "AndriodUsers",
          y: rows.filter(
            (s) => s.hasAndroidApp === "True" && s.hasIosApp === "False"
          ).length,
          z: 137.5,
        },
        {
          name: "HasNoApp",
          y: rows.filter((s) => s.hasAnyApp === "False").length,
          z: 118.7,
        },
      ];
      setAppUsers(appUsersData);
    }
    getData();
  }, []); // [] means just do this once, after initial render
  console.log("rows:", rows);
  return (
    <Container>
      <MainPage countries={countries} />
      <LanguagesPage lang={languages} />
      <AppUsersPage appUsers={appUsers} />
    </Container>
  );
}
