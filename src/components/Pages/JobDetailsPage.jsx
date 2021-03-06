import { useEffect, useState } from "react";
import { Parser } from "html-to-react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import JobCard from "../common/JobCard";
import { getJob } from "../../configs/api";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CircularProgress from "@mui/material/CircularProgress";
import { format, parseISO } from "date-fns";

const levels = [
  0,
  "Elementary proficiency",
  "Limited working proficiency",
  "Professional working proficiency",
  "Full professional proficiency",
  "Native or bilingual proficiency",
];
const marginRight = { marginRight: "1rem" };
const marginBottom = { marginBottom: "1rem" };

const JobsDetailsPage = ({ jobsList, loading }) => {
  const { uri } = useParams();
  const { t } = useTranslation();
  const [jobDetails, setJobDetails] = useState({});
  const [localLoading, setlocalLoading] = useState({});

  const getCurrentJob = async () => {
    const res = await getJob(uri);
    setJobDetails(res);
    setlocalLoading(false);
  };
  useEffect(() => {
    setlocalLoading(true);
    getCurrentJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);
  return (
    <div className="page-cont row-class">
      <div className="left-nav">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            {jobsList?.list?.map((job, idx) => (
              <Link to={`/jobs/${job.uri}`} style={{ textDecoration: "none" }}>
                <div style={{ marginBottom: "4vh" }} key={`${job.uuid}${idx}`}>
                  <JobCard job={job} type={"small"} />
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="right-nav">
        {loading || localLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Card
            sx={{
              margin: "2rem 1rem",
              borderRadius: "1rem",
              padding: "1rem 1.2rem",
            }}
          >
            <div className="row-class-p">
              <div className="row-class-p">
                <p className="h-text">
                  {jobDetails.title}
                  {jobDetails.job_type?.length &&
                    jobDetails.job_type.map((jobType, idx) => (
                      <span className="pill" key={`${jobType}${idx}`}>
                        <Chip
                          label={
                            jobType.charAt(0).toUpperCase() + jobType.slice(1)
                          }
                        />
                      </span>
                    ))}
                </p>
              </div>
            </div>
            <p className="cap-text">
              Posted on:{" "}
              {format(parseISO(jobDetails.posted_at), "EEEE, LLLL do, yyyy")}
            </p>
            <p className="h-2-text">{t("decription")}</p>
            <p className="body-p">{Parser().parse(jobDetails.description)}</p>
            <p className="h-2-text">{t("requirements")}</p>
            <p className="body-p">{Parser().parse(jobDetails.requirements)}</p>
            <p className="h-2-text">{t("summary")}</p>
            <div
              className="row-class border smallFont"
              style={{ padding: "1rem" }}
            >
              <div className="summary-cont half-width">
                <strong>{t("salaryRange")}</strong>

                {jobDetails.salary?.min
                  ? `${jobDetails.salary?.min} -
          ${jobDetails.salary?.max}`
                  : "-"}

                <strong>{t("industry")}</strong>

                {jobDetails.industry?.length
                  ? `${jobDetails.industry?.join(", ")}`
                  : "-"}
                <strong>{t("experience")}</strong>
                {jobDetails.years_of_experience?.length
                  ? `${jobDetails.years_of_experience[0]} year(s)
      minimum`
                  : "-"}
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="summary-cont half-width">
                <strong>{t("major")}</strong>

                {jobDetails.major?.length
                  ? `${jobDetails.major?.join(", ")}`
                  : "-"}

                <strong>{t("careerLevel")}</strong>

                {jobDetails.career_level?.length
                  ? `${jobDetails.career_level?.join(", ")}`
                  : "-"}

                <strong>{t("gpa")}</strong>
                {jobDetails.gpa ? `${jobDetails.gpa}` : "-"}
              </div>
            </div>
            {jobDetails.skills?.length ? (
              <>
                <p className="h-2-text">{t("requestedSkills")}</p>
                <div>
                  {jobDetails.skills?.map((skill, idx) => {
                    return (
                      <span className="chip" key={`${skill}${idx}`}>
                        <Chip
                          label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                          sx={marginBottom}
                        />
                      </span>
                    );
                  })}
                </div>
                <Divider sx={{ marginTop: "1rem" }} />
              </>
            ) : (
              ""
            )}
            {jobDetails.languages?.length ? (
              <>
                <p className="h-2-text">{t("languages")}</p>
                <div>
                  {jobDetails.languages?.map((lang, idx) => {
                    const langEnt = Object.entries(lang)[0];
                    return (
                      <span className="chip" key={`${lang}${idx}`}>
                        <Chip
                          label={`${langEnt[0].toUpperCase()} - ${
                            levels[langEnt[1]]
                          }`}
                          sx={marginBottom}
                        />
                      </span>
                    );
                  })}
                </div>
                <Divider sx={{ marginTop: "1rem" }} />
              </>
            ) : (
              ""
            )}
            <div className="row-class card-actions-cont">
              <div className="row-class">
                <p className="h-2-text" style={marginRight}>
                  {t("share")}
                </p>
                <p>
                  <Fab
                    color="primary"
                    aria-label="facebook"
                    sx={{ ...marginRight, backgroundColor: "mediumblue" }}
                    size="small"
                  >
                    <FacebookIcon />
                  </Fab>
                  <Fab
                    color="primary"
                    aria-label="twitter"
                    sx={marginRight}
                    size="small"
                  >
                    <TwitterIcon />
                  </Fab>
                  <Fab
                    color="primary"
                    aria-label="linked in"
                    sx={{ ...marginRight, backgroundColor: "darkBlue" }}
                    size="small"
                  >
                    <LinkedInIcon />
                  </Fab>
                </p>
              </div>
              <p>
                <Button variant="contained">{t("apply")}</Button>
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
export default JobsDetailsPage;
