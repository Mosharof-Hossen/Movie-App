import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')


  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false)


  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies()
        if (movies?.results.length > 0 && movies?.results[0]) {
          await updateSearchCount(searchQuery, movies?.results[0] as Movie)
        }
      } else {
        reset()
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])


  useEffect(() => {
    const func = async () => {
      if (movies?.results.length > 0 && movies?.results[0]) {
        await updateSearchCount(searchQuery, movies?.results[0] as Movie)
      }else{
        reset()
      }
    }
    func().catch(console.error)
  }, [movies?.results])

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const listHeaderComponent = useMemo(() => (
    <>
      <View className='w-full flex-row items-center justify-center mt-10'>
        <Image source={icons.logo} className='w-12 h-10 '></Image>
      </View>
      <View className='my-5'>
        <SearchBar
          placeholder='Search for a movie or tv show'
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {
        moviesLoading && <ActivityIndicator size='large' color="#0000ff" className="my-3" />
      }
      {
        !moviesLoading && !moviesError && searchQuery.trim() && movies?.results.length > 0
        && <Text className='text-xl text-white font-bold mb-3'
        >
          Search results for{" "}
          <Text className='text-accent'>{searchQuery}</Text>
        </Text>
      }

    </>
  ), [searchQuery, moviesLoading, moviesError, movies?.results.length])

  return (
    <View className='flex-1 bg-primary' >
      <Image source={images.bg} className="absolute w-full z-0" resizeMode='cover' />
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
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? "No Movies Found" : "Search For a Movie"}
              </Text>
            </View>
          ) : (null)
        }
      />
    </View>
  )
}

export default Search
