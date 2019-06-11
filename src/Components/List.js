import React, { useState } from 'react'
import AddListForm from './AddListForm'
import Buttons from './Buttons'

const List = () => {
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

    return (
        <React.Fragment>
            {tickets.length > 0 && tickets.map((item,index) => {
           return <li className='btn' key={item.id}>
                <span>{item.value}</span>
                    <Buttons 
                    item={item}
                    index={index}
                    tickets={tickets}
                    clickRemove={() => removeTicket(item.id)}
                    clickRemoveSublist={() => removeSublist(index)}
                    clickAddSublist={() => addSublist(index)} 
                    clickListTicketUp={() => listTicketUp(index, tickets)}
                    clickListTicketDown={() => listTicketDown(index, tickets)}
                    />            
                { item.sublist ?
                    <ul><List /></ul>
                : null }
            </li>
            })
            }
            <AddListForm
                onSubmit={(id, value) => addTicket([...tickets, { id, value, sublist: false }])}
            />
        </React.Fragment>
    )
}

export default List;
