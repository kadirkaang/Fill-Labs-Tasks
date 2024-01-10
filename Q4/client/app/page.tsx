"use client"
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import userService, { User } from '@/services/userServices';

export default function AllDataGrid() {
    const router = useRouter();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'firstname', headerName: 'First Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200, },
    ];

    const [rows, setRows] = React.useState<any[]>([]);
    const [userIds, setUserIds] = React.useState<GridRowId[]>([])

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

    const handleDeleteAndUpdateButtonClick = (userIds: GridRowId[]) => {
        const userIdString = userIds.join(',');
        router.push(`/user/delete?userIds=${userIdString}`);
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
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                onClick={() => router.push('/user')}
                            >
                                New
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleDeleteAndUpdateButtonClick(userIds)}
                                disabled={userIds.length === 0}
                            >
                                Update
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleDeleteAndUpdateButtonClick(userIds)}
                                disabled={userIds.length === 0}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </div>
                </div>
                <div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setUserIds(newRowSelectionModel)
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                    />
                </div>
            </div>
        </div>
    );
}
