import React from 'react';
import Dropdown from './Dropdown';


const Header = () => {
    return (
        <header className="flex border-b bg-white font-sans min-h-[70px] tracking-wide relative z-50">
            <div className="flex flex-wrap items-center justify-between px-10 py-3 gap-4 w-full">
                <a href="/">
                    <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
                </a>

                <div id="collapseMenu" className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
                    <button id="toggleClose" className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-name="16" data-original="#000000"></path>
                            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-name="16" data-original="#000000"></path>
                        </svg>
                    </button>

                    <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                        <li className="mb-6 hidden max-lg:block">
                            <a href="/">
                                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
                            </a>
                        </li>
                        <li className="max-lg:border-b max-lg:py-3">
                            <a href="/" className="hover:text-blue-600 text-[15px] font-bold text-blue-600 block">Home</a>
                        </li>
                        <li className="group max-lg:border-b max-lg:py-3 relative">
                            <a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold lg:hover:fill-[#007bff] block">Alojamentos<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24"><path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" data-name="16" data-original="#000000" /></svg></a>
                            <ul className="absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 -left-6 min-w-[250px] z-50 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                                <li className="border-b py-2"><a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold block">Listar Alojamentos</a></li>
                            </ul>
                        </li>
                        <li className="group max-lg:border-b max-lg:py-3 relative">
                            <a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold lg:hover:fill-[#007bff] block">Suínos<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24"><path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" data-name="16" data-original="#000000" /></svg></a>
                            <ul className="absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 -left-6 min-w-[250px] z-50 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                                <li className="border-b py-2"><a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold block">Listar Suínos</a></li>
                            </ul>
                        </li>
                        <li className="group max-lg:border-b max-lg:py-3 relative">
                            <a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold lg:hover:fill-[#007bff] block">Raças<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24"><path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" data-name="16" data-original="#000000" /></svg></a>
                            <ul className="absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 -left-6 min-w-[250px] z-50 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                                <li className="border-b py-2"><a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold block">Listar Raças</a></li>
                            </ul>
                        </li>
                        <li className="group max-lg:border-b max-lg:py-3 relative">
                            <a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold lg:hover:fill-[#007bff] block">Saúde<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24"><path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" data-name="16" data-original="#000000" /></svg></a>
                            <ul className="absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 -left-6 min-w-[250px] z-50 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                                <li className="border-b py-2"><a href="/" className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold block">Listar Saúde</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center space-x-8 max-lg:ml-auto">
                    <div className='flex items-center max-sm:ml-auto space-x-6'>
                        <button id="toggleOpen" className="lg:hidden ml-7">
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Dropdown />
        </header>
    );
};

export default Header;
