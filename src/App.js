import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./configs/theme";
import HomePage from "./components/Pages/HomePage";
import JobsDetailsPage from "./components/Pages/JobDetailsPage";
import { getJobs } from "./configs/api";
function App() {
  const [jobsList, setJobsList] = useState({ page: 0, list: [], total: 0 });
  const [searchInput, setSearchInput] = useState("");

  const listJobs = async (page, limit, itemQuery) => {
    const res = await getJobs(page, limit, itemQuery);
    setJobsList({ page: page, list: res.jobs, total: res.total });
  };

  const getSearchResults = () => {
    listJobs(null, 20, searchInput);
  };

  const changePage = (page) => {
    debugger;
    listJobs(page, 20, searchInput);
  };

  const changeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    listJobs(0, 20);
  }, []);

  return (
    <Router>
      <Suspense fallback="loading">
        <ThemeProvider theme={theme}>
          <Header
            changeSearchInput={changeSearchInput}
            getSearchResults={getSearchResults}
          />
          <Routes>
            <Route
              path="/"
              element={<HomePage jobsList={jobsList} changePage={changePage} />}
            />
            <Route
              path="jobs/:uri"
              element={<JobsDetailsPage jobsList={jobsList} />}
            />
          </Routes>
          <Footer />
        </ThemeProvider>
      </Suspense>
    </Router>
  );
}

export default App;
