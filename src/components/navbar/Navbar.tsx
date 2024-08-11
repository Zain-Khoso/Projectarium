// Components
import Container from '../Container';
import Branding from './Branding';
import Search from './Search';
import UserMenu from './UserMenu';

// Component.
export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            {/* Application Logo and Name */}
            <Branding />

            {/* Search & Filtering options */}
            <Search />

            {/* User Option Dropdown */}
            <UserMenu />
          </div>
        </Container>
      </div>
    </nav>
  );
}
