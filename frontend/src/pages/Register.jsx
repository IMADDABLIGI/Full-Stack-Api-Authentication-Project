import React from 'react'
import Form from '../components/Form'

function Register() {
  localStorage.clear()
  return <Form route="/api/user/register/" method="register"/>
}

export default Register
