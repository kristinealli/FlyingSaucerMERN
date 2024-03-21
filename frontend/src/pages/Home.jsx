import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import TeasTable from "../components/home/TeasTable";
import TeasCard from "../components/home/TeasCard";

const Home = () => {
    const [teas, setTeas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/teas")
            .then((response) => {
                setTeas(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-space min-h-screen p-4 text-moonlight">
            <div className='flex justify-center items-center gap-x-4 mb-8'>
                <button
                    className={`px-4 py-2 rounded-lg ${showType === 'table' ? 'bg-stardust text-white' : 'bg-galaxy hover:bg-nebula'
                        }`}
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${showType === 'card' ? 'bg-stardust text-white' : 'bg-galaxy hover:bg-nebula'
                        }`}
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>
            <div className=' py-6 flex justify-between items-center'>
                <h1 className='text-6xl text-galaxy font-serif text-center'>Your Teas</h1>
                <Link to='/teas/create' className='text-stardust hover:text-nebula'>
                    <MdOutlineAddBox className='text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <TeasTable teas={teas} />
            ) : (
                <TeasCard teas={teas} />
            )}
        </div>
    );
};

export default Home;
