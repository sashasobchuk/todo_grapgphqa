import {gql} from "@apollo/client";


export const CREATE_SHAPE = gql`
mutation {
  createShape (
    createShapeInput:{
      height:200,
      type:"squere",
      width:100,
      y:10,
      x:39,
      z:1
    }
  ){
    id,
  }
}
`


