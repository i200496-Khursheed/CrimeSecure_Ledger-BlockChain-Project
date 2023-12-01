//AddCrimePage done
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import UpdateCrimeDetails from '../components/UpdateCrimeDetails'
import AddCrimeRecord from '../components/AddCrimeRecord'

const AddCrimePage = () => {
    const[crimeRoutes, setCrimes] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCrimes = async () => {
            const response = await fetch('/api/crimeRoutes', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if(response.ok){
                setCrimes([...json])
            }
        }
        if (user) {
            fetchCrimes()
        }
    })

    return (
        <div className ="AddCrimePage">
            <div className="crimeRoutes">
                {crimeRoutes && crimeRoutes.map((crimeRoutes) => (
                    <UpdateCrimeDetails key = {crimeRoutes._id} crimeRoutes={crimeRoutes} />
                ))}
            </div>
         <AddCrimeRecord />
        </div>
    )
}

export default AddCrimePage