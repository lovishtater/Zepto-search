"use client";
import React, { useCallback, useState, useMemo } from "react";
import { User } from "@/app/types/users";

import { Chip } from "../Chips/Chip";
import users from "@/app/mockUsers.json";
import { ChipAvatar } from "../Chips/Chip.molecules";

const DropdownInput: React.FC = () => {
  const customUsers: User[] = users;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [lastBackspacedUser, setLastBackspacedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setIsOpen(false);
    setValue("");
  };

  const handleUserSelect = useCallback((selectedUser: User) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user: User) => user.id !== selectedUser.id)
    );
  }, []);

  const filteredUsers = useMemo(() => {
    if (!isOpen) return [];

    return customUsers.filter(
      (user) =>
        !selectedUsers.includes(user) &&
        (user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()))
    );
  }, [isOpen, selectedUsers, value, customUsers]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && value === "") {
      if (selectedUsers.length > 0) {
        const lastSelectedUser = selectedUsers[selectedUsers.length - 1];
        if (lastSelectedUser === lastBackspacedUser) {
          handleUserSelect(lastSelectedUser);
          setLastBackspacedUser(null);
        } else {
          setLastBackspacedUser(lastSelectedUser);
        }
      }
    } else {
      setLastBackspacedUser(null);
    }
  };

  return (
    <div className="relative min-w-64 w-[400px] my-2">
      <div className="flex flex-wrap items-center w-full p-1 outline-none border  outline-white rounded-md text-sm ">
        {selectedUsers.map((user) => (
          <Chip
            key={`${user.id}$${user.name}`}
            user={user}
            lastBackspacedUser={lastBackspacedUser}
            handleUserSelect={handleUserSelect}
          />
        ))}
        <input
          type="text"
          value={value}
          placeholder="Type a name or email"
          onKeyDown={handleKeyDown}
          onClick={() => setIsOpen(!isOpen)}
          onChange={(e) => setValue(e.target.value)}
          className="flex-grow bg-opacity-50 rounded border-0 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        />
      </div>
      {isOpen && (
        <ul className="absolute w-full max-h-80 overflow-y-auto no-scrollbar py-1 mt-2 bg-gray-100 border-gray-300 rounded-md shadow-lg ">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="p-2 m-1 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-800 text-sm flex gap-2 items-center"
            >
              <ChipAvatar url={user.displayPicture} name={user.name} />
              <div className="flex flex-col">
                <p>{user.name}</p>
                <p className="text-xs font-light">{user.email}</p>
              </div>
            </li>
          ))}
          {selectedUsers.length === customUsers.length && (
            <li
              key={"none-result"}
              className="px-3 py-2 cursor-pointer hover:bg-gray-800 text-gray-100 text-sm"
            >
              No Results to select!
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;
