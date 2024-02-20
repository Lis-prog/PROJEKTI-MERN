import React from 'react'
import "../styles/RegisterStyles.css"
import {Form, Input} from 'antd'
import {Link} from 'react-router-dom'


const Register = () => {

    // form handler 
    const onfinishHandler = (values) => {
        console.log(values)
    }

  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
        <h3 className='text-center'>Regjistrohu</h3>
        <Form.Item label="Emri" name="emri">
            <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
            <Input type="text" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type="text" required />
        </Form.Item>
        <Link to="/login" className='m-2'>Nëse ke një account ateherë bej Login</Link>
        <button className='btn btn-primary' type='submit'>Register</button>
      </Form>
    </div>
    </>
  )
}

export default Register
