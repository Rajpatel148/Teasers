import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-discl">
          <p className="footer-content-discl-title">Disclaimer</p>
          <p className="footer-content-discl-text">
            This project, <strong>EnTeasers</strong>, is a Netflix-inspired
            clone created for educational purposes only. It is not affiliated
            with or endorsed by <strong>Netflix, Inc.</strong>.
          </p>
        </div>
        <p className="appName">EnTeasers (NetFlix-Clone)</p>
        <p className="created-text">created by</p>
        <a className="appAuthor" href="https://github.com/Rajpatel148" target="_blank">
          RAJ PATEL
        </a>
        <a className="gitIcon" href="https://github.com/Rajpatel148" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
