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
                <FontAwesomeIcon icon={faFacebookSquare}/>
            </a>
            <a href="/">
                <FontAwesomeIcon icon={faInstagram}/>
            </a>
            <a href="/">
                <FontAwesomeIcon icon={faTwitter}/>
            </a>
            <a href="/">
                <FontAwesomeIcon icon={faYoutube}/>
            </a>
        </div>
        <ul>
            <li>Conditions Of Use</li>
            <li>Privacy & Policy</li>
            <li>Press Room</li>
        </ul>
        <p>© 2023 MovieBox by Adeyinka Akinsanya </p>
    </footer>
    );
};

export default Footer;
