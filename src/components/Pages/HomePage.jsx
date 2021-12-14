import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import JobCard from "../common/JobCard";
import Pagination from "@mui/material/Pagination";
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = ({ jobsList, changePage, loading }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const onPageChange = (e, value) => {
    debugger;
    setPage(value);
    changePage(value - 1);
  };
  useEffect(() => {
    debugger;
    if (jobsList?.total) {
      const calculatedCount = Math.ceil(jobsList.total / 20);
      setCount(calculatedCount);
    }
  }, [jobsList]);
  return (
    <div className="col-class-js page-cont">
      <h3 className="heading">{t("recentOpening")}</h3>
      <div className="cards-cont">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {jobsList.list.map((job) => (
              <JobCard job={job} type={"large"} />
            ))}
          </>
        )}
      </div>
      <div className="page-cont flex-center">
        <Pagination count={count} page={page} onChange={onPageChange} />
      </div>
    </div>
  );
};
export default HomePage;
