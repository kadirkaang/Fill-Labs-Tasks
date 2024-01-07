import React from 'react'
import DataComponent from '@/components/DataGrid'
import { Button } from '@mui/material'

export default function Home() {
  return (
    <div className='flex justify-center my-20 mx-32'>
      <div className='flex flex-col flex-1'>
        <div className='flex justify-between pb-10'>
          <h2>
            USER MANAGEMENT
          </h2>
          <div>
            <Button variant="outlined">
              New
            </Button>
            <Button variant="outlined">
              Update
            </Button>
            <Button variant="outlined">
              Delete
            </Button>
          </div>
        </div>
        <DataComponent />
      </div>
    </div>
  )
}
