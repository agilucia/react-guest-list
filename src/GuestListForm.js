import { useEffect, useState } from 'react';

let id = 0;

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
        id: id,
        name: {
          first: firstName,
          last: lastName,
        }
      },
      ...guests,
    ];
    id++;
    setGuests(newGuests);
    setFirstName('');
    setLastName('');
    event.preventDefault();
  }

  return(
    <>
    <h1>Guest List</h1>
    <br />
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange}
      value={firstName}
      placeholder="First name" />
      <input onChange={handleAnotherChange}
      value={lastName}
      placeholder="Last name" />
      <button>Add guest</button>
      <br />
      <br />
      Guests: {guests.map((guest) => {
        return <div key={`guest-${guest.id}`}>{guest.name.first} {guest.name.last}</div>;
      })}
    </form>
      <div>

        <form onChange={handleChange}>
          <label>First name <input placeholder="Your first name" /></label>
          <label>Last name <input placeholder="Your last name" /></label>
        </form>
      </div>
      <div>
        <input checked={isChecked} type="checkbox" onChange={(event) => setIsChecked(event.currentTarget.checked)} />
        Is {isChecked ? '' : 'not'} attending!
      </div>
    </>
  )
}
