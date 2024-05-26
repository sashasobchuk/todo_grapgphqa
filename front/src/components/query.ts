// import {gql} from "@apollo/client";

import {gql} from "@apollo/client";

export const GET_ALL_SHAPES = gql`
    query {
        getShapes {
            id,createdAt,height,width,x,y,z
        }
    }
`
