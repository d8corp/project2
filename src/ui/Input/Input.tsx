import { withChildren, withProps } from '/utils'

import styles from './Input.scss'

export interface InputProps {
  type?: string
  name?: string
  onChange?: (value: any) => any
}

@withProps
@withChildren
export default class Input <P extends InputProps> {
  props: P
  children: any

  onChange = e => this.props.onChange?.(e.target.value)

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
        <input class={styles.input} type={props.type} oninput={this.onChange} />
      </label>
    )
  }
}
