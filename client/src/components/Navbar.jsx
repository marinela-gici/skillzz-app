import { React, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkMode from "./DarkMode";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Post a Job", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

const Navbar = (props) => {
  const { company, darkMode, toggleDarkMode } = props;
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="relative z-10">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-emerald-400 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-400">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="md:flex hidden flex-shrink-0 items-center">
                  <Link to='/'
                    className="dark:text-rose-400 text-emerald-400 text-3xl"
                  >
                    skillzz
                    <span className="text-5xl leading-4 dark:text-emerald-400 text-rose-400">
                      .
                    </span>
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="dark:text-white text-black dark:hover:bg-rose-400 dark:hover:text-white hover:bg-emerald-500 hover:text-white rounded-md px-3 py-2 text-lg font-large"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <Menu as="div" className="relative ml-3 flex items-center">
                  {company && <Button value="Go to dashboard" onClick={() => navigate('/dashboard')} />}
                  {!company && <Button value="Post a Job" onClick={() => navigate('/register')} />}

                  <Button value="Find a Job" background="pink" onClick={() => navigate('/jobs')} />
                  <DarkMode
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                </Menu>
              </div>
            </div>
          </div>
          <Transition
             enter= 'transition ease-out duration-400'
             enterFrom= 'opacity-0 translate-y-1'
             enterTo= 'opacity-100 translate-y-0'
             leaveFrom= 'opacity-100 translate-y-0'
             leaveTo= 'opacity-100 translate-y-1'
          >
            <Disclosure.Panel className="md:hidden relative">
              <div className="space-y-1 px-2 pb-3 pt-2 absolute left-0 top-0 w-full bg-main dark:bg-gray-800">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block dark:text-white text-black hover:bg-rose-400 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
