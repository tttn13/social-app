import "./footer.css";

import { GitHub, LinkedIn,Person } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div>
        <a
          href="https://github.com/tttn13"
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <GitHub />
          </IconButton>
        </a>

        <a
          href="#!"
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <Person />
          </IconButton>
        </a>

        <a
          href="https://www.linkedin.com/in/thi-nguyen-1310/"
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <LinkedIn />
          </IconButton>
        </a>
      </div>

      <div className="footer_row">
        &copy; {new Date().getFullYear()} Copyright: Thi Nguyen{" "}
        <span style={{ color: "#e25555" }}>&#9829;</span>{" "}
        <a
          className="footer_link"
          href="https://github.com/tttn13/social-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </div>

    </footer>
  );
};

export default Footer;
