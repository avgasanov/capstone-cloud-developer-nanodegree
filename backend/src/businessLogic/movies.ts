import * as uuid from 'uuid'

import { MovieItem } from '../models/MovieItem'
import { MoviesAccess } from '../dataLayer/moviesAccess'
import { CreateMovieRequest } from '../requests/CreateMovieRequest'
import { UpdateMovieRequest } from '../requests/UpdateMovieRequest'


const moviesAccess = new MoviesAccess()

export async function getAllMovies(userId: String): Promise<MovieItem[]> {
    return moviesAccess.getAllMovies(userId)
}

export async function createMovie(userId: string, request: CreateMovieRequest): Promise<MovieItem> {
    let movieItem: MovieItem = {} as MovieItem
    movieItem.createdAt = new Date().toISOString()
    movieItem.done = false
    movieItem.movieId = uuid.v4()
    movieItem.userId = userId
    movieItem.dueDate = request.dueDate
    movieItem.name = request.name
    movieItem.attachmentUrl = `https://${process.env.IMAGES_S3_BUCKET}.s3.amazonaws.com/${movieItem.movieId}`
    return await moviesAccess.createMovie(movieItem)
}

export async function deleteMovie(movieId: string, userId: string) {
    return await moviesAccess.deleteMovie(movieId, userId)
}

export async function updateMovie(movieId: string, userId: string, req: UpdateMovieRequest) {
    console.log(`Updating movie item: ${movieId}`)

    const { name, dueDate, done } = req

    return await moviesAccess.updateMovie(movieId, userId, name, dueDate, done)
}