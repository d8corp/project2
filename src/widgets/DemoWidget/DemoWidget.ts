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

export type Types = Record<string, (value, filter: string) => any>

export const types: Types = {
  string: (value: string, filter: string) => value.includes(filter),
  number: (value: number, filter: string) => value + '' === filter
}

export class DemoWidgetController <D extends Data = Data> {
  @state data: D
  @state filters: any[] = []

  constructor (data: D) {
    this.data = data
  }

  @cache get columns () {
    const { filters } = this
    const { data, columns } = this.data

    if (!filters.length) return data

    return data.filter(row => {
      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i]

        if (!filter) continue

        const value = row[i]
        const { type } = columns[i]

        if (type in types) {
          if (!types[type](value, filter)) {
            return false
          }
        } else if (filter && value !== filter) {
          return false
        }
      }

      return true
    })
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
