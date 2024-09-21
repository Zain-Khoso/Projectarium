// Actions.
import authenticationRequired from '@/actions/authenticationRequired';
import getCurrentUser from '@/actions/getCurrentUser';
import getUserBookmarks from '@/actions/getUserBookmarks';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ProjectCard from '@/components/ProjectCard';

// Types.
import { Metadata } from 'next';

// Metadata.
export const metadata: Metadata = {};

export default async function BookmarksPage() {
  await authenticationRequired();

  const currentUser = await getCurrentUser();
  const bookmarks = await getUserBookmarks(currentUser?.bookmarkIds);

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container>
        <main className="flex flex-col gap-8 pt-28 pb-8">
          <Heading title="Your Bookmarks" />

          <section className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8">
            {bookmarks?.map((bookmark) => (
              <ProjectCard
                key={bookmark.id}
                owner={bookmark.owner}
                currentUser={currentUser}
                project={bookmark}
              />
            ))}
          </section>
        </main>
      </Container>
    </>
  );
}
