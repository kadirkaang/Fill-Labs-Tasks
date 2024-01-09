"use client"
import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import userService, { User } from '@/services/userServices';

export default function ControlledSelectionGrid() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'firstname', headerName: 'First Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200, },
    ];

    const [rows, setRows] = React.useState<any[]>([]);

    useEffect(() => {
        getAllData();
    }, []);

    function getAllData() {
        userService.getAllUsers()
            .then(allUser => {
                const formattedUsers = handleUserData(allUser);
                setRows(formattedUsers);
            })
            .catch(err => {
                console.log(err);
            });
    }
    function handleUserData(users: User[]) {
        return users.map(user => ({
            id: user.ID,
            firstname: user.FirstName,
            lastname: user.LastName,
            email: user.Email
        }));
    }
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);

    return (
        <div className='flex justify-center my-20 mx-32'>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between pb-10'>
                    <h2>
                        USER MANAGEMENT
                    </h2>
                    <div>
                        <Button variant="contained" href='http://localhost:3000/user'>
                            New
                        </Button>
                        <Button variant="contained" href='#'>
                            Update
                        </Button>
                        <Button variant="contained" href='#'>
                            Delete
                        </Button>
                    </div>
                </div>
                <div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            console.log(newRowSelectionModel);
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                    />
                </div>
            </div>
        </div>
    );
}
