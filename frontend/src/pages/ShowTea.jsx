import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowTea = () => {
    const [tea, setTea] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/teas/${id}`)
            .then((response) => {
                setTea(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-space flex flex-col items-center pt-8">
            <BackButton />
            {loading ? (
                <Spinner />
            ) : (
                <div className="max-w-xl w-full p-6 bg-moonlight rounded-lg shadow-md">
                    <h1 className="text-4xl text-galaxy mb-4">Show Tea</h1>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-lg text-nebula">Id:</span>
                            <span className="text-lg text-cosmic-tea">{tea._id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg text-nebula">Tea Name:</span>
                            <span className="text-lg text-cosmic-tea">{tea.teaName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg text-nebula">Source:</span>
                            <span className="text-lg text-cosmic-tea">{tea.sourceName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg text-nebula">Type of Tea:</span>
                            <span className="text-lg text-cosmic-tea">{tea.typeOfTea}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg text-nebula">Create Time:</span>
                            <span className="text-lg text-cosmic-tea">{new Date(tea.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg text-nebula">Last Update Time:</span>
                            <span className="text-lg text-cosmic-tea">{new Date(tea.updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowTea;
