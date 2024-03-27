import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import TeasTable from "../components/home/TeasTable";
import TeasCard from "../components/home/TeasCard";
import bkgrd from '../assets/images/cardimages/other.jpg'; // Background for the main content
import banbkgrd from '../assets/images/flyingsaucers.jpg'; // Background for the banner

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

    const toggleFavorite = (teaId, isFavorite) => {
        // Optimistically updates the UI
        const updatedTeas = teas.map(tea =>
            tea._id === teaId ? { ...tea, favorite: isFavorite } : tea
        );
        setTeas(updatedTeas);
        // Updates the favorite status on the server
        axios.put(`http://localhost:5555/teas/${teaId}/favorite`, { favorite: isFavorite })
            .then(response => {
                console.log("Favorite status updated successfully", response);
            })
            .catch(error => {
                console.error("Failed to update favorite status", error);
            });
    };

    return (
        <div className="bg-space min-h-screen p-4 text-moonlight" style={{ backgroundImage: `url(${bkgrd})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backdropFilter: 'blur(10px)', }}>
            <div className='flex justify-center items-center gap-x-4 mb-8'>
                <button className={`px-4 py-2 rounded-lg ${showType === 'table' ? 'bg-stardust text-white' : 'bg-galaxy hover:bg-nebula'}`} onClick={() => setShowType('table')}>
                    Table
                </button>
                <button className={`px-4 py-2 rounded-lg ${showType === 'card' ? 'bg-stardust text-white' : 'bg-galaxy hover:bg-nebula'}`} onClick={() => setShowType('card')}>
                    Card
                </button>
            </div>
        <div className="bg-space min-h-screen p-4 text-moonlight">
            <div className='relative flex justify-between items-center gap-x-4 mb-8'>
                <div
                    className='absolute top-0 left-0 w-full h-full rounded-lg'
                    style={{
                        backgroundImage: `url(${banbkgrd})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backdropFilter: 'blur(10px)',
                        opacity: '0.9',
                    }}
                ></div>
                {/* Overlay Gradient */}
                <div className="absolute top-0 left-0 w-full h-full rounded-lg" style={{
                    background: 'linear-gradient(135deg, #1B2849 0%, #393550 25%, #073b4c 50%, #EBB6C9 75%, #ced4e6 100%)',
                    opacity: '0.7'
                }}></div>

                {/* Text and Icons */}
                <h1 className='relative z-10 text-6xl text-spirit font-serif text-center'>Your Teas</h1>
                <Link to='/teas/create' className='relative z-10 text-space hover:text-nebula'>
                    <MdOutlineAddBox className='text-4xl' />
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <TeasTable teas={teas} toggleFavorite={toggleFavorite} />
            ) : (
                <TeasCard teas={teas} />
            )}
        </div>
    </div>
    );
};

export default Home;
