import './App.css';
import { useEffect, useState } from 'react';

function App() {
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

  if (isLoading) {
    return 'is Loading...';
  }

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



  return (

    <>
      <div>
        <h1>Guest List</h1>
        <div>
          <label>First name <input placeholder="Your first name"/></label>
        </div>
        <div>
          <label>Last name <input placeholder="Your last name"/></label>
        </div>
      </div>
      <div>
        <input checked={isChecked} type="checkbox" onChange={(event) => setIsChecked(event.currentTarget.checked)} />
        Is {isChecked ? '' : 'not'} attending!
      </div>

    </>


  );
}

export default App;
