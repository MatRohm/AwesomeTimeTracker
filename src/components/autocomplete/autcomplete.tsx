import React from 'react'

type AutoCompleteProps = {
  name: string,
  label?: string
}

export const AutoComplete = ({ name, label }: AutoCompleteProps) => {
  return <span id={'auto-complete-' + name}>
    {label ? <label>{label} </label> : ''}
    <input type="text" id="autocompete-textbox" />
  </span>
}