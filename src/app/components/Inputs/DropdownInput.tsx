"use client";
import React, { useCallback, useState, useMemo } from "react";
import { User } from "@/app/types/users";

import { Chip } from "../Chips/Chip";
import { ChipAvatar } from "../Chips/Chip.molecules";

interface IDropdownInput {
  users: User[];
}

interface IDropdown {
  users: User[];
  optionsLimit?: number;
  handleUserClick: (user: User) => void;
}

interface IDropdownOption {
  user: User;
  onClick: () => void;
}

const DropdownInput: React.FC<IDropdownInput> = ({ users }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedChip, setSelectedChip] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleChipSelect = useCallback((selectedUser: User) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user: User) => user.id !== selectedUser.id)
    );
  }, []);

  const filteredUsers = useMemo(() => {
    if (!showDropdown) return [];

    return users.filter(
      (user) =>
        !selectedUsers.includes(user) &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [showDropdown, selectedUsers, searchQuery, users]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && searchQuery === "") {
      if (selectedUsers.length > 0) {
        if (selectedChip) {
          handleChipSelect(selectedChip);
          setSelectedChip(null);
        } else {
          const lastSelectedUser = selectedUsers[selectedUsers.length - 1];
          setSelectedChip(lastSelectedUser);
        }
      }
    } else if (selectedChip) {
      setSelectedChip(null);
    }
  };

  return (
    <div className="relative min-w-64 w-[400px] my-2">
      <div className="flex flex-wrap items-center w-full p-1 outline-none border  outline-white rounded-md text-sm ">
        {selectedUsers.map((user) => (
          <Chip
            key={user.id}
            user={user}
            selectedChip={selectedChip}
            onSelect={() => setSelectedChip((u) => (u === user ? null : user))}
            handleDelete={() => handleChipSelect(user)}
          />
        ))}
        <input
          type="text"
          value={searchQuery}
          placeholder="Type a name or email"
          onKeyDown={handleKeyDown}
          onClick={() => setShowDropdown((d) => !d)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-opacity-50 rounded border-0 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        />
      </div>
      {showDropdown && (
        <Dropdown users={filteredUsers} handleUserClick={handleUserClick} />
      )}
    </div>
  );
};

const Dropdown: React.FC<IDropdown> = ({ users, handleUserClick, optionsLimit = 5 }) => {
  return (
    <ul className="absolute w-full max-h-80 overflow-y-auto no-scrollbar py-1 mt-2 bg-gray-100 border-gray-300 rounded-md shadow-lg ">
      {users.length > 0 ? (
        users
          .slice(0, optionsLimit)
          .map((user) => (
            <DropdownOption
              key={user.id}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          ))
      ) : (
        <li className="px-3 py-2 cursor-pointer hover:bg-gray-800 text-gray-100 text-sm">
          No Results to select!
        </li>
      )}
    </ul>
  );
};

const DropdownOption: React.FC<IDropdownOption> = ({ user, onClick }) => {
  return (
    <li
      key={user.id}
      className="p-2 m-1 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-800 text-sm flex gap-2 items-center"
      onClick={onClick}
    >
      <ChipAvatar url={user.displayPicture} name={user.name} />
      <div className="flex flex-col">
        <p>{user.name}</p>
        <p className="text-xs font-light">{user.email}</p>
      </div>
    </li>
  );
};

export default DropdownInput;
