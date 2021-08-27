import { cache, getDecors, state } from '@watch-state/decorators'

export interface Column {
  code: string
  label: string
  type: string
  values?: any[]
}

export interface Data {
  columns: Column[]
  data: any[][]
}

export type Types = Record<string, (value, filter: string) => unknown>

export const typeFilters: Types = {
  string: (value: string, filter: string) => value.toLowerCase().includes(filter.toLowerCase()),
  number: (value: number, filter: string) => value + '' === filter,
  unixtimestamp: (value: number, filter: string) => {
    if (filter === '0|0') return true

    const [from, to] = filter.split('|').map(val => +val)

    if (from && value < from) {
      return false
    }

    if (to && value > to) {
      return false
    }

    return true
  },
}

export class DemoWidgetController <D extends Data = Data> {
  @state protected data: D
  @state protected filters: any[] = []

  constructor (data: D) {
    this.setData(data)
  }

  setData (data: D) {
    // TODO: Попросить изменить API, после чего можно будет удалить следующий код
    const { columns } = data

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].type === 'string') {
        const rows = data.data
        const cache = Object.create(null)

        for (let j = 0; j < rows.length; j++) {
          const value = rows[j][i]

          if (value in cache) {
            columns[i].type = 'select'
          } else {
            cache[value] = true
          }
        }

        if (columns[i].type === 'select') {
          columns[i].values = Object.keys(cache)
        }
      }
    }

    this.data = data
  }

  setFilterByIndex (index, value) {
    this.filters[index] = value
    getDecors(this).filters.update()
  }

  get cols () {
    return this.data.columns
  }

  @cache get rows () {
    const { filters } = this
    const { data, columns } = this.data

    if (!filters.length) return data

    return data.filter(row => {
      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i]

        if (!filter) continue

        const value = row[i]
        const { type } = columns[i]

        if (type in typeFilters) {
          if (!typeFilters[type](value, filter)) {
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

  @cache get columns () {
    const { exclude } = this.props
    const { cols } = this.props.controller
    const result: number[] = []

    if (exclude) {
      for (let i = 0; i < cols.length; i++) {
        if (exclude.includes(cols[i].code)) {
          result.push(i)
        }
      }
    }

    return result
  }
}
