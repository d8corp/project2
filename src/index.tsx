import innet from 'innet'
import forPlugin, { ForProps } from '@innet/for'
import App from './app'

innet(<App />, undefined, {
  for: forPlugin
})

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      for: ForProps
    }
  }
}
