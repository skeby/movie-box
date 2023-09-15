import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-icons">
        <a href="/">
          <FontAwesomeIcon icon={faFacebookSquare} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
      <div className="footer-links">
        <a href="/">Conditions Of Use</a>
        <a href="/">Privacy & Policy</a>
        <a href="/">Press Room</a>
      </div>
      <p>© 2023 MovieBox by Adeyinka Akinsanya</p>
    </footer>
  );
};

export default Footer;
