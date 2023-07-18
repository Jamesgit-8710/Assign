import React from 'react'

function Main(props) {
  return (
    props.value ? 
    <div>Login Seccussful</div>
    : <div>Not registered</div>
  )
}

export default Main