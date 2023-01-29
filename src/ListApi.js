import './App.css';
import { useEffect, useState } from 'react';

export default function ListApi() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guest, setGuest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // getting all guests
  const baseUrl = 'http://localhost:4000';

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuest(allGuests);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchGuests().catch(() => console.log('fetching guests went wrong'));
  }, []);

  // if (isLoading) {
  //    return 'is Loading...';
  // }

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
    setGuest([...guest], createdGuest);
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
    const newGuestList = guest.filter((i) => {
      return i.id !== deletedGuest.id;
    });
    setGuest(newGuestList);
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
    const updatedGuestList = guest.filter((i) => {
      return i.id !== updatedGuest.id;
    });
    setGuest([...guest], updatedGuestList);
    fetchGuests().catch(() =>
      console.log('changing attendance status went wrong'),
    );
  }

  return (
    <div data-test-id="guest">
      {isLoading && <h1>Loading...</h1>}
      <h1>Guest List</h1>
      <div>
        <div>
          <div>
            <h2>Add new Guest:</h2>
            <form name="form" onSubmit={addNewGuest}>
              <label>
                First name
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                  disabled={isLoading}
                />
              </label>
              <br />
              <label>
                Last name
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                  disabled={isLoading}
                />
              </label>
              <br />
              <div>
                <button onClick={addNewGuest} disabled={isLoading}>
                  ADD GUEST
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          {guest.length === 0 ? (
            <div>Add guests to the list!</div>
          ) : (
            <div>
              <h2>Guests:</h2>
              {guest.map((guestList) => {
                return (
                  <div key={guestList.id}>
                    <div>
                      {guestList.firstName} {guestList.lastName}
                    </div>
                    <label>
                      <input
                        aria-label={`attending status ${guestList.firstName} ${guestList.lastName}`}
                        type="checkbox"
                        checked={guestList.attending}
                        onChange={() => {
                          changeAttendanceStatus(
                            guestList.id,
                            guestList.attending,
                          ).catch((error) => console.log(error));
                        }}
                      />
                      {guestList.attending === true
                        ? 'attending'
                        : 'not attending'}
                    </label>
                    <button
                      aria-label={`Remove ${guestList.firstName} ${guestList.lastName}`}
                      onClick={() => {
                        deleteGuest(guestList.id).catch((error) =>
                          console.log(error),
                        );
                        document.form.reset();
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
