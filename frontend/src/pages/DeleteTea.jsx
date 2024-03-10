import React, { useState } from 'react';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteTea = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteTea = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/teas/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Tea Deleted successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                //alert('Unable to delete tea!');
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Tea</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you SURE you wish to DELETE this tea?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteTea}>
                    Yes, I wish to DELETE this tea.
                </button>
            </div>
        </div>
    )
}

export default DeleteTea;