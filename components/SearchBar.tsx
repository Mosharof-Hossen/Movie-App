import { icons } from '@/constants/icons';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({ onPress, placeholder }: { onPress?: () => void, placeholder: string }) => {
    console.log("onpress:" , onPress);
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={"#ab8bff"}></Image>
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value=''
                onChangeText={()=>{}}
                placeholderTextColor='#a8b5db'
                className='flex-1 ml-2 text-white'
            ></TextInput>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})