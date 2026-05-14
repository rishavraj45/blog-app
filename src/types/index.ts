export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
};

export type PostsListResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export type Comment = {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};
