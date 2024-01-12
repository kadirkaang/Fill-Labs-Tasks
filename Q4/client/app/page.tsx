"use client"
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import userService, { User } from '@/services/userServices';

export default function AllDataGrid() {
    const router = useRouter();


    // Define the columns for the data grid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'firstname', headerName: 'First Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200, },
    ];

    const [rows, setRows] = React.useState<any[]>([]);
    const [userIds, setUserIds] = React.useState<GridRowId[]>([])

    // Fetch all user data on component mount
    useEffect(() => {
        getAllData();
    }, []);

    // Function to fetch all user data
    function getAllData() {
        userService.getAllUsers()
            .then(allUser => {
                const formattedUsers = handleUserData(allUser);
                setRows(formattedUsers);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleDeleteButtonClick = (userIds: GridRowId[]) => {
        const userIdString = userIds.join(',');
        router.push(`/user/delete?userIds=${userIdString}`);
    }
    const handleUpdateButtonClick = (userIds: GridRowId[]) => {
        const userIdString = userIds.join(',');
        router.push(`/user/update?userIds=${userIdString}`);
    }

    // Function to format user data for the data grid
    function handleUserData(users: User[]) {
        return users.map(user => ({
            id: user.ID,
            firstname: user.FirstName,
            lastname: user.LastName,
            email: user.Email
        }));
    }

    // State for row selection model in the data grid
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);

    // Data configuration for the data grid
    const data = {
        initialState: {
            pagination: { paginationModel: { pageSize: 10 } },
        },
    };

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
                                onClick={() => handleUpdateButtonClick(userIds)}
                                disabled={userIds.length === 0}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleDeleteButtonClick(userIds)}
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
                        pageSizeOptions={[10, 25, 50]}
                        initialState={{
                            ...data.initialState,
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
