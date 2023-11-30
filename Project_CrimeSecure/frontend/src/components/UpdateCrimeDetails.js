//UpdateCrimeDetails done
import {useState} from "react"
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const UpdateCrimeDetails = ({crimeRoutes}) => {
    const [age, setAge] = useState('')
    const [status, setStatus] = useState('')
    
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
          return;
        }
      
        const response = await fetch('/api/crimeRoutes/' + crimeRoutes._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
      
        if (response.ok) {
          alert('Crime Record Deleted!');
        } else if (response.status === 403) {
          alert('You are not authorized to delete the Crime!');
        }
      }
      
    const updateInfo = async () => {

        const Crime={

            age: age,
            status: status,
            
        }
        const response = await fetch('/api/crimeRoutes/' + crimeRoutes._id, {
            method: 'PATCH',
            body: JSON.stringify(Crime), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(response.ok){
            alert('Criminal Record Updated')
            setAge('')
            setStatus('')
        }else if (response.status === 403) {
            alert('You are not authorized to Update the Crime!.');
          }
    }
    
    return (
        <div className="new-crime-details">
            <img src= {crimeRoutes && crimeRoutes.image} width="200px" height="200px"/>
            <h4>{crimeRoutes && crimeRoutes.name}</h4>
            <br></br>
            <p1><strong> Crime Detail: </strong></p1>
            <p><big>{crimeRoutes && crimeRoutes.crime}</big></p>
            <p><strong> Criminal's age at time of crime: </strong>{crimeRoutes && crimeRoutes.age}</p>
            <p><strong> Status: </strong>{crimeRoutes && crimeRoutes.status}</p>
            <p>{formatDistanceToNow(new Date(crimeRoutes.createdAt), { addSuffix: true })}</p>
        
            <button className="deleteButton" onClick={handleClick}> Delete </button>
            <button className="updateButton" onClick={updateInfo}>Update</button>
            <br></br>
            <br></br>
            <form className = "updateTextBox" onSubmit ={updateInfo}>
                
                <label data-testid = "update"> Update Status: </label>
                <input
                type="text"
                placeholder="edit status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                 />

                <label> Update Criminal's Age: </label>
                <input
                 type="number"
                 placeholder="edit age"
                 onChange={(e) => setAge(e.target.value)}
                 value={age && age}
                 />
            </form>
        </div>
        
    )
}

export default UpdateCrimeDetails