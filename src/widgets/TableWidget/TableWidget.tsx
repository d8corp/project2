import DemoWidget, { DemoWidgetProps, Column } from '/widgets/DemoWidget'

export interface TableWidgetProps extends DemoWidgetProps {}

export default class TableWidget <P extends TableWidgetProps> extends DemoWidget<P> {
  render ({ controller }) {
    return (
      <table>
        <tr>
          <for of={() => controller.data.columns} key='code'>
            {(col: Column, index) => !this.hideColumns.includes(index()) && (
              <th>
                {col.label}
              </th>
            )}
          </for>
        </tr>
        <for of={() => controller.data.data} key='0'>
          {data => (
            <tr>
              <for of={data}>
                {(value, index) => !this.hideColumns.includes(index) && (
                  <td>
                    {value}
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
