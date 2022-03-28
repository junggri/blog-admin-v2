import {gql} from "@apollo/client";

export const tag_fragment = `
    fragment tagBody on Tag{
        hashId
        id
        createdAt
        updatedAt
        tag
    }
`;

export const like_fragment = `
   fragment likeBody on Likes{
        hashId
        createdAt
        updatedAt
   }
`;

export const reply_fragment = `
   fragment replyBody on Reply{
      id
      createdAt
      bgroup
      sorts
      depth
      comment
      writer
      hashId
      postId
      parentId
   }
`;

export const hit_fragment = `
   fragment hitBody on Hit{
      createdAt
      updatedAt
      hashId
   }
`;

export const post_fragment = `
   ${hit_fragment}
   ${reply_fragment}
   ${tag_fragment}
   ${like_fragment}
   fragment postBody on Post {
      hashId     
      title
      desc
      content
      isPublished
      thumbnail
      createdAt
      updatedAt
      open
      hit {
         ...hitBody
      }
      reply{
         ...replyBody
      }
      tag{
        ...tagBody
      }
      likes{
         ...likeBody
      }
   }
`;


export const VALIDATE = gql`
   query gql{
      validate
   }
`;

export const GET_POST = gql`
   ${post_fragment}
   query gql($data : HashIdInput!) {
      post(data : $data){
         ...postBody
      } 
   }   
`;

export const GET_POSTS = gql`
   ${post_fragment}
   query gql($data : PaginationInput!) {
      posts(data : $data){
         leftCount
         edges{
            cursor
            node{
               ...postBody
            }
         }
         pageInfo{
            endCursor
            hasNextPage
         }
      } 
   }   
`;

export const GET_TAG_RELATION = gql`
   query gql{
      getTags{
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
`;

export const GET_MESSAGE = gql`
   query gql{
      getMessage{
         name
         email
         phoneNumber
         content
         hashId
         id
         createdAt
         updatedAt
      }
   }
`;

export const GET_VISIT = gql`
   query gql($data : DashBoardInput!){
      getVisitDashboard(data : $data){
        hashId
        id
        createdAt
        updatedAt
        country
        city
        regionName
        regionAddress
        count
      }
   }
`
