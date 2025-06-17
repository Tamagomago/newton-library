import { Link } from '@tanstack/react-router';
import FullLogo from '@/assets/FullLogo.png';
import {
  HomeIcon,
  Square3Stack3DIcon,
  FireIcon,
} from '@heroicons/react/24/solid';
import { Github } from 'lucide-react';

function Footer() {
  const navItems = [
    { text: 'Home', link: '/', icon: HomeIcon },
    { text: 'Collections', link: '/collections', icon: Square3Stack3DIcon },
    { text: 'Popular', link: '/popular', icon: FireIcon },
  ];

  return (
    <footer className="bg-blue-dark/90 border-t border-blue-200/10 backdrop-blur-3xl">
      <div className="mx-auto max-w-7xl px-10 py-12 md:px-20 lg:px-50">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <Link to={'/'}>
              <img
                src={FullLogo}
                alt={'Newton Full Logo'}
                className={'mb-3 h-12 w-auto cursor-pointer'}
              />
            </Link>
            <p className="text-sm leading-relaxed text-blue-200/70">
              Discover a world of knowledge at your fingertips. Access thousands
              of books, articles, and educational resources designed to enhance
              your learning journey.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {navItems.map(({ text, link, icon: Icon }) => (
                <li key={text}>
                  <Link
                    to={link}
                    className="flex items-center gap-2 text-blue-200/70 transition-colors duration-300 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Source Code</h3>
            <a
              href="https://github.com/your-username/newton"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-200/70 transition-colors duration-300 hover:text-white"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-blue-200/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-blue-200/60">
              © {new Date().getFullYear()} Newton. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
