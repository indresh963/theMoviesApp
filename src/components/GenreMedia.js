import React from 'react'
import { useParams } from 'react-router-dom';
function GenreMedia() {
    const { genre } = useParams();
  return (
    <div>
        viewing { genre } genre content
    </div>
  )
}

export default GenreMedia