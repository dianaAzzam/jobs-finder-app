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
        width: "18vw",
        padding: type === "large" && "1rem 1rem",
        height: type === "small" ? "20vh" : "auto",
        marginBottom: "1rem"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {job.title}
          <br />
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
            {job.location.city || "N/A"}
            <br />
            <Divider />
          </>
        )}
        {job.career_level.length ? job.career_level.join(", ") : "N/A"}
        <br />
        {type === "large" && (
          <>
            <Divider />
            {job.skills.length ? job.skills.join(", ") : "N/A"}
            <br />
            <Divider />
            <Link to={`/jobs/${job.uri}`}>
              <Button variant="outlined">{t("view")}</Button>
            </Link>
          </>
        )}
      </div>
    </Card>
  );
};
export default JobCard;
