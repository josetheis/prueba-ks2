import User from "../../interfaces/User";
import UserItem from "../UserItem";

interface UserListProps {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function UserList({ users, onDelete, onEdit }: UserListProps) {
  const actionHandler = (id: number, action: 'edit' | 'delete') => {
    switch(action) {
      case 'delete':
        onDelete(id);
        break;
      case 'edit':
        onEdit(id);
        break;
      default:
        throw new Error('La accion requerida no ha sido implementada');
    }
  }

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            Nombre
          </th>
          <th scope="col" className="px-4 py-3">
            Email
          </th>
          <th scope="col" className="px-4 py-3">
            Status
          </th>
          <th scope="col" className="px-4 py-3">
            Fecha de Registro
          </th>
          <th scope="col" className="px-4 py-3">
            Fecha de Modificacion
          </th>
          <th scope="col" className="px-4 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem onAction={actionHandler} key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}
