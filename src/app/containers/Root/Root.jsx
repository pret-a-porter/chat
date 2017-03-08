import React from 'react'
import LeftPanel from '../../components/LeftPanel'
import Dialog from '../../components/Dialog'
import styles from './Root.css'

export default function Root (props) {
  return (
    <main className={styles.wrapper}>
      <LeftPanel />
      <Dialog />
    </main>
  )
}
