import React from 'react'

const SearchItem = ({serchItem, setSerchItem}) => {
  return (
    <form className='serchForm' onSubmit={ e => e.preventDefault()}>
        <input 
            type="text"
            placeholder=' искать семинар'
            value={serchItem}
            onChange={ e => setSerchItem(e.target.value)} 
        />
    </form>
  )
}

export default SearchItem