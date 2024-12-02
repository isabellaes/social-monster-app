export type Monster = {
  _id: string;
  name: string;
  eyes: number;
  color: string;
  img: string;
};
export type PostComment = {
  text: string;
  authorId: string;
};
export type Post = {
  title: string;
  text: string;
  authorId: string;
};

export type newComment = {
  postId: string;
  text: string;
  authorId: string;
};

export type PostDTO = {
  _id: string;
  title: string;
  text: string;
  authorId: Monster;
  comments: PostCommentDTO[];
  likes: number;
};

export type PostCommentDTO = {
  _id: string;
  text: string;
  authorId: Monster;
};
