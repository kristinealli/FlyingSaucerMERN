import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateTea = ({ loading }) => {
    const [teaName, setTeaName] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceLink, setSourceLink] = useState("");
    const [typeOfTea, setTypeOfTea] = useState("");
    
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveTea = () => {
        const data = {
            teaName,
            sourceName,
            sourceLink,
            typeOfTea,
        };
        setLoading(true);
        axios
            .post("http://localhost:5555/teas", data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Tea Created successfully', { variant: 'success' });
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                //alert('Unable to create tea!');
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-2xl font-bold'>Create Tea</h1>
            {loading ? <Spinner /> : ""}
    {/* // teaName input */ }
    {/* // sourceName input */ }
    {/* // sourceLink input */}
    {/* // typeOfTea input */ }
            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTea}>
                Save Tea
            </button>
        </div>
    );
};

export default CreateTea;
