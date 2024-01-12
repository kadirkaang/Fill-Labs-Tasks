"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import userService, { User } from '@/services/userServices';
import { Button, Grid, Stack } from '@mui/material';


export default function Update() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const userIdsParam = searchParams.get('userIds');
    const userIds = userIdsParam ? userIdsParam.split(',').map(Number) : [];

    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        if (userIds) {
            getUsersData(userIds)
        }
    }, []);

    function getUsersData(userIds: number[]) {
        userService.getUsersById(userIds)
            .then(users => {
                let formattedUsers = Array.isArray(users)
                    ? handleUsersData(users)
                    : [handleSingleUserData(users)];
                setRows(formattedUsers);
            })
            .catch(err => {
                console.error(err);
            });
    };

    function handleUsersData(users: User[]) {
        return users.map(user => ({
            id: user.ID,
            firstname: user.FirstName,
            lastname: user.LastName,
            email: user.Email
        }));
    };

    function handleSingleUserData(user: User) {
        return [{
            id: user.ID,
            firstname: user.FirstName,
            lastname: user.LastName,
            email: user.Email
        }];
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'firstname', headerName: 'First Name', width: 130, editable: true },
        { field: 'lastname', headerName: 'Last Name', width: 130, editable: true },
        { field: 'email', headerName: 'Email', width: 200, editable: true },
    ];

    const handleUpdate = () => {
        rows.map((row) => {
            userService.updateUser(row.id, row)
                .then((res) => {
                    // Omitted logging for update response
                })
                .catch(err => { console.error(err) })
        })
        router.push('/')
    }


    return (
        <div className='flex justify-center my-20 mx-32'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        processRowUpdate={(updatedRow, oldRow) => {
                            const updatedRows = rows.map(row => {
                                return row.id === updatedRow.id ? updatedRow : row;
                            });
                            setRows(updatedRows);
                            return updatedRow;
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="primary" onClick={handleUpdate} >
                            Save
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => router.push('/')}>
                            Back
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
