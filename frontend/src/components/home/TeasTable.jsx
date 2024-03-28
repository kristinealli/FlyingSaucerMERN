import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useSnackbar } from 'notistack';


const TeasTable = ({ teas: initialTeas, toggleFavorite }) => {
    const { enqueueSnackbar } = useSnackbar();
    // Initialize teas with the sorted list by favorite then name
    const [teas, setTeas] = useState(() => sortInitialTeas(initialTeas));
    const [sortOrder, setSortOrder] = useState('favorites');
    const [sortField, setSortField] = useState('favorite'); // Default sort field

    useEffect(() => {
        setTeas(sortInitialTeas(initialTeas));
    }, [initialTeas]);

    // Function to sort teas on initial load or when initialTeas changes
    function sortInitialTeas(teas) {
        return [...teas].sort((a, b) => b.favorite - a.favorite || a.teaName.localeCompare(b.teaName));
    }


    const handleFavoriteChange = async (teaId, isFavorite) => {
        try {
            await toggleFavorite(teaId, isFavorite);
            setTeas(currentTeas => sortTeas([...currentTeas.map(tea => tea._id === teaId ? { ...tea, favorite: isFavorite } : tea)]));
        } catch (error) {
            enqueueSnackbar("Failed to update favorite status", { variant: "error" });
        }
    };

    const toggleSortOrder = (field) => {
        setSortField(field);
        setSortOrder(currentOrder => {
            if (currentOrder === 'ascending') return 'descending';
            return 'ascending';
        });
    };

    const sortTeas = (teasToSort) => {
        return teasToSort.sort((a, b) => {
            // Check if the property exists on both objects and provide a default value if not
            let aValue = a[sortField] || '';
            let bValue = b[sortField] || '';

            // If sorting by 'favorite', convert boolean to number for comparison
            if (sortField === 'favorite') {
                aValue = aValue ? 1 : 0;
                bValue = bValue ? 1 : 0;
            }

            if (sortOrder === 'ascending') {
                return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
            }
            if (sortOrder === 'descending') {
                return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
            }
        });
    };

    const sortByFavorites = () => {
        setSortField('favorite');
        setTeas(currentTeas => {
            let sortedTeas = [...currentTeas].sort((a, b) => b.favorite - a.favorite || a.teaName.localeCompare(b.teaName));
            return sortedTeas;
        });
        setSortOrder('favorites');
    };

// Update to add arrows that align with the sort order
    // Listen for sortOrder changes and sort the list accordingly
    useEffect(() => {
        if (sortOrder !== 'favorites' || sortField !== 'favorite') {
            setTeas(currentTeas => sortTeas([...currentTeas]));
        }
    }, [sortOrder, sortField]);

    return (
        <div>
            <div className='flex justify-center'></div>
            <table className='w-full border-separate bg-moonlight text-black rounded-md border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md' onClick={sortByFavorites}>Favorite</th>
                        <th className='border border-slate-600 rounded-md' onClick={() => toggleSortOrder('teaName')}>Name</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden' onClick={() => toggleSortOrder('sourceName')}>Source</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden' onClick={() => toggleSortOrder('caffeineContent')}>Caffeine Content</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {teas.map((tea) => (
                        <tr key={tea._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <input
                                    type="checkbox"
                                    checked={tea.favorite}
                                    onChange={(e) => handleFavoriteChange(tea._id, e.target.checked)}
                                />
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {tea.teaName}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {tea.sourceName}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {tea.caffeineContent}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/teas/details/${tea._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`teas/edit/${tea._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`teas/delete/${tea._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeasTable;
