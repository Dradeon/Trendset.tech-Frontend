import React from 'react'

const ProductTile = ({name}: {name: string}) => {
  return (
    <div className='flex justify-between max-w-3xl mb-4'>
        <h2>{name}</h2>
        <div className='flex gap-4'>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default ProductTile