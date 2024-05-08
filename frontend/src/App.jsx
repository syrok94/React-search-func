/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Pill from "../src/Pill";

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [alreadySelected, setAlreadySelected] = useState(new Set([]));
  const inputRef = useRef(null);

  const fetchUser = async () => {
    try {
      if (search.trim() === "") {
        setUser([]);
        return;
      }
      const res = await fetch(`https://dummyjson.com/users/search?q=${search}`);
      const data = await res.json();
      setUser(data.users);
    } catch (error) {
      console.error("error fetching data : ", error);
    }
  };

  const ss = new Set([]);
  ss.add("dsadasd");

  console.log(ss.size);

  useEffect(() => {
    fetchUser();
  }, [search]);

  const handleSelectedUser = (person) => {
    setSelectedUser([...selectedUser, person]);
    setAlreadySelected(new Set([...alreadySelected, person.email]));
    setSearch("");
    setUser([]);
    inputRef.current.focus();
  };

  const handlePillClick = (id) => {
    const updateSelectedUser = selectedUser.filter((user) => user.email !== id);
    alreadySelected.delete(id);
    setSelectedUser(updateSelectedUser);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if(e.key === "Backspace" && e.target.value ==="" && selectedUser.length > 0){
      const lastUser = selectedUser[selectedUser.length - 1];
      handlePillClick(lastUser.email);
    }
  };
  return (
    <div className="p-2 m-4">
      <div className="border-2 p-2 flex items-center">
        <div className="flex flex-wrap gap-2">
          {selectedUser.map((person) => (
            <Pill
              key={person.email}
              firstName={person.firstName}
              onClick={() => handlePillClick(person.email)}
            />
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={search}
          onKeyDown={handleKeyDown}
          className="p-3 w-4/6 focus:border-none focus:outline-none"
          placeholder="Search a user..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {
        <ul
          className={search.trim() !== "" ? "border-2 border-grey w-2/6" : ""}
        >
          {user.map((person) => {
            return !alreadySelected.has(person.email) ? (
              <li
                className="border-2 border-grey bg-white-500 hover:bg-gray-100 p-3 cursor-pointer "
                key={person.email}
                onClick={() => handleSelectedUser(person)}
              >
                {person.firstName} {person.lastName}
              </li>
            ) : (
              <></>
            );
          })}
        </ul>
      }
    </div>
  );
}

export default App;
