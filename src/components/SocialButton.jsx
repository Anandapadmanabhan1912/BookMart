import styles from "./SocialButton.module.css";
// components/SocialButton.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const SocialButton = ({ provider, onClick }) => {
  let icon;

  switch (provider) {
    case "google":
      icon = faGoogle;
      break;
    case "facebook":
      icon = faFacebook;
      break;
    default:
      icon = null;
  }

  return (
    <button className={styles.socialButton} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      {/* Display the icon */}
      {provider.charAt(0).toUpperCase() + provider.slice(1)}
      {/* Capitalize provider name */}
    </button>
  );
};

export default SocialButton;
