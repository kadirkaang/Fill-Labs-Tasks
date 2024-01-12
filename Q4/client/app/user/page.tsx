"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Stack } from '@mui/material';
import userService, { User } from '@/services/userServices';
import { useRouter } from 'next/navigation';


// Define the form data interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function UserForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });


  // Handle input changes in the form
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser: User = {
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        ID: null,
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
      };

      await userService.addNewUser(newUser);
      router.push('/')
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='flex flex-1 justify-center pt-10'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary" type="submit">
                Create
              </Button>
              <Button variant="outlined" color="error" onClick={() => router.push('/')}>
                Back
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}