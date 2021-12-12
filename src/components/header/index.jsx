import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ReactComponent as ElevatusLogo } from "../../logo/elevatus-logo.svg";
import OutlinedInput from "@mui/material/OutlinedInput";

const Header = () => {
  const [language, setLanguage] = useState("العربية");
  const toggleLanguage = () => {
    language === "English" ? setLanguage("العربية") : setLanguage("English");
  };
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
          <OutlinedInput placeholder="Job Title" />
          <Button variant="contained">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
