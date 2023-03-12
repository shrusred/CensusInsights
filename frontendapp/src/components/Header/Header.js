import React from "react";
import "../Header/Header.scss";
import AnalyticsIcon from "@mui/icons-material/Analytics";
function Header(props) {
  return (
    <>
      <div className="header">
        <AnalyticsIcon className="header__icon" />
        <h2 className="header__text">{props.name}</h2>
      </div>
    </>
  );
}
export default Header;
