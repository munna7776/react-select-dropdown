import React, { useRef, useState } from "react";
import { chevronDown } from "@/assets";
import styles from "./Select.module.scss";
import { SelectProps } from "./select-types";
import { useOnClickOutside } from "@/hooks";

const Select: React.FC<SelectProps> = ({
  selectOuterContainerClassName = "",
  optionsList = [],
  isMultiSelect = false
}) => { 

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('')
  const selectContainerRef = useRef(null)


  useOnClickOutside(selectContainerRef, () => setIsOpen(false))

  const onSingleSelectOptionClick = (value: string) => {
    setSelectedOption(value)
    setIsOpen(false)
  }

  const chevronImageClassName = `${styles.chevron} ${
    isOpen ? styles.oppositeChevron : ""
  }`;

  return (
    <div className={styles.selectContainer}  ref={selectContainerRef} >
      <div
        className={styles.selectedBoxContainer}
        onClick={() => setIsOpen(true)}
      >
        <div className={styles.selectedText}>
          { selectedOption ?  selectedOption : 'Select Country...'}
        </div>
        <img
          className={chevronImageClassName}
          src={chevronDown}
          alt="chevron-image"
        />
      </div>
      {isOpen && (
        <div className={styles.optionsOuterContainer} >
          <ul>
            {optionsList.map((option, index) => {
              return (
                <li key={index} onClick={()=>onSingleSelectOptionClick(option)} >
                  <div className={styles.optionName}>{option}</div>
                  <div className={ selectedOption === option ? styles.checked : styles.checkbox}></div>
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
