export type ProjectT = {
  title: string;
  images: string[];
  status: string;
  url: string;
  repository: string;
  description: string;
  tags: string[];
  lifecycleStatus: string;
  createdAt: string;
  creator: {
    name: string;
    picture: string;
    uid: string;
  };
};
