import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'


const History = () => {

   const {user}=useContext(AuthContext);



  return (
    <div>

        {user ?(
          <div></div>
        ):(
            <>
            <div>Please login</div>
            </>
        )}
    </div>
  )
}

export default History