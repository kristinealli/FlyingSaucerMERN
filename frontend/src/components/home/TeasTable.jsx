import React from 'react';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useSnackbar } from 'notistack';

const TeasTable = ({ teas, toggleFavorite }) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleFavoriteChange = async (teaId, isFavorite) => {
        try {
            await toggleFavorite(teaId, isFavorite);
        } catch (error) {
            enqueueSnackbar("Failed to update favorite status", { variant: "error" });
        }
    };

    return (
        <div>
            <div className='flex justify-center'></div>
            <table className='w-full border-separate bg-moonlight text-black rounded-md border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>Favorite</th>
                        <th className='border border-slate-600 rounded-md'>Name</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Source</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Caffeine Content</th>
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
};

export default TeasTable;
