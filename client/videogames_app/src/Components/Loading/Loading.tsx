import styles from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <i className="fa fa-gamepad" aria-hidden="true"></i>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
