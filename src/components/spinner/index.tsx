
import styles from './styles.module.css'

interface SpinnerProps {
  size?: number
}

export function Spinner ({ size = 14 }: SpinnerProps) {
  return (
    <div className={styles.spinner} style={{ width: size, height: size }}></div>
  )
}