"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import userService from '@/services/userServices';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}
interface User {
    CreatedAt: string | null;
    UpdatedAt: string | null;
    DeletedAt: string | null;
    ID: number | null;
    Name: string;
    Surname: string;
    Email: string;
}


const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser: User = {
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        ID: null,
        Name: formData.firstName,
        Surname: formData.lastName,
        Email: formData.email,
      };

      const addedUser = await userService.addNewUser(newUser);
      console.log('User added:', addedUser);
      // Başarılı ekleme durumunda istediğiniz işlemleri yapabilirsiniz
    } catch (error) {
      console.error('Error adding user:', error);
      // Hata durumunda kullanıcıya bildirim veya hata işleme yapılabilir
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
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default MyForm;
