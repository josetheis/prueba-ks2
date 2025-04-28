import { useEffect, useState } from "react";
import "./App.css";
import User from "./interfaces/User";
import Button from "./components/Button";
import Title from "./components/Title";
import UserList from "./components/UserList";
import AddUserDTO from "./interfaces/AddUserDTO";
import AddUser from "./components/AddUser";

function App() {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const localUsers = localStorage.getItem('USERS');
    setUsers(localUsers == null ? [] : JSON.parse(localUsers));
  }, [])

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  const closeHandler = () => {
    setIsSaveModalOpen(false);
  };

  const saveHandler = ({ email, name }: AddUserDTO) => {
    const nextId = Math.max(0, ...users.map((user) => user.id)) + 1;
    const newUser: User = {
      id: nextId,
      name,
      email,
      status: "ACTIVE",
      createdAt: "",
      updatedAt: "",
    };

    setUsers([...users, newUser]);
    setIsSaveModalOpen(false);
  };

  return (
    <>
      <AddUser
        isOpen={isSaveModalOpen}
        onClose={closeHandler}
        onSave={saveHandler}
      />
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-screen">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="dark:bg-gray-800 relative shadow-md sm:rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <Title>Lista de Usuarios</Title>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Button
                  type="primary"
                  onClick={() => {
                    setIsSaveModalOpen(true);
                  }}
                >
                  Agregar Usuario
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <UserList
                users={users}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
