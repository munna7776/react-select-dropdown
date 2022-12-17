import React from 'react'
import styles from "./App.module.scss"
import { Select } from '@/components/select'
import { countryList } from '@/consts'

const App = () => {
  return (
    <div className={styles.container}>
        <Select optionsList={countryList} />
    </div>
  )
}

export default App
