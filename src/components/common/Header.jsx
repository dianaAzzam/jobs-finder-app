import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ReactComponent as ElevatusLogo } from "../../resources/elevatus-logo.svg";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTranslation } from "react-i18next";

const Header = ({ changeSearchInput, getSearchResults }) => {
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
  }, []);

  return (
    <div>
      <AppBar
        position="static"
        color="black"
      >
        <div className="h-cont page-cont">
          <div className="h-comp">
            <ElevatusLogo />
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
          <Button variant="contained" onClick={getSearchResults}>
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
