import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const Loader = () => {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={faSpinner} spin fontSize={"3rem"} color="white" />
    </div>
  );
};

export default Loader;
