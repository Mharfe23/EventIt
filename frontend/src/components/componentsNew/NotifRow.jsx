import React from 'react'

const NotifRow = ({date,content,title}) => {
    return (
		<div className='mb-2  w-full '>
            <h5 className="font-semibold text-lg p-0 m-0 text-green-500">{date.slice(0,10)}</h5>
            <div className='p-2 px-4'>
                <p className='font-semibold mb-2 text-base'>{title}</p>
                <p className='text-sm'>{content}</p>
            </div>
        </div>
	);
}

export default NotifRow