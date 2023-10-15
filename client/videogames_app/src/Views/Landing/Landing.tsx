import styles from "./Landing.module.css";
import LoginButton from "../../Components/LoginButton/LoginButton";

const Landing: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome</h1>
      </div>

      <div>
        <LoginButton></LoginButton>
      </div>
    </div>
  );
};

export default Landing;
