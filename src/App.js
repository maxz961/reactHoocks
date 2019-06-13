import React from 'react';
import { List } from './Components/List'

import './App.css'

export const App = () => {
  return (
    <div className='App'>
      <h1>A Nested List Editor</h1>
        <List />
    </div>
  )
}