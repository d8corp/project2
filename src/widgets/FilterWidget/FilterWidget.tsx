import { getDecors } from '@watch-state/decorators'
import DemoWidget, { Column, DemoWidgetProps } from '/widgets/DemoWidget'
import Input from '/ui/Input'

export interface FilterWidgetProps extends DemoWidgetProps {}

export default class FilterWidget <P extends FilterWidgetProps> extends DemoWidget<P> {
  onChange (value, index) {
    const { controller } = this.props
    controller.filters[index] = value
    getDecors<{ filters: 'state'}, typeof controller>(controller).filters.update()
  }

  render (props: P) {
    return (
      <for of={() => props.controller.data.columns} key='code'>
        {(col: Column, index) => !this.hideColumns.includes(index()) && (
          <Input type={col.type} name={col.code} onChange={v => this.onChange(v, index())}>
            {col.label}
          </Input>
        )}
      </for>
    )
  }
}
