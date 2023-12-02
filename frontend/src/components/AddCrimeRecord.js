// AddCrimeRecord.js

import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import Web3 from 'web3'; // Import web3 library

const AddCrimeRecord = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState('');
  const [crime, setCrime] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const crimeRoutes = { name, crime, age, status, image };

    try {
      // Send data to MongoDB
      const response = await fetch('/api/crimeRoutes', {
        method: 'POST',
        body: JSON.stringify(crimeRoutes),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add crime record to MongoDB');
      }

      // Send data to Ganache blockchain using web3
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // Update with your Ganache server URL

      // Get accounts
      const accounts = await web3.eth.getAccounts();

      // Get your contract ABI and address
      const contractABI = [
        {
          "inputs": [],
          "name": "crimeCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "crimes",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "crime",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "image",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "crime",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "image",
              "type": "string"
            }
          ],
          "name": "addCrime",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]; 

      const contractAddress = '0x8aE60485D23E02d67D8b068C7B499C86bfF63c7e'; // Add your contract address here

      const myContract = new web3.eth.Contract(contractABI, contractAddress);

      // Call your contract's addCrime function
      const transaction = await myContract.methods.addCrime(
        name,
        crime,
        parseInt(age),
        status,
        image
      ).send({ from: accounts[0] });

      console.log('Transaction:', transaction);

      // Reset form on success
      setName('');
      setCrime('');
      setAge('');
      setStatus('');
      setImage('');
      setError(null);
      alert('New Crime Record added');

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add crime record');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
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

      <label > Criminal's Age at the time of Crime: </label>
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
  );
};

export default AddCrimeRecord;
