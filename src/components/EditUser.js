import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const userDocRef = doc(database, 'users', id);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setInputs(userData);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userDocRef = doc(database, 'users', id);
        try {
            await updateDoc(userDocRef, inputs);
            navigate('/itemList');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input value={inputs.name || ''} type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input value={inputs.email || ''} type="text" name="email" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input value={inputs.mobile || ''} type="text" name="mobile" onChange={handleChange} />
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
