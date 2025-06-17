import { Link } from '@tanstack/react-router';
import FullLogo from '@/assets/FullLogo.png';
import {
  HomeIcon,
  Square3Stack3DIcon,
  FireIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';

function Navbar() {
  const navItems = [
    { text: 'Home', link: '/', icon: HomeIcon },
    { text: 'Collections', link: '/collections', icon: Square3Stack3DIcon },
    { text: 'Popular', link: '/popular', icon: FireIcon },
  ];

  const [isHamburgerVisible, setHamburgerVisible] = useState(false);

  return (
    <header className="bg-blue-dark/20 fixed z-9 mx-auto flex h-16 w-screen items-center justify-between px-10 py-2 backdrop-blur-3xl md:px-20 lg:px-50">
      <Link to={'/'}>
        <img
          src={FullLogo}
          alt={'Newton Full Logo'}
          className={'h-10 w-auto cursor-pointer'}
        />
      </Link>
      <Button
        variant={'ghost'}
        className="cursor-pointer hover:bg-transparent sm:hidden"
        onClick={() => {
          setHamburgerVisible(!isHamburgerVisible);
        }}
      >
        <span className="relative flex h-8 w-8 items-center justify-center">
          <Bars3Icon
            className={`absolute h-8 w-8 text-white transition-transform duration-300 ${
              isHamburgerVisible ? 'scale-0 rotate-45' : 'scale-100 rotate-0'
            }`}
          />
          <XMarkIcon
            className={`absolute h-8 w-8 text-white transition-transform duration-300 ${
              isHamburgerVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-45'
            }`}
          />
        </span>
      </Button>
      <nav
        className={`${
          isHamburgerVisible ? 'flex' : 'hidden'
        } bg-blue-dark absolute top-16 left-0 w-full flex-col px-10 py-4 sm:static sm:flex sm:w-auto sm:flex-row sm:items-center sm:bg-transparent sm:p-0 sm:backdrop-blur-none`}
      >
        {navItems.map(({ text, link, icon: Icon }) => (
          <Link
            key={text}
            to={link}
            className="nav-item flex cursor-pointer items-center gap-2 bg-none py-2 text-white transition-colors duration-500 sm:px-4 sm:py-0"
            onClick={() => {
              setHamburgerVisible(!isHamburgerVisible);
            }}
          >
            <Icon className="h-4 w-4" />
            {text}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
