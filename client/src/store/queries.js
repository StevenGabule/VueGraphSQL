import {gql} from 'apollo-boost';

/* POST QUERIES*/
export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            title
            imageUrl
        }
    }
`;

/* USER QUERIES */

/* USER MUTATIONS */
/* POST MUTATIONS */

