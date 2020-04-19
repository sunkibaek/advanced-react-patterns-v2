// Compound Components

import React, {useState, cloneElement, Children} from 'react'
import {Switch} from '../switch'

const Toggle = ({onToggle, children}) => {
  const [on, setOn] = useState(false)

  const handleToggle = () => {
    const newValue = !on

    setOn(newValue)
    onToggle(newValue)
  }

  return Children.map(children, (c) =>
    cloneElement(c, {on: on, onClick: handleToggle}),
  )
}

Toggle.On = ({children, on}) => (on ? children : null)
Toggle.Off = ({children, on}) => (on ? null : children)
Toggle.Button = ({on, onClick}) => (
  <Switch on={on} onClick={onClick} />
)

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
