export type Monster = {
  id: number;
  name: string;
  eyes: number;
  color: string;
  img: string;
};
export type PostComment = {
  id: number;
  text: string;
  authorId: number;
};
export type Post = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  comments: PostComment[];
  likes: number;
};
