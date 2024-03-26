import React, { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';

function Checkinputbox({ onDeleteData }) {
  const [checkNumbers, setCheckNumbers] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numbersArray = checkNumbers.split(',').map(num => num.trim());

      const batch = numbersArray.map(num => ({
        inv_id: num,
        received: true
      }));
      await Promise.all(batch.map(data => addDoc(collection(database, 'checks'), data)));

      setMessage('Check numbers added successfully.');

      // Move data from Not Check Received to Check Received section
      await Promise.all(
        numbersArray.map(async (num) => {
          const orderDocRef = doc(database, 'orders', num);
          const orderSnapshot = await getDoc(orderDocRef);
          if (orderSnapshot.exists()) {
            const orderData = orderSnapshot.data();
            await addDoc(collection(database, 'checks'), { ...orderData, received: true });
            await deleteDoc(orderDocRef);
          }
        })
      );

      // Trigger the callback function to delete data
      onDeleteData(numbersArray);

    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing your request.');
    }
  };

  return (
    <div>
      <h2 id='check-topic'>Insert Check Received</h2>
      <form onSubmit={handleSubmit}>
        <div className='checkInsertForm'>
          <label id='checkCont' htmlFor="inv_id">Check Numbers (comma-separated):</label><br />
          <input
            type="text"
            id="inv_id"
            name="inv_id"
            value={checkNumbers}
            onChange={(e) => setCheckNumbers(e.target.value)}
          /><br /><br />
        </div>
        <input id='checkinsertbut' type="submit" value="Submit" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Checkinputbox;
