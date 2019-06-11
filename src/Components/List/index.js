import React, { useState } from 'react'
import AddListForm from '../AddListForm'

const List = ({item, oldTickets, index, oldListTicketUp, oldListTicketDown, oldRemoveTicket, oldAddSublist, oldRemoveSublist}) => {
    const [tickets, addTicket] = useState([])
    let addTickets = null

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

      const clearState = (index) => {
        oldRemoveSublist(index)
        addTicket([])
      }


    if(item.sublist) {      
        addTickets = tickets.map((item, index) => {
            return (
            <List 
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
            );
        });
    }

    return (
        <li className='btn' key={item.id}>
            <span>{item.value}</span>
            {index !== 0 && <button className='btn' onClick={() => oldListTicketUp(index, oldTickets)}>
                    ↑
                </button>}
                {index !== oldTickets.length - 1 && <button className='btn' onClick={() => oldListTicketDown(index, oldTickets)}>
                    ↓
                </button>}
                {
                item.sublist 
                ? <button onClick={() => clearState(index)} className='btn'>Remove Sublist</button> 
                : <button onClick={() => oldAddSublist(index)} className='btn'>Add Sublist</button>
                }
                <button className='btn' onClick={() => oldRemoveTicket(item.id)
                }>
                    Remove
                </button>            
            { addTickets ?
               <div>
                    <ul>{addTickets}</ul>
                    <AddListForm
                        onSubmit={(id, value) => addTicket([...tickets, { id, value, sublist: false }])}
                    />
                </div>
          : null }
        </li>
    )
}

export default List;
