import "./App.css";
import { useEffect, useState, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./configs/theme";
import { getJobs } from "./configs/api";
import Header from "./components/common/Header";
import HomePage from "./components/Pages/HomePage";
import JobsDetailsPage from "./components/Pages/JobDetailsPage";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const [jobsList, setJobsList] = useState({
    page: 0,
    list: [],
    total: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const listJobs = async (page, limit, itemQuery) => {
    const res = await getJobs(page, limit, itemQuery);
    setJobsList({ page: page, list: res.jobs, total: res.total });
    setLoading(false);
  };

  const getSearchResults = () => {
    setLoading(true);
    listJobs(null, 20, searchInput);
  };

  const changePage = (page) => {
    setLoading(true)
    listJobs(page, 20, searchInput);
  };

  const changeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    listJobs(0, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Suspense fallback="loading">
        <ThemeProvider theme={theme}>
          <Header
            changeSearchInput={changeSearchInput}
            getSearchResults={getSearchResults}
            loading={loading}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  jobsList={jobsList}
                  changePage={changePage}
                  loading={loading}
                />
              }
            />
            <Route
              path="jobs/:uri"
              element={<JobsDetailsPage jobsList={jobsList} loading={loading}/>}
            />
          </Routes>
        </ThemeProvider>
      </Suspense>
    </Router>
  );
}

export default App;
