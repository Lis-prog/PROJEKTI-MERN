import React from 'react'
import "../styles/RegisterStyles.css"
import {Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
const navigate = useNavigate()
    // form handler 
    const onfinishHandler =  async (values) => {
        try {
          const res = await axios.post('/api/v1/user/register', values)
          if(res.data.success) {
            message.success('Regjistrimi u be me sukses!')
            navigate('/login')
          } else {
            message.error(res.data.message)
          }
        } catch(error) {
          console.log(error)
          message.error(`Dicka shkoi keq`)
        }
    }

  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
        <h3 className='text-center'>Regjistrohu</h3>
        <Form.Item label="Name" name="name">
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
