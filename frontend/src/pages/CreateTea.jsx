import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTea = () => {
    const [teaName, setTeaName] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceLink, setSourceLink] = useState("");
    const [typeOfTea, setTypeOfTea] = useState("");
    const [loading, setLoading] = useState(false);
    const [inCollection, setInCollection] = useState(true);
    const navigate = useNavigate();
    
    const handleSaveTea = (event) => {
        event.preventDefault();
        const data = {
            teaName,
            sourceName,
            sourceLink,
            typeOfTea,
            inCollection,
        };
        setLoading(true);
        axios
            .post("http://localhost:5555/teas", data)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                alert('Unable to create tea!');
                console.log(error);
            });
    };
    return (
        <div className="min-h-screen bg-space flex flex-col items-center pt-10 pb-20 px-4">
            <BackButton />
            {loading ? (
                <Spinner />
            ) : (
                <div className="w-full max-w-md">
                    <h1 className="text-moonlight text-3xl font-bold text-center mb-10">
                        Add a New Tea
                    </h1>
                    <form onSubmit={handleSaveTea} className="bg-nebula shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label htmlFor="teaName" className="block text-stardust text-sm font-bold mb-2">
                                Varietal Name:
                            </label>
                            <input
                                id="teaName"
                                type="text"
                                value={teaName}
                                onChange={(e) => setTeaName(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-nebula leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sourceName" className="block text-stardust text-sm font-bold mb-2">
                                Producer:
                            </label>
                            <input
                                id="sourceName"
                                type="text"
                                value={sourceName}
                                onChange={(e) => setSourceName(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-nebula leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sourceLink" className="block text-stardust text-sm font-bold mb-2">
                                Source Link:
                            </label>
                            <input
                                id="sourceLink"
                                type="url"
                                value={sourceLink}
                                onChange={(e) => setSourceLink(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-nebula leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="typeOfTea" className="block text-stardust text-sm font-bold mb-2">
                                Category of Tea:
                            </label>
                            <select
                                id="typeOfTea"
                                value={typeOfTea}
                                onChange={(e) => setTypeOfTea(e.target.value)}
                                required
                                className="shadow border rounded w-full py-2 px-3 text-nebula leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select a type...</option>
                                <option value="Green">Green</option>
                                <option value="Black">Black</option>
                                <option value="Herbal">Herbal</option>
                                <option value="Oolong">Oolong</option>
                                <option value="White">White</option>
                                <option value="Puerh">Puerh</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="inCollection" className="block text-stardust text-sm font-bold mb-2">
                                In Collection:
                            </label>
                            <input
                                id="inCollection"
                                type="checkbox"
                                checked={inCollection}
                                onChange={(e) => setInCollection(e.target.checked)}
                                className="leading-tight"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-stardust hover:bg-galaxy text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Save Tea
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateTea;