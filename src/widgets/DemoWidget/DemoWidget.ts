import { cache, state } from '@watch-state/decorators'

export interface Column {
  code: string
  label: string
  type: string
}

export interface Data {
  columns: Column[]
  data: any[][]
}

export class DemoWidgetController <D extends Data = Data> {
  @state data: D

  constructor (data: D) {
    this.data = data
  }
}

export interface DemoWidgetProps {
  controller: DemoWidgetController
  exclude?: string[]
}

export default class DemoWidget <P extends DemoWidgetProps> {
  constructor (public props: P) {}

  @cache get hideColumns () {
    const { exclude } = this.props
    const { columns } = this.props.controller.data
    const result: number[] = []

    if (exclude) {
      for (let i = 0; i < columns.length; i++) {
        if (exclude.includes(columns[i].code)) {
          result.push(i)
        }
      }
    }

    return result
  }
}
