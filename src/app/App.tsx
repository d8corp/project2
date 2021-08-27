import { DemoWidgetController } from '/widgets/DemoWidget'
import FilterWidget from '/widgets/FilterWidget'
import TableWidget from '/widgets/TableWidget'

import data from './data.json'

import styles from './App.scss'

export default class App {
  controller1 = new DemoWidgetController(data)
  controller2 = new DemoWidgetController(data)

  render () {
    return (
      <main class={styles.root}>
        <section class={styles.section}>
          <h3 class={styles.header}>Demo 1</h3>
          <FilterWidget controller={this.controller1} exclude={['value']} />
          <TableWidget controller={this.controller1} size={5} />
        </section>
        <section class={styles.section}>
          <h3 class={styles.header}>Demo 2</h3>
          <FilterWidget controller={this.controller2} exclude={['id']} />
          <TableWidget controller={this.controller2} exclude={['id']} />
        </section>
      </main>
    )
  }
}
