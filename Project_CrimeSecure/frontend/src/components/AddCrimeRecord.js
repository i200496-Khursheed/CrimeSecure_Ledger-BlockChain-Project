//AddCrimeRecord done
import {useState} from "react"
import { useAuthContext } from '../hooks/useAuthContext'

const AddCrimeRecord = () => {
    
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [crime, setCrime] = useState('')
    const [age, setAge] = useState('')
    const [status, setStatus] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const crimeRoutes = {name, crime, age, status, image}

        const response = await fetch('/api/crimeRoutes', {
            method: 'POST',
            body: JSON.stringify(crimeRoutes), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const json = await response.json()

        if(!response.ok) {
            //setError(json.error)
            setError("Please Fill all the required information!")
        }

        if(response.ok) {
            setName('')
            setCrime('')
            setAge('')
            setStatus('')
            setImage('')
            setError(null)
            alert('New Crime Record added')
            
        }
    }

    return (
        <form className = "create" onSubmit={handleSubmit}>
            <h3> Add a crime record </h3>

            <label > Criminal Information: </label>
            <input
                type="text"
                placeholder="enter criminal name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label > Crime Detail: </label>
            <input
                type="text"
                placeholder="enter crime info"
                onChange={(e) => setCrime(e.target.value)}
                value={crime}
            />

            <label > Criminal's Age at time of Crime: </label>
            <input
                type="number"
                placeholder="enter age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
            />

            <label> Criminal Status: </label>
            <input
                type="text"
                placeholder="enter status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
            />

            <label> Image: </label>
            <input
                type="text"
                placeholder="paste image-url"
                onChange={(e) => setImage(e.target.value)}
                value={image}
            />

        <button > Add Criminal Record </button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddCrimeRecord