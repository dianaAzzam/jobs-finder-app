import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import JobCard from "../common/JobCard";

const HomePage = ({ jobsList }) => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "70vw",
      }}
    >
      {jobsList.list.map((job) => (
        <JobCard job={job} type={"large"} />
      ))}
    </div>
  );
};
export default HomePage;
