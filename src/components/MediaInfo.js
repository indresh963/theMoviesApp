import React from 'react'
import { useParams } from 'react-router-dom'
function MediaInfo() {
    const { mediaId } = useParams();
  return (
    <div>
        viewing information about the media with id = { mediaId}
    </div>
  )
}

export default MediaInfo