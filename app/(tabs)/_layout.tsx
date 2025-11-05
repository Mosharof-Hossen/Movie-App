import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title }: { focused: boolean, icon: any, title: string }) => {
    if (focused) {
        return <ImageBackground
            source={images.highlight}
            className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 justify-center mt-4 items-center rounded-full overflow-hidden'
        >
            <Image source={icon} className='size-5' tintColor="#151312" />
            <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
        </ImageBackground>
    }
    return (
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={icon} className='size-5' tintColor="#A8B5DB" />
        </View>
    )
}


const _Layout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle:{
                backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: "hidden",
                borderWidth: 1,
                borderColor: '0f0d23'
            }
        }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" ></TabIcon>
                    )
                }}
            />
            <Tabs.Screen name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused }) => {
                        return <TabIcon focused={focused} icon={icons.search} title="Search" ></TabIcon>
                    }
                }}
            />
            <Tabs.Screen name="saved" options={{
                title: 'Saved',
                tabBarIcon: ({ focused }) => {
                    return <TabIcon focused={focused} icon={icons.save} title="Saved" ></TabIcon>
                }
            }} />
            <Tabs.Screen name="profile" options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => {
                    return <TabIcon focused={focused} icon={icons.person} title="Profile" ></TabIcon>
                }
            }} />
        </Tabs>
    )
}

export default _Layout
