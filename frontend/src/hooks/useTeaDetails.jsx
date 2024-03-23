import { useState, useEffect } from 'react';
import axios from 'axios';

const useTeaDetails = (id) => {
    const [tea, setTea] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTea = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/teas/${id}`);
                setTea(response.data);
            } catch (err) {
                console.error("Failed to fetch tea:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTea();
    }, [id]);

    return { tea, loading, error };
};

export default useTeaDetails;