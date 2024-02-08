import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./component/Pill";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersEmailID, setSelectedUsersEmailID] = useState(new Set());
  const searchField = useRef(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [cacheResults, setCacheResults] = useState({});
  const fetchUsers = () => {
    setActiveSuggestionIndex(0);
    if (searchTerm.trim() === "") {
      setSearchSuggestions([]);
      return;
    }
    if (cacheResults[searchTerm]) {
      setSearchSuggestions(cacheResults[searchTerm]);
      return;
    }
    fetch("https://dummyjson.com/users/search?q=" + searchTerm)
      .then((results) => results.json())
      .then((data) => {
        setSearchSuggestions(data);
        setCacheResults({ ...cacheResults, [searchTerm]: { ...data } });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(), 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUsersEmailID(new Set([...selectedUsersEmailID, user.email]));
    setSearchTerm("");
    setSearchSuggestions([]);
    searchField.current.focus();
  };

  const handleRemoveUser = (user) => {
    const filteredUsers = selectedUsers.filter(
      (selectedUser) => selectedUser?.email != user.email
    );
    const updatedEmailIDs = new Set(selectedUsersEmailID);
    updatedEmailIDs.delete(user.email);
    setSelectedUsersEmailID(updatedEmailIDs);
    setSelectedUsers(filteredUsers);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      searchTerm === "" &&
      selectedUsers.length >= 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
    } else if (e.key === "ArrowUp" && activeSuggestionIndex > 0) {
      setActiveSuggestionIndex((prevIndex) => prevIndex - 1);
    } else if (
      e.key === "ArrowDown" &&
      searchSuggestions?.users?.length > 0 &&
      activeSuggestionIndex < searchSuggestions?.users?.length - 1
    ) {
      setActiveSuggestionIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === "Enter") {
      handleSelectUser(searchSuggestions?.users[activeSuggestionIndex]);
    }
  };
  return (
    <div
      className="search-container"
      onClick={() => searchField.current.focus()}
    >
      <div className="search-input">
        {/* Pills */}
        {selectedUsers?.map((user) => (
          <Pill
            keu={user.email}
            onClick={() => handleRemoveUser(user)}
            name={`${user.firstName} ${user.lastName}`}
            image={user.image}
          />
        ))}
        <div>
          {/* Search field */}
          <input
            type="text"
            placeholder="Search for a User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            ref={searchField}
          />
          {/* Search suggestions */}
          <ul className="suggestion-list">
            {searchSuggestions?.users?.map(
              (user, index) =>
                !selectedUsersEmailID.has(user.email) && (
                  <li
                    className={activeSuggestionIndex === index ? "active" : ""}
                    key={user.email}
                    onClick={() => handleSelectUser(user)}
                  >
                    <img src={user.image} alt="user_image" />
                    <p>{user.firstName + " " + user.lastName}</p>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
