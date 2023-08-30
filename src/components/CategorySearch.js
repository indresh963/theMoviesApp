import React from 'react'
import { useParams } from 'react-router-dom';
function CategorySearch() {
    const params = useParams();
    console.log(params);
  return (
    <div>viewing {params.param2} {params.param1} </div>
  )
}

export default CategorySearch