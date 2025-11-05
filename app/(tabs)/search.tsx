import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import React from 'react'
import { ActivityIndicator, FlatList, Image, View } from 'react-native'

const Search = () => {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({ query: "" }))

  return (
    <View className='flex-1 bg-primary' >
      <Image source={images.bg} className="absolute w-full z-0" resizeMode='cover' />
      {/* <SearchBar placeholder='Search for a movie or tv show' /> */}
      <FlatList
        className=" px-5"
        data={movies?.results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          marginBottom: 10,
          gap: 20,
          paddingRight: 5,
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        // scrollEnabled={false}
        ListHeaderComponent={() => (
          <>
            <View className='w-full flex-row items-center justify-center mt-10'>
              <Image source={icons.logo} className='w-12 h-10 '></Image>

              {/* <SearchBar placeholder='Search for a movie or tv show' /> */}
            </View>
            <View className='my-5'>
              <SearchBar placeholder='Search for a movie or tv show' />
            </View>

            {
              moviesLoading && <ActivityIndicator size='large' color="#0000ff" className="my-3" />
            }

            {
              
            }

          </>
        )}
      />
    </View>
  )
}

export default Search
