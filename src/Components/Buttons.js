import React from 'react'

const Buttons = ({item, index, tickets, clickRemove, clickRemoveSublist, clickAddSublist, clickListTicketUp, clickListTicketDown}) => {
    return (
        <React.Fragment>
            {index !== 0 && <button className='btn' onClick={() => clickListTicketUp()}>
                ↑
            </button>}
            {index !== tickets.length - 1 && <button className='btn' onClick={() => clickListTicketDown()}>
                ↓
            </button>}
            {
            item.sublist 
            ? <button onClick={() => clickRemoveSublist()} className='btn'>Remove Sublist</button> 
            : <button onClick={() => clickAddSublist()} className='btn'>Add Sublist</button>
            }
            <button className='btn' onClick={() => clickRemove()}>
                Remove
            </button>
        </React.Fragment>
    )
}

export default Buttons