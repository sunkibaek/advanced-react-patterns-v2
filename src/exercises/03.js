// Flexible Compound Components with context

import React, {useState, createContext} from 'react'
import {Switch} from '../switch'

const DEFAULT_ON = false
const OnContext = createContext({
  on: DEFAULT_ON,
  onClick: () => undefined,
})

const Toggle = ({onToggle, children}) => {
  const [on, setOn] = useState(DEFAULT_ON)

  const handleToggle = () => {
    const newValue = !on

    setOn(newValue)
    onToggle(newValue)
  }

  return (
    <OnContext.Provider value={{on, onClick: handleToggle}}>
      {children}
    </OnContext.Provider>
  )
}

Toggle.On = ({children}) => (
  <OnContext.Consumer>
    {({on}) => (on ? children : null)}
  </OnContext.Consumer>
)
Toggle.Off = ({children}) => (
  <OnContext.Consumer>
    {({on}) => (on ? null : children)}
  </OnContext.Consumer>
)
Toggle.Button = () => (
  <OnContext.Consumer>
    {({on, onClick}) => <Switch on={on} onClick={onClick} />}
  </OnContext.Consumer>
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
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
