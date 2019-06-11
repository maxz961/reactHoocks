import React, { useState } from 'react';
import AddListForm from './Components/AddListForm'
import List from './Components/List'

import './App.css'

const App = () => {
  const [tickets, addTicket] = useState([])

  const listTicketUp = (idx) => {
    const myElUP = tickets.slice(idx, idx + 1)
    const myElDown = tickets.slice(idx - 1, idx)
    const startTicketsList = tickets.slice(0, idx - 1)
    const endTicketsList = tickets.slice(idx + 1, tickets.length)
    addTicket([...new Set([...startTicketsList, myElUP[0], myElDown[0], ...endTicketsList])])
  }

  const listTicketDown = (idx) => {
    const myTickDown = tickets.slice(idx, idx + 1)
    const myTickUP = tickets.slice(idx + 1, idx + 2)
    const newTicketsDown = tickets.slice(0, idx)
    const endTicketsDown = tickets.slice(idx + 1, tickets.length)
    addTicket([...new Set([...newTicketsDown, myTickUP[0], myTickDown[0], ...endTicketsDown])])
  }

  const removeTicket = (id) => {
    addTicket(tickets.filter(item => item.id !== id))
  }

  const addSublist = (index) => {
    tickets[index].sublist = true;
    const newTickets = tickets.concat([]);
    addTicket(newTickets)
  }

  const removeSublist = (index) => {
    tickets[index].sublist = false;
    const newTickets = tickets.concat([]);
    addTicket(newTickets)
  }

  const list = tickets.map((item, index) => {
    return <List 
    key={item.id} 
    item={item} 
    oldTickets={tickets} 
    index={index}
    oldListTicketUp={listTicketUp}
    oldListTicketDown={listTicketDown} 
    oldRemoveTicket={removeTicket}
    oldAddSublist={addSublist}
    oldRemoveSublist={removeSublist}
    />
  })

  return (
    <div className='App'>
      <h1>A Nested List Editor</h1>
      <ul>{list}</ul>
      <AddListForm
        onSubmit={(id, value) => addTicket([...tickets, { id, value, sublist: false }])}
      />
    </div>
  )
}

export default App;
