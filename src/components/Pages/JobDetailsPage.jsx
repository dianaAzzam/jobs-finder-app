import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@mui/material/Button";
import JobCard from "../common/JobCard";
import { getJob } from "../../configs/api";
import { Parser } from "html-to-react";

const levels = [
  0,
  "Elementary proficiency",
  "Limited working proficiency",
  "Professional working proficiency",
  "Full professional proficiency",
  "Native or bilingual proficiency",
];
const JobsDetailsPage = ({ jobsList }) => {
  const { uri } = useParams();
  const [jobDetails, setJobDetails] = useState({});
  const getCurrentJob = async () => {
    const res = await getJob(uri);
    setJobDetails(res);
  };
  useEffect(() => {
    getCurrentJob();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "row" }}
      className="page-cont"
    >
      <div style={{ width: "30%", height: "80vh", overflowY: "scroll" }}>
        {jobsList?.list?.map((job) => (
          <JobCard job={job} type={"small"} />
        ))}
      </div>
      <div style={{ width: "70%", height: "80vh" }}>
        <Paper elevation={1}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" gutterBottom component="div">
              {jobDetails.title}
            </Typography>
            <Chip label="Full Time" />
          </div>
          <Typography variant="caption" display="block" gutterBottom>
            Posted on: {jobDetails.posted_at}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Description
          </Typography>
          <Typography variant="body2" gutterBottom>
            {Parser().parse(jobDetails.description)}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Requirements
          </Typography>
          <Typography variant="body2" gutterBottom>
            {Parser().parse(jobDetails.requirements)}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Summary
          </Typography>
          <div
            className="row-class border smallFont"
            style={{ padding: "1rem" }}
          >
            <div className="col-class half-width">
              <div className="row-class-j">
                <p>
                  <strong>Salary range:</strong>
                </p>
                <p>
                  {jobDetails.salary?.min} -{jobDetails.salary?.max}
                </p>
              </div>
              <div className="row-class-j">
                <p>
                  <strong>Industry:</strong>
                </p>
                <p>{jobDetails.industry?.join(", ")}</p>
              </div>
              <>
                {jobDetails.years_of_experience?.length ? (
                  <div className="row-class-j">
                    <p>
                      <strong>Experience Required:</strong>
                    </p>
                    <p>{`${jobDetails.years_of_experience[0]} year(s)
              minimum`}</p>
                  </div>
                ) : (
                  ""
                )}
              </>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="col-class half-width">
              <div className="row-class-j">
                <p>
                  <strong>Major:</strong>
                </p>
                <p>{jobDetails.major?.join(", ")}</p>
              </div>
              <div className="row-class-j">
                <p>
                  <strong>Career Level:</strong>
                </p>
                <p>{jobDetails.career_level?.join(", ")}</p>
              </div>
              <div className="row-class-j">
                <p>
                  <strong>Minimum GPA:</strong>
                </p>
                <p>{jobDetails.gpa}</p>
              </div>
            </div>
          </div>
          {jobDetails.skills?.length ? (
            <>
              <Typography variant="subtitle1" gutterBottom component="div">
                Required Skills
              </Typography>
              {jobDetails.skills?.map((skill) => {
                return <Chip label={skill} />;
              })}
              <Divider />
            </>
          ) : (
            ""
          )}
          <Typography variant="subtitle1" gutterBottom component="div">
            Languages
          </Typography>
          {jobDetails.languages?.length ? (
            <>
              {jobDetails.languages?.map((lang) => {
                const langEnt = Object.entries(lang)[0];
                return (
                  <Chip
                    label={`${langEnt[0].toUpperCase()} - ${
                      levels[langEnt[1]]
                    }`}
                  />
                );
              })}
              <Divider />
            </>
          ) : (
            ""
          )}
          <Typography variant="subtitle1" gutterBottom component="div">
            Share
          </Typography>
          <Fab color="primary" aria-label="add">
            <FacebookIcon />
          </Fab>
          <Fab color="primary" aria-label="add">
            <TwitterIcon />
          </Fab>
          <Fab color="primary" aria-label="add">
            <LinkedInIcon />
          </Fab>
          <Button variant="contained">Apply</Button>
        </Paper>
      </div>
    </div>
  );
};
export default JobsDetailsPage;
