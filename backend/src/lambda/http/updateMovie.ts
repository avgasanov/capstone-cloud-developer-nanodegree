import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateMovieRequest } from '../../requests/UpdateMovieRequest'

import { updateMovie } from '../../businessLogic/movies'
import { getUserIdFromEvent } from '../../auth/utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const movieId = event.pathParameters.movieId
  const updatedMovie: UpdateMovieRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedMovie" object
  console.log(movieId, updatedMovie)
  
  const userId = getUserIdFromEvent(event)
  await updateMovie(movieId, userId, updatedMovie)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control;Allow-Credentials': true
    },
    body: ''
  }
}
