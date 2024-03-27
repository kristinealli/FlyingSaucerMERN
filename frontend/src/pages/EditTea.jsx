import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import bkgrd from '../assets/images/teashop.jpg';

const EditTea = () => {
    const [tea, setTea] = useState({
        teaName: '',
        sourceName: '',
        sourceLink: '',
        brewingInfo: {
            waterTemp: { value: '', unit: 'C' },
            teaAmountPerCup: { value: '', unit: 'grams' },
            steepTime: { value: '', unit: 'minutes' },
        },
        typeOfTea: '',
        description: '',
        favorite: false,
        inCollection: false,
        notes: '',
        rating: 0,
        caffeineContent: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/teas/${id}`)
            .then((response) => {
                setTea(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                enqueueSnackbar('Failed to fetch tea details', { variant: 'error' });
            });
    }, [id, enqueueSnackbar]);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name.includes('.')) {
            const keys = name.split('.');
            setTea(prevTea => ({
                ...prevTea,
                [keys[0]]: {
                    ...prevTea[keys[0]],
                    [keys[1]]: { ...prevTea[keys[0]][keys[1]], [keys[2]]: value },
                },
            }));
        } else {
            setTea(prevTea => ({ ...prevTea, [name]: value }));
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:5555/teas/${id}`, tea);
            enqueueSnackbar('Tea updated successfully', { variant: 'success' });
            navigate(-1); // Go back to the previous page
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to update tea', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };
    
    const toggleBrewingInfo = () => {
        setShowBrewingInfo(prevState => !prevState);
    };

    const fieldOrder = [
        'teaName',
        'sourceName',
        'sourceLink',
        'typeOfTea',
        'brewingInfo.waterTemp',
        'brewingInfo.teaAmountPerCup',
        'brewingInfo.steepTime',
        'description',
        'favorite',
        'inCollection',
        'notes',
        'rating',
        'caffeineContent',
    ];


    if (loading) return <Spinner />;

    return (
        <div className="min-h-screen flex flex-col items-center pt-8"
            style={{
                backgroundImage: `url(${bkgrd})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backdropFilter: 'blur(10px)',
            }}>
            <BackButton />
            <form className="max-w-4xl w-full p-8 mt-4 rounded-lg shadow-lg bg-moonlight" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold text-center font-mono text-galaxy mb-6">Edit Tea Details</h1>
                <div className="space-y-6">
                    {fieldOrder.map(field => {
                        // Handling nested fields (brewingInfo)
                        if (field.includes('.')) {
                            const [parentKey, childKey] = field.split('.');
                            const value = tea[parentKey][childKey].value;
                            return (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">
                                        {`${parentKey} ${childKey}`}
                                    </label>
                                    <input
                                        type="text"
                                        name={`${parentKey}.${childKey}.value`}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            );
                        }
                        // Handling top-level fields
                        const value = tea[field];
                        if (field === 'typeOfTea') {
                            return (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">
                                        {field}
                                    </label>
                                    <select
                                        name={field}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {['Green', 'Black', 'Herbal', 'Oolong', 'White'].map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        
                        if (field === 'caffeineContent') {
                            return (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">
                                        {field}
                                    </label>
                                    <select
                                        name={field}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {['High', 'Medium', 'Low', 'None'].map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }

                        if (typeof value !== 'object') {
                            return (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type={field === 'favorite' || field === 'inCollection' ? 'checkbox' : 'text'}
                                        name={field}
                                        value={field === 'favorite' || field === 'inCollection' ? undefined : value}
                                        checked={field === 'favorite' || field === 'inCollection' ? value : undefined}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            );
                        }
                        return null; 
                    })}
                </div>
                <div className="flex justify-center mt-4">
                <button type="submit" className="inline-flex justify-center my-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save Changes
                </button>
                </div>
            </form>
        </div>

    );
};


export default EditTea;
