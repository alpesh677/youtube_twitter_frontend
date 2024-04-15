import React from 'react'

function Video({src, poster}) {
  return (
    <video 
    src={src}
    poster = {poster}
    autoPlay
    controls
    playsInline
    className='sm:h-[60vh] sm:w-full w-full h-[60vh] object-contain'
    >
    </video>
  )
}

export default Video