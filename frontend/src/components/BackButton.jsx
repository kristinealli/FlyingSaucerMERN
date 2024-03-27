import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
    return (
        <div className='flex'>
            <Link
                to={destination}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-mono rounded-md text-white bg-stardust hover:bg-stardust focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <BsArrowLeft className='text-2xl' /> 
                <span className='ml-3'>Back</span>
            </Link>
        </div>
    );
};

export default BackButton;
