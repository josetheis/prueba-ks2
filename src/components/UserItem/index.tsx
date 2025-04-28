import { useEffect, useRef, useState } from "react";
import User from "../../interfaces/User";

interface UserItemProps {
  user: User;
  onAction: (id:number, action: 'edit' | 'delete') => void;
}

export default function UserItem({ user, onAction }: UserItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const actionHandler = (action: 'edit' | 'delete') => {
    setIsDropdownOpen(false);
    onAction(user.id, action)
  }

  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
        if(!menuRef.current?.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    })
  }, [])

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.name}
      </th>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3">
        {user.status === "ACTIVE" ? (
          <span className="bg-green-700 text-white text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
            Activo
          </span>
        ) : (
          <span className="bg-red-700 text-white text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
            Inactivo
          </span>
        )}
      </td>
      <td className="px-4 py-3">sdaasdf</td>
      <td className="px-4 py-3">$2999</td>
      <td className="px-4 py-3 flex items-center justify-end">
        <button
          onClick={() => setIsDropdownOpen(true)}
          id="apple-imac-27-dropdown-button"
          data-dropdown-toggle="apple-imac-27-dropdown"
          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            ref={menuRef}
            id="apple-imac-27-dropdown"
            className="origin-top-right absolute rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            role="listbox"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="apple-imac-27-dropdown-button"
            >
              <li>
                <a
                    onClick={() => actionHandler('edit')}
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Editar
                </a>
              </li>
              <li>
                <a
                onClick={() => actionHandler('delete')}
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Eliminar
                </a>
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
}
