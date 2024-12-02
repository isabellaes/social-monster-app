export type Monster = {
  _id: string;
  name: string;
  eyes: number;
  color: string;
  img: string;
};
export type PostComment = {
  _id: string;
  text: string;
  authorId: string;
};
export type Post = {
  _id: string;
  title: string;
  text: string;
  authorId: string;
  comments: PostComment[];
  likes: number;
};
