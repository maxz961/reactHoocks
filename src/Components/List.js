import React, { useState } from 'react'
import { AddListForm } from './AddListForm'
import { ActionButtons } from './ActionButtons'

export const List = () => {
    const [tickets, setTickets] = useState([])
   
      const listTicketDownOrUp = (idx, boolean) => {
        const newTickets = tickets.slice()
        const tmp = newTickets[idx];
        newTickets[idx] = newTickets[boolean ? idx+1 : idx-1];
        newTickets[boolean ? idx+1 : idx-1] = tmp;
        
        setTickets(newTickets)
      }

      const removeTicket = (id) => setTickets(tickets.filter(item => item.id !== id))

      const sublistButtonAction = (id, boolean) => {
        const newTicketsArray = tickets.map(ticket => { 
          if(ticket.id === id) return {...ticket, sublist: boolean}
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
                    clickSublistButtonAction={(boolean) => sublistButtonAction(item.id, boolean)} 
                    clickListTicketDownOrUp={(boolean) => listTicketDownOrUp(index, boolean)}
                    />            
                { item.sublist && <List /> }
            </li>
            })
            }
            <AddListForm
                onSubmit={(id, value) => setTickets([...tickets, { id, value, sublist: false }])}
            />
        </ul>
    )
}