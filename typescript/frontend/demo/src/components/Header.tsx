import "@/styles/header.css";
import { Translation } from "react-i18next";

const Header = () => {
  return (
    <Translation>
      {(t, { i18n }) => (
        <div className="header">
          <div className="navbar">
            <div className="navLeft">
              <h1 style={{ marginLeft: "50px" }}>{t('Market')}</h1>
            </div>
            <div className="navRight">
              <p className="rightSpace">Refer</p>
              <p className="rightSpace">Sign in</p>
              <p className="rightSpace">Start Selling</p>
              <button className="joinBtn rightSpace">Join</button>
              <select
                name="cars"
                id="cars"
                className="joinBtn rightSpace"
                onClick={(e) => {
                  i18n.changeLanguage(e.currentTarget.value);
                }}
              >
                <option value="en">English</option>
                <option value="h">Hindi</option>
              </select>
            </div>
          </div>
          <div className="headerLeft">
            <h1 className="mainHeading">{t("Find the Photographer")}</h1>
            <p style={{ color: "white", marginLeft: "150px" }}>
              Designing, Writing, Animations, Photography, Videos
            </p>
            <button className="designingBtn">Designing</button>
          </div>
          <div className="headerRight"></div>
        </div>
      )}
    </Translation>
  );
};

export default Header;
