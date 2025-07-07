import {BASE_URL} from './api';

export const TRENDING = `${BASE_URL}/trending/movie/day`;
export const POPULAR = `${BASE_URL}/movie/popular`;
export const DISCOVER = `${BASE_URL}/discover/movie`;
export const DETAIL = id => `${BASE_URL}/movie/${id}`;
export const GENRE_LIST = `${BASE_URL}/genre/movie/list`;
export const SEARCH = `${BASE_URL}/search/movie`;
