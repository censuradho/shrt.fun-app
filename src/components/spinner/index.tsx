import React from 'react'
import styles from './styles.module.css'

interface SpinnerProps {
  size?: number
  color?: string
}

export function Spinner ({ size = 14, color }: SpinnerProps) {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        ...(color && { '--spinner-color': color } as React.CSSProperties),
      }}
    />
  )
}