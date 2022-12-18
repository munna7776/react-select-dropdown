import React, { useRef, useState } from "react";
import { chevronDown, cross } from "@/assets";
import styles from "./Select.module.scss";
import { SelectProps } from "./select-types";
import { useOnClickOutside } from "@/hooks";

const Select = ({
  optionsList = [],
  value,
  onChange,
  isMultiSelect
}: SelectProps) => { 

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number|null>(null)
  const selectContainerRef = useRef(null)


  useOnClickOutside(selectContainerRef, () => setIsOpen(false))

  const onOptionClick = (option: string) => {
    if(!isMultiSelect && option !== value) {
      onChange(option)
    }
    if(isMultiSelect) {
      if(!value.includes(option)) {
        onChange([...value,option])
      } else {
        const newValue = value.filter(val => val !== option)
        onChange(newValue)
      }
    }
  }

  const getListClassName = (option: string, index: number) => {
    let classnames = [styles.list]
    const selected = isMultiSelect ? value.includes(option) : value === option
    if( selected ){
      classnames.push(styles.activeList)
    }
    if(hoveredIndex === index && !selected) {
      classnames.push(styles.hoveredList)
    }

    return classnames.join(" ")
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
        { (!value || value.length === 0) && <div className={styles.selectedText} >Select Country...</div> }
        { !isMultiSelect && value && <div className={styles.selectedText}> { value } </div> }
        { isMultiSelect && value.length > 0 && (
          <div className={styles.multiSelectedOption}>
            {
              value.map((val) => (
                <div key={val} className={styles.option}>
                  <span>{val}</span>
                  <img src={cross} alt="cross" onClick={()=>onOptionClick(val)} />
                </div>
              ))
            }
          </div>
        ) }
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
                <li key={index} className={getListClassName(option,index)} onClick={()=>onOptionClick(option)} onMouseEnter={()=>setHoveredIndex(index)} onMouseLeave={()=>setHoveredIndex(null)} >
                  <div className={styles.optionName}>{option}</div>
                  <div className={ styles.checkbox }></div>
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
