// App.js done
import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import AddCrimePage from './pages/AddCrimePage' // admins
import ViewCrimeRecordsPage from './pages/ViewCrimeRecordsPage' // citizens

import Login from './pages/Login'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <div className = "pages">
        <Routes>
          <Route 
              path="/" 
              element={user && (user.email.endsWith('@admin.crimesecure.com')) ? <AddCrimePage /> : <Navigate to="/login" />} 
            />

          <Route 
              path="/ViewCrimeRecordsPage" 
              element={user && 
                       (user.email.endsWith('@admin.crimesecure.com') ||
                       user.email.endsWith('@citizen.crimesecure.com'))? <ViewCrimeRecordsPage /> : <Navigate to="/login" />} 
            />

            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/ViewCrimeRecordsPage" />} 
            />
            
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/ViewCrimeRecordsPage" />} 
            />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;