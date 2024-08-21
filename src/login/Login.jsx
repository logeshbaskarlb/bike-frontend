import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [option, setOption] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleOptions = (e) => {
        setOption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const res = await axios.post('http://localhost:5050/', {
                username: input,
                option
            });
            console.log(res.data);

            if (option === "user") {
                navigate("/user",  { state: { username: input } } );
            } else if (option === "admin") {
                navigate("/admin",  { state: { username: input } });
            } else {
                console.error("Please select an option");
            }
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="Name">
                    <label>Username: </label>
                    <input type="text" name="username" value={input} onChange={handleInput} />
                </div>

                <div className="select-option">
                    <label>Status: </label>
                    <select value={option} name="option" onChange={handleOptions}>
                        <option value="" disabled>Select an option</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;