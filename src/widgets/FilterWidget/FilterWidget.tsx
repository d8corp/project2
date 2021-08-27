import DemoWidget, { Column, DemoWidgetProps } from '/widgets/DemoWidget'
import Input from '/ui/Input'

export interface FilterWidgetProps extends DemoWidgetProps {}

export default class FilterWidget <P extends FilterWidgetProps> extends DemoWidget<P> {
  onChange (value, index) {
    this.props.controller.setFilterByIndex(index, value)
  }

  render (props: P) {
    return (
      <for of={() => props.controller.cols} key='code'>
        {(col: Column, index) => !this.columns.includes(index()) && (
          <Input type={col.type} name={col.code} onChange={v => this.onChange(v, index())}>
            {col.label}
          </Input>
        )}
      </for>
    )
  }
}
