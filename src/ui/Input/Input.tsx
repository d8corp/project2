import { withChildren, withProps } from '/utils'

import styles from './Input.scss'

export interface InputProps {
  type?: string
  values?: any[]
  onChange?: (value: any) => any
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

  get input () {
    const { type, values } = this.props

    if (type === 'select') {
      return (
        <select class={styles.select} oninput={this.onChange}>
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

    if (type === 'unixtimestamp') {
      let from = 0
      let to = 0

      const onChange = () => this.props.onChange?.(`${from}|${to}`)

      return (
        <span class={styles.date}>
          <input class={styles.dateFrom} type='date' oninput={e => {
            from = (new Date(e.target.value).getTime() / 1000) | 0
            onChange()
          }} />
          <input class={styles.dateTo} type='date' oninput={e => {
            to = (new Date(e.target.value).getTime() / 1000) | 0
            onChange()
          }} />
        </span>
      )
    }

    return (
      <input class={styles.input} type={this.props.type} oninput={this.onChange} />
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
