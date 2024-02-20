    import React from 'react'
    import "../styles/RegisterStyles.css"
    import {Form, Input} from 'antd'
    import {Link} from 'react-router-dom'

const Login = () => {

      // form handler 
      const onfinishHandler = (values) => {
        console.log(values)
    }

  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
        <h3 className='text-center'>Hyni në llogarine tuaj</h3>
        <Form.Item label="Email" name="email">
            <Input type="text" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type="text" required />
        </Form.Item>
        <Link to="/register" className='m-2'>Nëse nuk ke një account ateherë bej Regjistrimin</Link>
        <button className='btn btn-primary' type='submit'>Login</button>
      </Form>
    </div>
    </>
  )
}

export default Login
