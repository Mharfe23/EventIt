import React from 'react'
import moment from 'moment';
const Notification = ({notification}) => {
    const formatDate = (dateStr) => {
        return moment(dateStr).format('MMMM D, HH:mm');
      };
  return (
    <div className='p-4 border-b-2 border-gray-400 border-opacity-100'>
    <h6 className='font-bold'>{notification.title}</h6>
    <div className='flex justify-between'>
    <p className='text-gray-600 flex'>{notification.content}</p>
    <p className=''>{formatDate(notification.created_at)}</p>
    </div>
    </div>
  )
}

export default Notification