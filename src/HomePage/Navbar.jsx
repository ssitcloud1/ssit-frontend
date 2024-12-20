import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Popover, Transition, Menu } from '@headlessui/react';
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, BellIcon } from '@heroicons/react/20/solid';
import { useNavigate } from "react-router-dom";

const Me = [
    { name: 'Overview', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Planner', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'SubmittedTimesheets', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'ReceivedTimesheets', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'SubmittedLeaves', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'ReceivedLeaves', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Personal', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Documents', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'AssignedTasks', description: 'Task assigned by you', href: '#', icon: ArrowPathIcon },
    { name: 'Employment', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Contacts', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
    { name: 'RecievedBadges', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'MyTasks', description: 'Tasks assigned to you', href: '#', icon: ArrowPathIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the user role from localStorage
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        // localStorage.clear(); // Clear localStorage
         // Reload the entire application
        navigate('/login');
        window.location.reload();
    };

    return (
        <header className="bg-white">
            <nav className="flex items-center justify-between p-6 lg:px-8 flex-shrink-0" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/dashboard" className="-m-1.5 p-1.5">
                        <span className="sr-only">Middleware</span>
                        <img className="h-8 w-auto" alt="Middleware" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Link to="/dashboard" className="text-2xl font-semibold leading-6 text-gray-900">
                        Dashboard
                    </Link>
                    <Popover className="relative">
                        <Popover.Button className="text-2xl flex items-center gap-x-1 font-semibold leading-6 text-gray-900">
                            Me
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                                            <div className="p-4">
                                                                {Me.map((item) => (
                                                                    <Link to={`${item.name}`}>
                                                                    <div
                                                                        key={item.name}
                                                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-xl leading-6 hover:bg-gray-50"
                                                                    >
                                                                        <div
                                                                            className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                                            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                                                       aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="flex-auto">
                                                                            <a href={item.href} className="block font-semibold text-gray-900">
                                                                                {item.name}
                                                                                <span className="absolute inset-0"/>
                                                                            </a>
                                                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                                                        </div>
                                                                    </div>
                                                                    </Link>
                                                                ))}
                                                            </div>

                                                        </Popover.Panel>
                        </Transition>
                    </Popover>

                    {/* Conditional rendering based on role */}
                    {(role === 'admin' || role==='Admin') && (
                        <>
                            <Link to="/employee" className="text-2xl font-semibold leading-6 text-gray-900">
                                Employees
                            </Link>
                            <Link to="/documents" className="text-2xl font-semibold leading-6 text-gray-900">
                                Documents
                            </Link>
                            <Link to="/thanks" className="text-2xl font-semibold leading-6 text-gray-900">
                                Thanks
                            </Link>
                            <Link to="/authorizations" className="text-2xl font-semibold leading-6 text-gray-900">
                                Authorizations
                            </Link>
                        </>
                    )}
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
                    <button
                        type="button"
                        className="relative rounded-full bg-white-800 p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-8 w-8" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-2xl text-gray-500')}
                                        >
                                            Your Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-2xl text-gray-500')}
                                        >
                                            Settings
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            onClick={handleSignOut}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-2xl text-gray-500')}
                                        >
                                            Sign out
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </nav>

            {/* Mobile menu */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/dashboard" className="-m-1.5 p-1.5">
                            <span className="sr-only">Middleware</span>
                            <img className="h-8 w-auto" alt="Middleware" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    to="/dashboard"
                                    className="-mx-3 block rounded-lg py-2 px-3 text-2xl font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/employee"
                                    className="-mx-3 block rounded-lg py-2 px-3 text-2xl font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                >
                                    Employees
                                </Link>
                                <Link
                                    to="/documents"
                                    className="-mx-3 block rounded-lg py-2 px-3 text-2xl font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                >
                                    Documents
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link
                                    to="#"
                                    className="-mx-3 block rounded-lg py-2.5 px-3 text-2xl font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}