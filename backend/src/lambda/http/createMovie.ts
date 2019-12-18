import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateMovieRequest } from '../../requests/CreateMovieRequest'
import { createMovie } from '../../businessLogic/movies'
import { getUserIdFromEvent } from '../../auth/utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newMovie: CreateMovieRequest = JSON.parse(event.body)

  // TODO: Implement creating a new TODO item
  console.log(`processing creation of new movie item: ${newMovie}`)

  const userId = getUserIdFromEvent(event)
  const item = await createMovie(userId, newMovie)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control;Allow-Credentials': true
    },
    body: JSON.stringify({
      item
    })
  }
}
