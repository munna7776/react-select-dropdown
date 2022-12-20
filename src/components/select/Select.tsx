import React, { useRef, useState } from "react";
import { chevronDown, cross } from "@/assets";
import styles from "./Select.module.scss";
import { SelectProps } from "./select-types";
import { useOnClickOutside } from "@/hooks";
import Option from "./Option";

const Select = ({
  optionsList = [],
  value,
  onChange,
  isMultiSelect,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectContainerRef = useRef(null);

  useOnClickOutside(selectContainerRef, () => setIsOpen(false));

  const onOptionClick = (option: string) => {
    if (!isMultiSelect && option !== value) {
      onChange(option);
    }
    if (isMultiSelect) {
      if (!value.includes(option)) {
        onChange([...value, option]);
      } else {
        const newValue = value.filter((val) => val !== option);
        onChange(newValue);
      }
    }
  };

  const chevronImageClassName = `${styles.chevron} ${
    isOpen ? styles.oppositeChevron : ""
  }`;

  return (
    <div className={styles.selectContainer} ref={selectContainerRef}>
      <div role="listbox" className={styles.selectedBoxContainer} onClick={() => setIsOpen(true)} >
        {value.length === 0 && (
          <div className={styles.selectedText}>Select Country...</div>
        )}
        {!isMultiSelect && value && (
          <div className={styles.selectedText}> {value} </div>
        )}
        {isMultiSelect && value.length > 0 && (
          <div className={styles.multiSelectedOption}>
            {value.map((val) => (
              <div key={val} className={styles.option}>
                <span>{val}</span>
                <img src={cross} alt="cross" onClick={() => onOptionClick(val)} />
              </div>
            ))}
          </div>
        )}
        <img className={chevronImageClassName} src={chevronDown} alt="chevron-image" />
      </div>
      <div
        className={`${styles.optionsOuterContainer} ${
          isOpen ? styles.showOptionsContainer : ""
        }`}
      >
        <ul>
          {optionsList.map((option, index) => {
            return (
              <Option
                key={index}
                option={option}
                onOptionClick={onOptionClick}
                isOptionSelected={
                  isMultiSelect ? value.includes(option) : value === option
                }
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Select;
