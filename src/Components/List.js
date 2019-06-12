import React, { useState } from 'react'
import AddListForm from './AddListForm'
import ActionButtons from './ActionButtons'

const List = () => {
    const [tickets, setTickets] = useState([])
   
    const listTicketUp = (idx) => {
        const myElUP = tickets.slice(idx, idx + 1)
        const myElDown = tickets.slice(idx - 1, idx)
        const startTicketsList = tickets.slice(0, idx - 1)
        const endTicketsList = tickets.slice(idx + 1, tickets.length)
        setTickets([...new Set([...startTicketsList, myElUP[0], myElDown[0], ...endTicketsList])])
      }
    
      const listTicketDown = (idx) => {
        const myTickDown = tickets.slice(idx, idx + 1)
        const myTickUP = tickets.slice(idx + 1, idx + 2)
        const newTicketsDown = tickets.slice(0, idx)
        const endTicketsDown = tickets.slice(idx + 1, tickets.length)
        setTickets([...new Set([...newTicketsDown, myTickUP[0], myTickDown[0], ...endTicketsDown])])
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
