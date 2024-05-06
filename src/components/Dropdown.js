import React, { useState } from 'react';
import { logout } from '../services/auth'; // Importar função logout

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Limpar token do armazenamento local
    window.location.href = '/login'; // Redirecionar para a página de login
  };

  return (
    <div className="relative inline-block mt-4 mr-6">
      <button
        id="dropdownAvatarNameButton"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm px-1 font-medium text-gray-900 rounded-full hover:text-blue-600 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <div className="w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
          <svg
            className="w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownAvatarName"
          className="z-10 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <a
                href="/gerenciarUsuario"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Gerenciar usuário
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogout} // Adicionar evento onClick para logout
            >
              Sair
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
