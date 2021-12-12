import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ReactComponent as ElevatusLogo } from "../../resources/elevatus-logo.svg";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTranslation } from "react-i18next";

const Header = () => {
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
      <AppBar position="static" color="black">
        <div className="h-cont">
          <div className="h-comp">
            <ElevatusLogo />
          </div>
          <div className="h-comp">
            <p onClick={toggleLanguage} className="clickable-txt">
              {language}
            </p>
          </div>
        </div>
      </AppBar>
      <div className="search-cont">
        <div className="h-cont p-all-sm">
          <OutlinedInput placeholder={t('job-title')} />
          <Button variant="contained">{t("search")}</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
