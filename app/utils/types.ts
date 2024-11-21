type Monster = {
  id: number;
  name: string;
  eyes: number;
  color: string;
};
type PostComment = {
  id: number;
  text: string;
  authorId: number;
};
type Post = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  comments: Comment[];
  likes: number;
};
