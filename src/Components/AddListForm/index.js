import React, {useState} from 'react'

const useInputValue = initialValue => {
    const [value, setValue] = useState(initialValue)

    return {
        value,
        onChange: e => setValue(e.target.value),
        resetValue: () => setValue('')
    }
}

const AddListForm = ({onSubmit}) => {
    const {resetValue, ...text} = useInputValue('')

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                onSubmit(Date.now(), text.value);
                resetValue()
                }}>
                <input className='btn' type='text' {...text} />
                <input className='btn' type='submit' value={'Add'}/>
            </form>
        </div>
    )
}

export default AddListForm