import { DemoWidgetController } from '/widgets/DemoWidget'
import FilterWidget from '/widgets/FilterWidget'
import TableWidget from '/widgets/TableWidget'

import data from './data.json'

import styles from './App.scss'

export default class App {
  controller = new DemoWidgetController(data)

  render () {
    return (
      <div class={styles.root}>
        <FilterWidget controller={this.controller} exclude={['id']} />
        <TableWidget controller={this.controller} exclude={['value']} />
      </div>
    )
  }
}
