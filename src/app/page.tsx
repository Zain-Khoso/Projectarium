// Components.
import Navbar from '@/components/navbar/Navbar';
import UnderDevelopmentPage from '@/components/UnderDevelopmentPage';

// Component.
export default function Home() {
  return (
    <>
      <Navbar />
      <UnderDevelopmentPage title="Projectarium is currently under development." />
    </>
  );
}
