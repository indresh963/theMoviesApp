import React from 'react'
import { useLocation } from 'react-router-dom'

function Person() {
  const {personId} = useLocation().state;
  return (
    <div>Personid = {personId} </div>
  )
}

export default Person