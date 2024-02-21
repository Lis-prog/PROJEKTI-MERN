import React, {useEffect} from 'react'
import axios from 'axios'
const HomePage = () => {

  // Te dhenat e login user 
  const getUserData = async  () => {
    try {
      const res = await axios.post('/api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
        <h1>Home Page</h1>
    </div>
  )
}

export default HomePage
