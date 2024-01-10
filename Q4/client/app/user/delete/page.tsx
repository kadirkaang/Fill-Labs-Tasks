"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Grid, Stack } from '@mui/material';
import userService, { User } from '@/services/userServices';
import { useEffect, useState } from 'react';


export default function Update() {
    const router = useRouter()
    const searchParams = useSearchParams()
    // const userIds = searchParams.get('userIds').split(',').map(Number)
    const userIdsParam = searchParams.get('userIds');
    const userIds = userIdsParam ? userIdsParam.split(',').map(Number) : [];

    const [rows, setRows] = useState<any[]>([]);


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'firstname', headerName: 'First Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
    ];

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
                console.log(err);
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

    const handleDeleteUsers = async (userIds: number[]) => {
        try {
            const deletedUsers = await userService.deleteUsersByIds(userIds);
            console.log('Deleted users:', deletedUsers);
            router.push('/')
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <div className='flex justify-center my-20 mx-32'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DataGrid
                        columns={columns}
                        rows={rows}>
                    </DataGrid>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="primary" onClick={() => handleDeleteUsers(userIds)} >
                            Submit
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
