import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./Chart";

const Admin = () => {

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

    const style = {
      border: "1px solid black",
      paddingg : "10px",
    }

    return (
        <div>
            <h1>Bike Assembly Selections</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <table style={{border : "1px solid black"}}>
                    <thead>
                        <tr >
                        <th style={style}>Username</th>
                            <th style={style}>Bike</th>
                            <th style={style}>Start Time</th>
                            <th style={style}>Stop Time</th>
                        </tr>
                    </thead>
                    <tbody >
                        {data.map((entry, index) => (
                            <tr key={index} >
                                <td style={style}>{entry.username}</td>
                                <td style={style}>{entry.bike}</td>
                                <td style={style}>{new Date(entry.startTime).toLocaleString()}</td>
                                <td style={style}>{entry.stopTime ? new Date(entry.stopTime).toLocaleString() : "Ongoing"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div>
              <h2>Using line chart</h2>
             <Chart />

            </div>
        </div>
    );
}
;
export default Admin;
