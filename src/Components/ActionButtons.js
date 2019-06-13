import React from 'react'

export const ActionButtons = ({item, index, tickets, clickRemove, clickSublistButtonAction, clickListTicketDownOrUp}) => {
    return (
        <React.Fragment>
            {index !== 0 && <button className='btn' onClick={() => clickListTicketDownOrUp(false)}>
                ↑
            </button>}
            {index !== tickets.length - 1 && <button className='btn' onClick={() => clickListTicketDownOrUp(true)}>
                ↓
            </button>}
            {
            item.sublist 
            ? <button onClick={() => clickSublistButtonAction(false)} className='btn'>Remove Sublist</button> 
            : <button onClick={() => clickSublistButtonAction(true)} className='btn'>Add Sublist</button>
            }
            <button className='btn' onClick={() => clickRemove()}>
                Remove
            </button>
        </React.Fragment>
    )
}