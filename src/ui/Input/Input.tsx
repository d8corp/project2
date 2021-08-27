import { withChildren } from '/utils'

import styles from './Input.scss'

export interface InputProps {
  type?: string
  name?: string
}

@withChildren
export default class Input <P extends InputProps> {
  props?: P
  children?: any

  get label () {
    return this.children && (
      <span class={styles.label}>
        {this.children}
      </span>
    )
  }

  render (props: P) {
    return (
      <label class={styles.root}>
        {this.label}
        <input class={styles.input} type={props.type} />
      </label>
    )
  }
}
