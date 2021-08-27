import { withChildren, withProps } from '/utils'

import styles from './Input.scss'

export interface InputProps {
  type?: string
  name?: string
  values?: any[]
  onChange?: (value: any) => any
}

export const typesOverride = {
  number: 'number',
  unixtimestamp: 'date',
}

@withProps
@withChildren
export default class Input <P extends InputProps> {
  props?: P
  children: any

  onChange = e => this.props.onChange?.(e.target.value)

  get label () {
    return this.children && (
      <span class={styles.label}>
        {this.children}
      </span>
    )
  }

  get type () {
    const { type } = this.props
    return type in typesOverride ? typesOverride[type] : 'text'
  }

  get input () {
    const { type, name, values } = this.props

    if (type === 'select') {
      return (
        <select name={name} oninput={this.onChange}>
          <option />
          {values && (
            <for of={values}>
              {value => (
                <option value={value}>
                  {value}
                </option>
              )}
            </for>
          )}
        </select>
      )
    }

    return (
      <input name={name} class={styles.input} type={this.type} oninput={this.onChange} />
    )
  }

  render () {
    return (
      <label class={styles.root}>
        {this.label}
        {this.input}
      </label>
    )
  }
}
