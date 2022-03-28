import {gql} from "@apollo/client";
import {post_fragment} from "./query";

export const LOGIN = gql`
  mutation gql($data : UserInput!){
    login(data : $data){
      access_token
    }
  }
`

export const UPSERT_TAG = gql`
  mutation gql($data : TagInput!){
    upsertTag(data:$data){
      tag
      id
      hashId
      post{
        hashId     
        title
        desc
        content
        thumbnail
        createdAt
        updatedAt
        open
      }    
    }
  }
`

export const UPSERT_POST = gql`
  ${post_fragment}
  mutation gql($data : PostInput!, $file : Upload){
    upsertPost(data : $data, file : $file){
      ...postBody
    }
  }
`;

export const DELETE_POST = gql`
  mutation gql($data : HashIdInput!){
    deletePost(data : $data)
  }
`

export const REPLY_MESSAGE = gql`
  mutation gql($data : MessageReplyInput!){
    replyMessage(data : $data)
  }
`