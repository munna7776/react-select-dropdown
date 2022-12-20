import { useState } from "react";
import {OptionProps} from "./select-types"
import styles from "./Select.module.scss"

const Option = ({option, onOptionClick, isOptionSelected = false}: OptionProps) => {

  const [hovered, setHovered] = useState(false)

  const getListClassName = () => {
    let classnames = [styles.list]
    if( isOptionSelected ){
      classnames.push(styles.activeList)
    }
    if( hovered && !isOptionSelected) {
      classnames.push(styles.hoveredList)
    }

    return classnames.join(" ")
  }

  return (
    <li
      className={getListClassName()}
      onClick={() => onOptionClick(option)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.optionName}>{option}</div>
      <div className={styles.checkbox}></div>
    </li>
  );
};

export default Option;
