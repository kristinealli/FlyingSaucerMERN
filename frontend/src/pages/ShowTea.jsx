import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import useTeaDetails from '../hooks/useTeaDetails';
import DisplayField from '../components/home/DisplayField';
import bkgrd from '../assets/images/teashop.jpg';

const ShowTea = () => {
    const { id } = useParams();
    const { tea, loading, error } = useTeaDetails(id);

    // Explicitly defined order based on the fields in the database
    const fieldOrder = [
        'teaName', 'sourceName', 'sourceLink', 'brewingInfo', 'typeOfTea',
        'description', 'favorite', 'inCollection', 'notes', 'rating', 'caffeineContent'
    ];

    if (loading) return <Spinner />;
    if (error) return <div>Error loading tea details.</div>;

    return (
        <div className="min-h-screen flex flex-col items-center pt-8"
            style={{
                backgroundImage: `url(${bkgrd})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backdropFilter: 'blur(10px)',
            }}>
            <BackButton />
            <div className="max-w-4xl w-full p-8 mt-4 rounded-lg shadow-lg bg-moonlight">
                <h1 className="text-3xl font-semibold text-center font-mono text-galaxy mb-6">Tea Details</h1>
                <div className="space-y-6">
                    {fieldOrder.map(key => {
                        const value = tea[key];
                        return <DisplayField key={key} label={key} value={value} />;
                    })}
                </div>
            </div>
        </div>
    );
};
export default ShowTea;
