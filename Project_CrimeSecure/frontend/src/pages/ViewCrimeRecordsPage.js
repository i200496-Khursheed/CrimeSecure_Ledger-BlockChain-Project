//ViewCrimeRecordsPage done
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import ViewCrimeRecords from "../components/ViewCrimeRecords";

const ViewCrimeRecordsPage = () => {
  const [crimeRoutes, setCrimes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCrimes = async () => {
      const response = await fetch("/api/crimeRoutes",{
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        setCrimes([...json]);
      }
    };
    if (user) {
      fetchCrimes()
    }
  }, []);

  const filteredCrimes = crimeRoutes?.filter((crime) =>
    crime.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ViewCrimeRecordsPage">
    <div className="search-bar">
        <input
            type="text"
            placeholder="Search Criminal Records"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
      <div className="crimeRoutes">
        {filteredCrimes &&
          filteredCrimes.map((crime) => (
            <ViewCrimeRecords key={crime._id} crimeRoutes={crime} />
          ))}
      </div>
    </div>
  );
};

export default ViewCrimeRecordsPage;
