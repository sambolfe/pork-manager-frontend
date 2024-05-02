import React, { useState, useEffect } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Aqui você faria a chamada para o backend para buscar os dados do usuário
    // Vou simular uma chamada assíncrona para obter o nome do usuário após um certo tempo
    const fetchUserData = async () => {
      try {
        // Simulação de uma chamada assíncrona
        const response = await fetch('URL_DO_BACKEND');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="relative inline-block mt-4 mr-6">
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm px-1 font-medium text-gray-900 rounded-full hover:text-blue-600 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=1.75&w=200&h=200&q=80"
          alt="user photo"
        />
        {userData ? userData.name : 'Carregando...'}
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
          <div className="px-4 py-3 text-sm text-gray-900">
            <div className="font-medium">{userData ? userData.role : 'Carregando...'}</div>
            <div className="truncate">{userData ? userData.email : 'Carregando...'}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <a
                href="/gerenciar-usuario"
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
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
