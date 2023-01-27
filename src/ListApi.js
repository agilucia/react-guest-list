import { useEffect, useState } from 'react';

export default function ListApi() {
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guest, setGuest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // getting all guests
  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuest(allGuests);
      setIsLoading(false);
    }
    fetchGuests().catch((error) => console.log(error));
  }, []);

  // if (isLoading) {
 //    return 'is Loading...';
  // }

  // adding a new guest to the list
  async function addNewGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: '{POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName}),
    });
    const createdGuest = await response.json();
    setGuest([...guest], createdGuest);
    addNewGuest().catch((error) => console.log(error));
    setFirstName('');
    setLastName('');
  }
}
