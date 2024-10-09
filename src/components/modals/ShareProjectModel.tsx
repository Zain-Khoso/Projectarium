'use client';

// Lib Imports.
import { useMemo } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';

// Icons.
import { MdEmail, MdFacebook, MdWhatsapp } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';

// Components.
import Modal from './base';
import CopyText from '../CopyText';

// Types.
import { User, Project } from '@prisma/client';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  owner: User;
  project: Project;
};

// Component.
export default function ShareProjectModel({ isOpen, onClose, owner, project }: Props) {
  const url = `https://projectarium.vercel.app/${owner.username}/${project.title}`;

  const email = useMemo(
    () => ({
      subject: `Check out ${project.title} on Projectarium!`,
      body: `
      Hi there,

      I came across this interesting project called ${project.title} on Projectarium. 
      

      ${project.description}

      Let me know what you think!

      With your best regards at heart.
    `,
    }),
    [project.title, project.description]
  );

  let bodyContent = (
    <main className="space-y-12">
      <div className="w-full flex flex-row flex-wrap items-center justify-around gap-4">
        <EmailShareButton url={url} subject={email.subject} body={email.body}>
          <div className="flex flex-col items-center justify-center gap-2">
            <MdEmail size={50} />
            <span>Email</span>
          </div>
        </EmailShareButton>

        <FacebookShareButton url={url} hashtag="projectarium">
          <div className="flex flex-col items-center justify-center gap-2">
            <MdFacebook size={50} fill="#1877F2" />
            <span>Facebook</span>
          </div>
        </FacebookShareButton>

        <WhatsappShareButton url={url} title={email.subject}>
          <div className="flex flex-col items-center justify-center gap-2">
            <MdWhatsapp size={50} fill="#25D366" />
            <span>Whatsapp</span>
          </div>
        </WhatsappShareButton>

        <LinkedinShareButton
          url={url}
          title={email.subject}
          summary={email.body}
          source="Projectarium"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <FaLinkedin size={50} fill="#0077B5" />
            <span>Linkedin</span>
          </div>
        </LinkedinShareButton>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Want to share somewhere else?</h4>

        <CopyText text={url} />
      </div>
    </main>
  );

  return (
    <Modal title={`Share ${project.title}`} isOpen={isOpen} onClose={onClose} body={bodyContent} />
  );
}
