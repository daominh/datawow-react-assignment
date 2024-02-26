import React from "react";
import styles from "./Container.module.scss";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>{children}</div>
    </div>
  );
};

export { Container };
