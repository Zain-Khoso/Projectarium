// Components
import Container from '../Container';
import Branding from './Branding';
import UserMenu from './UserMenu';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser?: User | null;
};

// Component.
export default function Navbar({ currentUser }: Props) {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            {/* Application Logo and Name */}
            <Branding />

            {/* User Option Dropdown */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </nav>
  );
}
