import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const JobCard = ({ job, type }) => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        padding: type === "large" && "1rem 1rem",
        height: type === "small" ? "20vh" : "auto",
        cursor: "pointer",
        borderRadius: "1.2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="body-p">
            <strong>{job.title}</strong>
          </p>
          {type === "small" && (
            <>
              {job.location.city
                ? `${job.location.city},${job.location.country}`
                : "N/A"}
            </>
          )}
          <Divider />
        </div>
        {type === "large" && (
          <>
            <p className="body-p">{job.location.city || "N/A"}</p>
            <Divider />
          </>
        )}
        <p className="body-p">
          {job.career_level.length ? job.career_level.join(", ") : "N/A"}
        </p>
        {type === "large" && (
          <>
            <Divider />
            <p className="body-p">
              {job.skills.length ? job.skills.join(", ") : "N/A"}
            </p>
            <Divider />
            <Link to={`/jobs/${job.uri}`}>
              <div className="flex-end">
                <Button variant="outlined">{t("view")}</Button>
              </div>
            </Link>
          </>
        )}
      </div>
    </Card>
  );
};
export default JobCard;
