import { useEffect, useState } from "react";
import { getJobs } from "../../configs/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t, i18n } = useTranslation();
  const [recentJobsList, setRecentJobsList] = useState([]);
  const listJobs = async (page, limit, itemQuery) => {
    const res = await getJobs(page, limit, itemQuery);
    setRecentJobsList(res.jobs);
  };
  useEffect(() => {
    listJobs(1, 10, "");
  }, []);
  useEffect(() => {
    console.log(recentJobsList);
  }, [recentJobsList]);
  return (
    <div className="container">
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 2, sm: 12, md: 18 }}
      >
        {recentJobsList.map((job) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={job.uuid}>
              <Card>
                <CardContent>
                  <List component="nav" aria-label="card information list">
                    <ListItem>
                      <Typography variant="caption" display="block">{job.title}</Typography>
                    </ListItem>
                    <ListItem divider>
                      <Typography variant="caption" display="block">
                        {job.location.city || "N/A"}
                      </Typography>
                    </ListItem>
                    <ListItem divider>
                      <Typography variant="caption" display="block">
                        {job.career_level.length
                          ? job.career_level.join(", ")
                          : "N/A"}
                      </Typography>
                    </ListItem>
                    <ListItem divider>
                      <Typography variant="caption" display="block">
                        {job.skills.length ? job.skills.join(", ") : "N/A"}
                      </Typography>
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button variant="outlined">{t('view')}</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default MainPage;
