import { Component, Children, Props } from 'innet'

export interface PropsComponent <P extends Props> extends Component<P> {
  props: P
}

export interface PropsComponentConstructor <P extends Props> {
  new (props?: P, children?: Children): PropsComponent<P>
}

export function withProps <P extends Props, PC extends PropsComponentConstructor<P>> (target: PC): PC {
  const originRender = target.prototype.render
  target.prototype.render = function render (...args) {
    this.props = args[0]
    return originRender.apply(this, args)
  }
  return target
}
