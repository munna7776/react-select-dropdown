import React, { useState } from 'react'
import styles from "./App.module.scss"
import { Select } from '@/components/select'
import { countryList } from '@/consts'

const App = () => {
  const [value, setValue] = useState<typeof countryList[0]>('')
  const [newValue, setNewValue] = useState<typeof countryList>([])

  const onChange = (option: string) => {
    setValue(option)
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h2>Single Select</h2>
        <Select optionsList={countryList} value={value} onChange={onChange} />
      </div>
      <div className={styles.innerContainer}>
        <h2>Multiple Select</h2>
        <Select optionsList={countryList} value={newValue} onChange={(val: string[]) => setNewValue(val)} isMultiSelect />
      </div>
    </div>
  )
}

export default App
