"use client"
import React from 'react';
import styles from './SpinnerLoader.module.css'; 

const SpinnerLoader = () => {
  return (
    <div className={styles.spinnerLoader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default SpinnerLoader;
