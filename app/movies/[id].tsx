import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className='flex-col items-start justify-center mt-5'>
      <Text className='text-light-200 font-bold text-sm'>{label}</Text>
      <Text className='text-light-100 text-sm mt-2'>{value || "N/A"}</Text>
    </View>
  )
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movieDetails, error: movieDetailsError, loading: movieDetailsLoading } = useFetch(() => fetchMovieDetails({ id: id?.toString() || '' }));
  console.log("details:", movieDetails, movieDetailsError, movieDetailsLoading);
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}` }} className='w-full h-[550px] rounded-lg' resizeMode='stretch' />

        <View className='px-5 flex-col items-start justify-center mt-5'>
          <Text className='text-white text-2xl font-bold'>{movieDetails?.title}</Text>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movieDetails?.release_date.split("-")[0]}</Text>
            <Text className='text-light-200 text-sm'>{movieDetails?.runtime}m</Text>
          </View>
          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4' tintColor='#FFD700' />
            <Text className='text-white font-bold text-sm'>{Math.round(movieDetails?.vote_average ?? 0)}/10</Text>
            <Text className='text-light-200 text-sm'>({movieDetails?.vote_count} votes)</Text>
          </View>
          <MovieInfo label='Overview' value={movieDetails?.overview as string}></MovieInfo>
          <MovieInfo label='Genres' value={movieDetails?.genres.map((genre) => genre.name).join(", ") as string}></MovieInfo>

          <View className='flex flex-row justify-between w-1/2'>
            <MovieInfo label='Budget' value={ movieDetails?.budget ? `$${Math.round(movieDetails.budget/1000000)}M` : "N/A" }></MovieInfo>
            <MovieInfo label='Revenue' value={ movieDetails?.revenue ? `$${Math.round(movieDetails.revenue/1000000)}M` : "N/A" }></MovieInfo>
          </View>

          <MovieInfo label='Production Companies' value={movieDetails?.production_companies.map((c)=> c.name).join(", ") as string}></MovieInfo>


        </View>
      </ScrollView>

      <TouchableOpacity 
      className='absolute bottom-5 left-0 right-0 mx-5 bg-dark-100 p-4 rounded-full flex-row items-center justify-center'
      onPress={router.back}
      >
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff'></Image>
        <Text className='text-white text-base font-semibold'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})