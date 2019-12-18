import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteMovie } from '../../businessLogic/movies'
import { getUserIdFromEvent } from '../../auth/utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const movieId = event.pathParameters.movieId

  // TODO: Remove a TODO item by id
  console.log(movieId)

  if(!movieId) {
    return {
      statusCode: 404,
      body: ''
    }
  }
  
  const userId = getUserIdFromEvent(event)
  await deleteMovie(movieId, userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control;Allow-Credentials': true
    },
    body: ''
  }
}
