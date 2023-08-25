import React from 'react'
import { useParams } from 'react-router-dom';
function CategorySearch() {
    const params = useParams();
  return (
    <div>viewing {params.cat} {params.form} </div>
  )
}

export default CategorySearch