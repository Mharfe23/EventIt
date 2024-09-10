
import React, { useState } from 'react';
import Notification from './Notification';

const GetNotification = ({ notifications }) => {
    const sortedNotifications = notifications.slice().sort((a, b) => b.notification_id - a.notification_id);
  
    return (
      <div>
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification) => (
            <Notification key={notification.notification_id} notification={notification} />
          ))
        ) : (
          <p className='text-center mt-32'>Aucun notifications envoyé</p>
        )}
      </div>
    );
  };
export default GetNotification;
    