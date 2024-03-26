import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseConfig"; // Import your Firebase configuration
import { useNavigate } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        inv_id: "",
        name: "",
        email: "",
        mobile: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Add user data to Firestore collection
            await addDoc(collection(database, "users"), { ...inputs, timestamp: serverTimestamp() });
            console.log("User created successfully!");
            // Redirect to itemList after successful creation
            navigate("/itemList");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };
    
    return (
        <div>
            <h1>Create user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Invoice ID: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="inv_id"
                                    value={inputs.inv_id}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={inputs.name}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={inputs.mobile}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
