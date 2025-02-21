import { create } from 'zustand';
import { MovieState } from '../types';

const MOVIES = [
  {
    id: '1',
    name: 'Maharshi',
    year: 2019,
    image: 'https://daex9l847wg3n.cloudfront.net/shemoutputimages/Maharshi/62bc7df8dde7159b43000070/large_16_9_1678345784.webp'
  },
  {
    id: '2',
    name: 'Lucky Bhaskar',
    year: 2022,
    image: 'https://i.gadgets360cdn.com/large/Lucky_Baskhar_1730981049201.jpg',
  },
  {
    id: '3',
    name: 'Goodachari',
    year: 2018,
    image: 'https://wallpapercave.com/wp/wp8714584.jpg'
  },
  {
    id: '4',
    name: 'Major',
    year: 2021,
    image: 'https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-91472083/91472083.jpg'
  },
  {
    id: '5',
    name: 'Avengers: Endgame',
    year: 2019,
    image: 'https://i.pinimg.com/736x/d5/86/19/d58619d1fe5a4ca71c57cb1afde76a0a.jpg'
  },
  {
    id: '6',
    name: 'Hit: The Second Case',
    year: 2020,
    image: 'https://m.media-amazon.com/images/S/pv-target-images/0fbd6a006c6ba7fd3d6067c6d9a1e6d5da1dd4831c3ebde18dcb9ccaa2988c14.jpg'
  }
];

export const useMovieStore = create<MovieState>((set) => ({
  movies: MOVIES,
  selectedMovie: null,
  setSelectedMovie: (movie) => set({ selectedMovie: movie })
}));