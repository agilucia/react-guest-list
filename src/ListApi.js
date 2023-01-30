import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

// const bodyContainerStyles = css`
//  display: flex;
//  align-items: center;
//  justify-content: center;
// `;

const wholeBodyStyles = css`
  background-color: #6b7fd7;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-top: 0px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  border: 8px double #5c55ae;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  &:hover {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
`;

const guestStyles = css`
  background-color: #bcedf6;
  border: 4px ridge #5c55ae;
  border-radius: 12px;
  margin: 8px;
  padding: 4px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  &:hover {
    font-size: 120%;
  }
`;

const addButtonContainerStyles = css`
  display: flex;
  justify-content: center;
`;

const addingGuestButtonStyles = css`
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  margin-top: 12px;
  background-color: #5c55ae;
  border-radius: 8px;
  color: white;
  &:hover {
    background-color: #bcedf6;
    font-size: 90%;
    color: black;
  }
`;

const labelStyles = css`
  font-weight: bold;
  &:hover {
    text-shadow: 1px 1px 2px #3f1c60, 0 0 1em #6b7fd7, 0 0 0.2em #6b7fd7;
  }
`;

const nameInputStyles = css`
  margin-left: 8px;
  padding-left: 4px;
  padding-right: 4px;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  border-radius: 8px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
`;

const textStyles = css`
  &:hover {
    text-shadow: 1px 1px 2px #3f1c60, 0 0 1em #6b7fd7, 0 0 0.2em #6b7fd7;
  }
`;

const removeButtonStyles = css`
  margin-left: 8px;
  background-color: #6b7fd7;
  color: white;
  border-radius: 8px;
  &:hover {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
`;

const checkboxStyles = css`
  margin-right: 6px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
`;

export default function ListApi() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // getting all guests
  const baseUrl =
    'https://express-guest-list-api-memory-data-store.agilucia.repl.co';

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
    <div /* css={bodyContainerStyles} */>
      <div css={wholeBodyStyles}>
        <h1 css={textStyles}>Guest List</h1>
        <div>
          <div>
            <div>
              <h2 css={textStyles}>Add new Guest:</h2>
              <form name="form" onSubmit={addNewGuest}>
                <label css={labelStyles}>
                  First name
                  <input
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.currentTarget.value)
                    }
                    disabled={isLoading}
                    css={nameInputStyles}
                  />
                </label>
                <br />
                <label css={labelStyles}>
                  Last name
                  <input
                    value={lastName}
                    onChange={(event) => setLastName(event.currentTarget.value)}
                    disabled={isLoading}
                    css={nameInputStyles}
                  />
                </label>
                <br />
                <div css={addButtonContainerStyles}>
                  <button
                    onClick={addNewGuest}
                    disabled={isLoading}
                    css={addingGuestButtonStyles}
                  >
                    ADD GUEST
                  </button>
                </div>
              </form>
            </div>
          </div>

          {isLoading && <h1>Loading...</h1>}
          {!isLoading && guests.length === 0 ? (
            <div css={textStyles}>Add guests to the list!</div>
          ) : (
            <div>
              <h2 css={textStyles}>Guests:</h2>
              <div>
                {guests.map((guest) => {
                  return (
                    <div key={guest.id} data-test-id="guest" css={guestStyles}>
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
                          css={checkboxStyles}
                        />
                        {guest.attending === true
                          ? 'attending'
                          : 'not attending'}
                      </label>
                      <button
                        aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                        onClick={() => {
                          deleteGuest(guest.id).catch((error) =>
                            console.log(error),
                          );
                        }}
                        css={removeButtonStyles}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
