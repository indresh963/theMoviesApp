import React from 'react'

function Loader() {
  return (
    <div className='d-flex gap-2 align-items-center
    position-absolute top-50 start-50 translate-middle'>
        <span className='load-strip' style={{animationDelay:'200ms'}}></span>
        <span className='load-strip' style={{animationDelay:'400ms'}}></span>
        <span className='load-strip' style={{animationDelay:'600ms'}}></span>
        <span className='load-strip' style={{animationDelay:'800ms'}}></span>
        <span className='load-strip' style={{animationDelay:'1000ms'}}></span>
    </div>
  )
}

export default Loader