//ViewCrimeRecords done
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import React, { useState } from 'react'

const ViewCrimeRecords = ({ crimeRoutes }) => {

  return (
    <div className="crime-details">
      <img src={crimeRoutes && crimeRoutes.image} width="200px" height="200px" />
      <h4>{crimeRoutes && crimeRoutes.name}</h4>
      <br></br>
      <p1>
        <strong> Crime Details: </strong>
      </p1>
      <p>
        <big>{crimeRoutes && crimeRoutes.crime}</big>
      </p>
      <p>
        <strong> Criminal's age at time of crime: </strong>
        {crimeRoutes && crimeRoutes.age}
      </p>
      <p>
        <strong> Criminal Status: </strong>
        {crimeRoutes && crimeRoutes.status}
      </p>
      <p>
        {formatDistanceToNow(new Date(crimeRoutes.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  )
}

export default ViewCrimeRecords
