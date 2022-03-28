export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Auth = {
  __typename?: 'Auth';
  access_token: Scalars['String'];
};

export type DashBoardInput = {
  frequency: DashBoardFrequency;
};

export type Google = {
  __typename?: 'Google';
  createdAt: Scalars['DateTime'];
  hashId: Scalars['ID'];
  id: Scalars['Int'];
  rows: Scalars['Float'];
  totalsForAllResults: Result;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type HashIdInput = {
  hashId: Scalars['String'];
};

export type HashIds = {
  __typename?: 'HashIds';
  hashIds: Array<Scalars['String']>;
};

export type Hit = {
  __typename?: 'Hit';
  createdAt: Scalars['DateTime'];
  hashId: Scalars['ID'];
  id: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type HitInput = {
  postHashId: Scalars['String'];
};

export type LikeInput = {
  postHashId: Scalars['String'];
};

export type Likes = {
  __typename?: 'Likes';
  createdAt: Scalars['DateTime'];
  hashId: Scalars['ID'];
  id: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  hashId: Scalars['ID'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageInput = {
  content: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHit?: Maybe<Scalars['String']>;
  createLike: Likes;
  createMessage: Scalars['String'];
  createVisit: Scalars['Int'];
  deletePost: Scalars['String'];
  deleteReply: Scalars['String'];
  deleteTag: Scalars['String'];
  login: Auth;
  toPrivate: Scalars['String'];
  upsertPost: Post;
  upsertReply: Reply;
  upsertTag: Tag;
};


export type MutationCreateHitArgs = {
  data: HitInput;
};


export type MutationCreateLikeArgs = {
  data: LikeInput;
};


export type MutationCreateMessageArgs = {
  data: MessageInput;
};


export type MutationCreateVisitArgs = {
  data: VisitInput;
};


export type MutationDeletePostArgs = {
  data: HashIdInput;
};


export type MutationDeleteReplyArgs = {
  data: ReplyDeleteInput;
};


export type MutationDeleteTagArgs = {
  data: TagDeleteInput;
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationToPrivateArgs = {
  data: HashIdInput;
};


export type MutationUpsertPostArgs = {
  data: PostInput;
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationUpsertReplyArgs = {
  data: ReplyCreateInput;
};


export type MutationUpsertTagArgs = {
  data: TagInput;
};

export type PageEdge = {
  __typename?: 'PageEdge';
  cursor: Scalars['Float'];
  node: Post;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Float']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  edges: Array<PageEdge>;
  leftCount?: Maybe<Scalars['Float']>;
  pageInfo?: Maybe<PageInfo>;
};

export type PaginationInput = {
  after?: InputMaybe<Scalars['Float']>;
  filter?: InputMaybe<Scalars['String']>;
  first: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  desc: Scalars['String'];
  hashId: Scalars['ID'];
  hit?: Maybe<Array<Hit>>;
  id: Scalars['Int'];
  isPublished: Scalars['Boolean'];
  likes?: Maybe<Array<Likes>>;
  open: Scalars['Boolean'];
  originalContent?: Maybe<Scalars['String']>;
  reply?: Maybe<Array<Reply>>;
  tag: Array<Tag>;
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostInput = {
  content: Scalars['String'];
  desc: Scalars['String'];
  hashId?: InputMaybe<Scalars['ID']>;
  is_published: Scalars['Boolean'];
  open?: InputMaybe<Scalars['Boolean']>;
  originalContent: Scalars['String'];
  tagIds: Array<Scalars['Int']>;
  thumbnail?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getDashBoard?: Maybe<Array<Hit>>;
  getHashIdsToBuild: HashIds;
  getMessage: Array<Message>;
  getReply: Array<Reply>;
  getS3Image: Scalars['String'];
  getTags: Array<Tag>;
  getVideos: Youtube;
  getVisitDashboard?: Maybe<Array<Visit>>;
  getVisitor: Google;
  post: Post;
  posts?: Maybe<PaginatedPost>;
  validate: Scalars['String'];
};


export type QueryGetDashBoardArgs = {
  data: HashIdInput;
};


export type QueryGetReplyArgs = {
  data: ReplyInput;
};


export type QueryGetS3ImageArgs = {
  data: S3Input;
};


export type QueryGetVideosArgs = {
  data: YoutubeInput;
};


export type QueryGetVisitDashboardArgs = {
  data: DashBoardInput;
};


export type QueryPostArgs = {
  data: HashIdInput;
};


export type QueryPostsArgs = {
  data: PaginationInput;
};

export type Reply = {
  __typename?: 'Reply';
  bgroup: Scalars['Float'];
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  depth: Scalars['Float'];
  hashId: Scalars['ID'];
  id: Scalars['Float'];
  parentId?: Maybe<Scalars['Float']>;
  postId?: Maybe<Scalars['Float']>;
  sorts: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  writer: Scalars['String'];
};

export type ReplyCreateInput = {
  comment: Scalars['String'];
  /** postHashId */
  hashId: Scalars['String'];
  parentId?: InputMaybe<Scalars['Float']>;
  postTitle: Scalars['String'];
  /** replyHashId */
  replyHashId?: InputMaybe<Scalars['String']>;
  writer: Scalars['String'];
};

export type ReplyDeleteInput = {
  hashId: Scalars['String'];
  replyIds: Array<Scalars['Int']>;
};

export type ReplyInput = {
  hashId: Scalars['String'];
};

export type Result = {
  __typename?: 'Result';
  session: Scalars['String'];
  user: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  hashId: Scalars['ID'];
  id: Scalars['Int'];
  post: Array<Post>;
  tag: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TagDeleteInput = {
  hashId: Scalars['String'];
};

export type TagInput = {
  hashId?: InputMaybe<Scalars['String']>;
  tagName: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Visit = {
  __typename?: 'Visit';
  city: Scalars['String'];
  count: Scalars['Float'];
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  hashId: Scalars['ID'];
  id: Scalars['Int'];
  regionAddress: Scalars['String'];
  regionName: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VisitInput = {
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export type Youtube = {
  __typename?: 'Youtube';
  data: Scalars['String'];
  nextPageToken?: Maybe<Scalars['String']>;
};

export type YoutubeInput = {
  nextPageToken?: InputMaybe<Scalars['String']>;
};

export enum DashBoardFrequency {
  FifteenDay = 'FIFTEEN_DAY',
  OneDay = 'ONE_DAY',
  OneMonth = 'ONE_MONTH',
  SevenDay = 'SEVEN_DAY',
  SixMonth = 'SIX_MONTH',
  ThreeMonth = 'THREE_MONTH'
}

export type S3Input = {
  data: Scalars['String'];
  path: Scalars['String'];
};
