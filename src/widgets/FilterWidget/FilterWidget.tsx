import DemoWidget, { Column, DemoWidgetProps } from '/widgets/DemoWidget'
import Input from '/ui/Input'

export interface FilterWidgetProps extends DemoWidgetProps {}

export default class FilterWidget <P extends FilterWidgetProps> extends DemoWidget<P> {
  render (props) {
    return (
      <for of={() => props.controller.data.columns} key='code'>
        {(col: Column, index) => !this.hideColumns.includes(index()) && (
          <Input type={col.type} name={col.code}>
            {col.label}
          </Input>
        )}
      </for>
    )
  }
}
