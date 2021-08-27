import DemoWidget, { DemoWidgetProps, Column } from '/widgets/DemoWidget'

import styles from './TableWidget.scss'

export interface TableWidgetProps extends DemoWidgetProps {
  size?: number
}

const formatters = {
  unixtimestamp: value => new Date(value * 1000).toLocaleString()
}

export default class TableWidget <P extends TableWidgetProps> extends DemoWidget<P> {
  formatValue (value, index: number) {
    const formatter = formatters[this.props.controller.data.columns[index].type]

    if (formatter) {
      return formatter(value)
    }

    return value
  }

  render ({ controller }: P) {
    return (
      <table class={styles.root}>
        <tr class={styles.header}>
          <for of={() => controller.data.columns} key='code'>
            {(col: Column, index) => !this.hideColumns.includes(index()) && (
              <th class={styles.th}>
                {col.label}
              </th>
            )}
          </for>
        </tr>
        <for of={() => controller.columns} key='0'>
          {data => (
            <tr class={styles.row}>
              <for of={data}>
                {(value, index) => !this.hideColumns.includes(index) && (
                  <td class={styles.td}>
                    {this.formatValue(value, index)}
                  </td>
                )}
              </for>
            </tr>
          )}
        </for>
      </table>
    )
  }
}
