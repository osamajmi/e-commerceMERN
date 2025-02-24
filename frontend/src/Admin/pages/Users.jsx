import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Users() {

   const [users, setUsers] = useState([]);


   const getUsers = async ()=>{

      try{

           const users = await axios.get("http://127.0.0.1:3030/users")

           if(users.status == 200){
             console.log(users.data)
              setUsers(users.data)
           }
           else{
              
                setUsers([])
               
           }

      }catch(err){
        console.log(err)
      }

   }

   useEffect(()=>{

      getUsers()

   },[])
  
  
  return (
    <div className="container mt-4">
        <h2 className="text-center mb-4">User Details</h2>
        <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Sr No</th>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone No</th>
                    </tr>
                </thead>
                <tbody>

                
                    {

                      users.map((user,index)=>
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                      )
                      
                    }
               
                   
                </tbody>
            </table>
        </div>
    </div>
  )
}
