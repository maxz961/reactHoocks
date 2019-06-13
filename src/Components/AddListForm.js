import React, {useState} from 'react'

const useInputValue = initialValue => {
    const [value, setValue] = useState(initialValue)

    return {
        value,
        onChange: e => setValue(e.target.value),
        resetValue: () => setValue('')
    }
}

export const AddListForm = ({onSubmit}) => {
    const {resetValue, ...text} = useInputValue('')

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                text.value.length > 0 && onSubmit(Date.now(), text.value);
                resetValue()
                }}>
                <input className='btn' type='text' {...text} />
                <button className='btn' >Add</button>
            </form>
        </div>
    )
}