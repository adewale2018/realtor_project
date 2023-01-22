import React from 'react'

const ListItem = ({ id, list }) => {
  return (
    <div>
      <h1>{list.data.name}</h1>
    </div>
  )
}

export default ListItem