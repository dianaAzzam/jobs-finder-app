import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

const JobCard = ({ job, type }) => {
  const { t } = useTranslation();

  return (
    <Card
      key={job.uuid}
      sx={{
        padding: "1rem 1rem",
        height: type === "small" ? "5rem" : "auto",
        borderRadius: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className={`body-p ${type === "small" && "zero-margin"}`}>
            <strong>{job.title}</strong>
          </p>
          {type === "small" && (
            <p className="tiny-font body-p" style={{ marginTop: "0px" }}>
              {job.location.city
                ? `${job.location.city},${job.location.country}`
                : t('notApplicable')}
            </p>
          )}
          <Divider />
        </div>
        {type === "large" && (
          <>
            <p className="body-p">{job.location.city || t('notApplicable')}</p>
            <Divider />
          </>
        )}
        <p className="body-p">
          {job.career_level.length ? job.career_level.join(", ") : t('notApplicable')}
        </p>
        {type === "large" && (
          <>
            <Divider />
            <p className="body-p">
              {job.skills.length ? job.skills.join(", ") : t('notApplicable')}
            </p>
            <Divider />
            <Link to={`/jobs/${job.uri}`} style={{textDecoration:"none"}}>
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
