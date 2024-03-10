import Layout from './../components/Layout'
import React from 'react'
import {message, Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const NotifcationPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    const handleMarkAllRead = async (req, res) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification', {userId:user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(hideLoading())
            if(res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error('Something went wrong')
        }
    }
    const handleDeleteAllRead = async (req, res) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification', {userId:user._id},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success) {
                message.success(res.data.message)
            } else {
                message.success(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong in notification')
        }
    }
  return (
    <Layout>
        <h1 className='p-3 text-center'>Notifcation Page</h1>
        <Tabs>
            <Tabs.TabPane tab="Unread" key={0}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
                </div>
                {
                user?.notification.map(notificationMgs => (
                    <div className='card' style={{cursor: 'pointer'}}>
                        <div className='card-text'  onClick={() => navigate(notificationMgs.onClickPath)} >
                            {notificationMgs.message}
                        </div>
                    </div>
                ))
            }
            </Tabs.TabPane>
          
            <Tabs.TabPane tab="Read" key={1}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2' style={{cursor: 'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
                </div>
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotifcationPage
