import React from 'react'

const Container = ({children}) => {
  return (
    <div>
      <div className="max-w-330 mx-auto ">{children}</div>
    </div>
  )
}

export default Container
