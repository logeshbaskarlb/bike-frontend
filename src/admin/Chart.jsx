import axios from "axios";
import { useEffect, useState } from "react";

const Chart = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the backend
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:5050/getBikeSelections');
            setData(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // getting the data 
    useEffect(() => {
        getData();
    }, []);


  return (
    <div>
      
    </div>
  )
}

export default Chart
