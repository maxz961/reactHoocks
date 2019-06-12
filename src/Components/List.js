import React, { useState } from 'react'
import AddListForm from './AddListForm'
import ActionButtons from './ActionButtons'

const List = () => {
    const [tickets, setTickets] = useState([])
   
    const listTicketUp = (idx) => {

      const newTickets = tickets.slice()
        const tmp = newTickets[idx];
        newTickets[idx] = newTickets[idx-1];
        newTickets[idx-1] = tmp;
        
        setTickets(newTickets)
      }
    
      const listTicketDown = (idx) => {
        const newTickets = tickets.slice()
        const tmp = newTickets[idx];
        newTickets[idx] = newTickets[idx+1];
        newTickets[idx+1] = tmp;
        
        setTickets(newTickets)
      }

      const removeTicket = (id) => {
        setTickets(tickets.filter(item => item.id !== id))
      }

      const addSublist = (id) => {
        const newTicketsArray = tickets.map(ticket => {
              if(ticket.id === id) {
                return {...ticket, sublist: true}
              }
            return ticket
          })
        setTickets(newTicketsArray)
      }

      const removeSublist = (id) => {
        const newTicketsArray = tickets.map(ticket => {
              if(ticket.id === id) {
                return {...ticket, sublist: false}
              }
            return ticket
          })
        setTickets(newTicketsArray)
      }

    return (
        <ul>
            {tickets.length > 0 && tickets.map((item,index) => {
           return <li className='btn' key={item.id}>
                <span>{item.value}</span>
                    <ActionButtons 
                    item={item}
                    index={index}
                    tickets={tickets}
                    clickRemove={() => removeTicket(item.id)}
                    clickRemoveSublist={() => removeSublist(item.id)}
                    clickAddSublist={() => addSublist(item.id)} 
                    clickListTicketUp={() => listTicketUp(index, tickets)}
                    clickListTicketDown={() => listTicketDown(index, tickets)}
                    />            
                { item.sublist ?
                    <List />
                : null }
            </li>
            })
            }
            <AddListForm
                onSubmit={(id, value) => setTickets([...tickets, { id, value, sublist: false }])}
            />
        </ul>
    )
}

export default List;
