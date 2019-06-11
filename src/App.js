import React from 'react';
import List from './Components/List'

import './App.css'

const App = () => {
  return (
    <div className='App'>
      <h1>A Nested List Editor</h1>
      <ul>
        <List />
      </ul>
    </div>
  )
}

export default App;
