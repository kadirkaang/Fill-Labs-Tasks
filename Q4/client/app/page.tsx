"use client"
import React, { useEffect, useState } from 'react'
import DataComponent from '@/components/DataGrid'
import { Button } from '@mui/material'
import userService from "../services/userServices"

interface User {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  ID: number;
  Name: string;
  Surname: string;
  Email: string;
}

export default function Home() {
  const [nodes, setNodes] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await userService.getAllUsers();
        setNodes(users);
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='flex justify-center my-20 mx-32'>
      <div className='flex flex-col flex-1'>
        <div className='flex justify-between pb-10'>
          <h2>
            USER MANAGEMENT
          </h2>
          <div>
            <Button variant="outlined" href='http://localhost:3000/user'>
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
        <DataComponent nodes={nodes}/>
      </div>
    </div>
  )
}
