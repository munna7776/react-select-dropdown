import React, { useState } from "react";
import { chevronDown } from "@/assets";
import styles from "./Select.module.scss";
import { SelectProps } from "./select-types";

const Select: React.FC<SelectProps> = ({
  selectOuterContainerClassName = "",
  optionsList = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const chevronImageClassName = `${styles.chevron} ${
    isOpen ? styles.oppositeChevron : ""
  }`;

  return (
    <div className={styles.selectContainer}>
      <div
        className={styles.selectedBoxContainer}
        onClick={() => setIsOpen(true)}
      >
        <div className={styles.selectedText}>Munna</div>
        <img
          className={chevronImageClassName}
          src={chevronDown}
          alt="chevron-image"
        />
      </div>
      {isOpen && (
        <div className={styles.optionsOuterContainer}>
          <ul>
            {optionsList.map((option, index) => {
              return (
                <li key={index}>
                  <div className={styles.optionName}>{option}</div>
                  <div className={styles.checkbox}></div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
