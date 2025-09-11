import { onValue, ref, remove } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import db from './firebase'

function Home() {
  const [mydata, setmydata] = useState([])

  useEffect(() => {
    const myRef = ref(db, "userdata")

    onValue(myRef, (x) => {
      const data = x.val()

      if (data) {
        const dataArray = Object.entries(data)
        const newarray = dataArray.map(([id, value]) => ({
          id,
          ...value
        }))
        setmydata(newarray)
      } else {
        setmydata([])
      }
    })
  }, [])

  const handleDelete = (id) => {
    if (confirm("Do you want to delete?") === true) {
      remove(ref(db, `userdata/${id}`))
      console.log("Data successfully removed!")
    } else {
      console.log("Click on yes to delete")
    }
  }

  return (
    <div className='container'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mydata.length > 0 ? (
            mydata.map((cur) => {
              const { id, name, mobile, email, address } = cur
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{mobile}</td>
                  <td>{email}</td>
                  <td>{address}</td>
                  <td>
                    <button>Edit</button>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Home
