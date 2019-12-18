import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { MovieItem } from '../models/MovieItem'

export class MoviesAccess {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly moviesTable = process.env.MOVIES_TABLE,
        private readonly indexName = process.env.INDEX_NAME
    ) {

    }

    async getAllMovies(userId: String): Promise<MovieItem[]> {
        console.log(`Getting all movies for user: ${userId}`)

        const result = await this.docClient.query({
            TableName: this.moviesTable,
            IndexName: this.indexName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        const items = result.Items
        return items as MovieItem[]
    }

    async createMovie(movieItem: MovieItem): Promise<MovieItem> {
        console.log(`Creating movie item: ${movieItem}`)

        await this.docClient.put({
            TableName: this.moviesTable,
            Item: movieItem
        }).promise()

        console.log(`inserted to database: ${movieItem.movieId}`)
        return movieItem
    }

    async deleteMovie(movieId: string, userId: String) {
        console.log(`Delete movie item: ${movieId}`)

        await this.docClient
                    .delete({
                        TableName: this.moviesTable,
                        Key: {
                        userId,
                        movieId
                        }
                    }).promise()

    }

    async updateMovie(movieId: string, userId: string, name: string, dueDate: string, done: boolean) {
        console.log(`Updating movie item: ${movieId}`)


        await this.docClient
                    .update({
                        TableName: this.moviesTable,
                        Key: {
                            userId,
                            movieId
                        },
                        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
                        ExpressionAttributeValues: {
                            ':name': name,
                            ':dueDate': dueDate,
                            ':done': done
                        },
                        ExpressionAttributeNames: {
                            '#name': 'name' // workaround for reserved word
                          }
                    }).promise()
    }
}