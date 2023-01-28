import { useState } from 'react';

export default function GuestListForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleChange(event) {
    setFirstName(event.target.value);
  }

  function handleAnotherChange(event) {
    setLastName(event.target.value);
  }

  function handleSubmit(event) {
    const newGuests = [
      {
        id: `${firstName}-${lastName}`,
        name: {
          first: firstName,
          last: lastName,
        },
      },
      ...guests,
    ];
    setGuests(newGuests);
    setFirstName('');
    setLastName('');
    event.preventDefault();
  }

  return (
    <>
      <h1>Guest List</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          First name
          <input
            onChange={handleChange}
            value={firstName}
            placeholder="First name"
          />{' '}
        </label>
        <label>
          Last name
          <input
            onChange={handleAnotherChange}
            value={lastName}
            placeholder="Last name"
          />
        </label>
        <button hidden>Add guest</button>
        <br />
        <br />
        Guests:{' '}
        {guests.map((guest) => {
          return (
            <div key={`guest-${guest.id}`}>
              {guest.name.first} {guest.name.last}{' '}
              <input
                aria-label={`Attending status ${guest.name.first} ${guest.name.last}`}
                checked={isChecked}
                type="checkbox"
                onChange={(event) => setIsChecked(event.currentTarget.checked)}
              />
              Is {isChecked ? '' : 'not'} attending!
              <button
                aria-label={`Remove ${guest.name.first} ${guest.name.last}`}
                onClick={() => {
                  const newGuests = guests.filter((i) => {
                    return i.id !== newGuests.id;
                  });
                  setGuests(newGuests);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </form>
    </>
  );
}
