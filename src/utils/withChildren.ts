import { Component } from 'innet'

export interface ChildrenComponent <C> extends Component<any, C> {
  children: C
}

export interface ChildrenComponentConstructor <C> {
  new (props?: any, children?: C): ChildrenComponent<C>
}

export function withChildren <C, CC extends ChildrenComponentConstructor<C>> (target: CC): CC {
  const originRender = target.prototype.render
  target.prototype.render = function render (...args) {
    this.children = args[1]
    return originRender.apply(this, args)
  }
  return target
}
