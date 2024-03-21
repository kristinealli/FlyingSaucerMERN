import React from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { PiFlyingSaucerBold } from "react-icons/pi";
import { SlCup } from "react-icons/sl";
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import TeaModal from './TeaModal';
import black from '../../assets/images/cardimages/black.jpg';
import green from '../../assets/images/cardimages/green.jpg';
import herbal from '../../assets/images/cardimages/herbal.jpg';
import oolong from '../../assets/images/cardimages/oolong.jpg';
import white from '../../assets/images/cardimages/white.jpg';
import other from '../../assets/images/cardimages/other.jpg';


const TeaSingleCard = ({ tea }) => {
    const [showModal, setShowModal] = useState(false);

    //Function to determine the circle color based on the tea type
    const teaTypeImage = () => {

        switch (tea.typeOfTea) {
            case 'White': return white;
            case 'Green': return green;
            case 'Oolong': return oolong;
            case 'Black': return black;
            case 'Herbal': return herbal;
            default: return other; // Default image
        }
    };

    const colorOfTea = () => {
        switch (tea.typeOfTea) {
            case 'White': return '#f8f8e8'; // A very light color, almost off-white, representing the light color of white tea.
            case 'Green': return '#a3d6a3'; // A fresh, light green, symbolizing the vibrant color of green tea leaves.
            case 'Oolong': return '#b2967d'; // A medium brown with a hint of red, indicative of the diverse range of oolong tea colors.
            case 'Black': return '#3c2f2f'; // A dark brown, almost black, representing the strong, rich color of black tea.
            case 'Herbal': return '#d9c9b0'; // A light, soothing beige, considering the vast range of colors in herbal teas.
            default: return '#ffffff'; // White or a neutral color for default or unknown tea types.
        }
    };


    return (
        <div className="py-4 mx-2">
            <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/3 bg-cover" style={{ backgroundImage: `url(${teaTypeImage()})` }}>
                </div>
                <div className="w-2/3 p-4">
                    <p className="px-3 py-2 text-mystic-violet text-xs text-right font-bold uppercase rounded" style={{ backgroundColor: colorOfTea() }}>{tea.typeOfTea}</p>
                    <h1 className="text-gray-900 truncate font-bold text-xl">{tea.teaName}</h1>
                    <p className="mt-2 text-gray-600 text-sm">{tea.sourceName}</p>
                    <div className="flex item-center mt-2">
                        //Rating Stars
                    </div>
                    <div className="flex justify-between items-center gapx-2 mt-2 p-1 w-full">
                        <div >
                            <BiShow className='text-3xl text-mystic-violet hover:text-white cursor-pointer' onClick={() => setShowModal(true)} />
                        </div>
                        <Link to={`/teas/details/${tea._id}`}>
                            <BsInfoCircle className='text-xl text-mystic-violet hover:text-white' />
                        </Link>
                        <Link to={`/teas/edit/${tea._id}`}>
                            <AiOutlineEdit className='text-xl text-mystic-violet hover:text-white' />
                        </Link>
                        <Link to={`/teas/delete/${tea._id}`}>
                            <MdOutlineDelete className='text-xl text-mystic-violet hover:text-white' />
                        </Link>

                        {showModal && (
                            <TeaModal tea={tea} onClose={() => setShowModal(false)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeaSingleCard