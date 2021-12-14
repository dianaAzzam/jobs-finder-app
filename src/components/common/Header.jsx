import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ReactComponent as ElevatusLogo } from "../../resources/elevatus-logo.svg";
import OutlinedInput from "@mui/material/OutlinedInput";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

const Header = ({ changeSearchInput, getSearchResults, loading}) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("العربية");

  const toggleLanguage = () => {
    if (language === "English") {
      setLanguage("العربية");
      i18n.changeLanguage("en");
    } else {
      setLanguage("English");
      i18n.changeLanguage("ar");
    }
  };

  useEffect(() => {
    i18n.changeLanguage("en");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AppBar position="static" color="black">
        <div className="h-cont page-cont">
          <div className="h-comp" style={{ alignItems: "center" }}>
            <Link to={`/`} style={{textDecoration:"none"}}>
              <div className="h-comp">
                <ElevatusLogo />
              </div>
            </Link>
          </div>
          <div
            className="h-comp"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <p onClick={toggleLanguage} className="clickable-txt">
              {language}
            </p>
          </div>
        </div>
      </AppBar>
      <div className="page-cont">
        <div className="h-cont search-cont p-all-sm">
          <OutlinedInput
            placeholder={t("job-title")}
            size="small"
            sx={{ backgroundColor: "white" }}
            onChange={changeSearchInput}
          />
          <Button variant="contained" onClick={getSearchResults} disabled={loading}>
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
