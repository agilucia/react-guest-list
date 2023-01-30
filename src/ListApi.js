import './App.css';
import { useEffect, useState } from 'react';

export default function ListApi() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // getting all guests
  const baseUrl = 'http://localhost:4000';

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuests(allGuests);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchGuests().catch(() => console.log('fetching guests went wrong'));
  }, []);

  // adding a new guest to the list
  async function addNewGuest(event) {
    event.preventDefault();
    console.log('A');
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    console.log('B');
    const createdGuest = await response.json();
    console.log(createdGuest);
    setGuests([...guests], createdGuest);
    fetchGuests().catch(() => console.log('adding new guest went wrong'));
    setFirstName('');
    setLastName('');
  }

  // deleting a guest from the list
  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuestList = guests.filter((i) => {
      return i.id !== deletedGuest.id;
    });
    setGuests(newGuestList);
    fetchGuests().catch(() => console.log('deleting guest went wrong'));
  }

  // attending/not attending status
  async function changeAttendanceStatus(id, value) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !value }),
    });
    const updatedGuest = await response.json();
    const updatedGuestList = guests.filter((i) => {
      return i.id !== updatedGuest.id;
    });
    setGuests([...guests], updatedGuestList);
    fetchGuests().catch(() =>
      console.log('changing attendance status went wrong'),
    );
  }

  return (
    <div>
      <h1>Guest List</h1>
      <div>
        <div>
          <div>
            <h2>Add new Guest:</h2>
            <form name="form" onSubmit={addNewGuest}>
              <label htmlFor="first_name">First name</label>
              <input
                id="first_name"
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
                disabled={isLoading}
              />
              <br />
              <label htmlFor="last_name">Last name</label>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
                disabled={isLoading}
              />
              <br />
              <div>
                <button onClick={addNewGuest} disabled={isLoading}>
                  ADD GUEST
                </button>
              </div>
            </form>
          </div>
        </div>
        <div data-test-id="guest">
          {isLoading && <h1>Loading...</h1>}
          {!isLoading && guests.length === 0 ? (
            <div>Add guests to the list!</div>
          ) : (
            <div>
              <h2>Guests:</h2>
              {guests.map((guest) => {
                return (
                  <div key={guest.id}>
                    <div>
                      {guest.firstName} {guest.lastName}
                    </div>
                    <label>
                      <input
                        aria-label={`attending status ${guest.firstName} ${guest.lastName}`}
                        type="checkbox"
                        checked={guest.attending}
                        onChange={() => {
                          changeAttendanceStatus(
                            guest.id,
                            guest.attending,
                          ).catch((error) => console.log(error));
                        }}
                      />
                      {guest.attending === true ? 'attending' : 'not attending'}
                    </label>
                    <button
                      aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                      onClick={() => {
                        deleteGuest(guest.id).catch((error) =>
                          console.log(error),
                        );
                      }}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
