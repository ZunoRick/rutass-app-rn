import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import LoadingScreen from '../pages/LoadingScreen'
import { Fab } from './Fab'

export const Map = () => {

    const { hasLocation, initizalPosition } = useLocation()

    if (!hasLocation) return <LoadingScreen/>

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                // provider={ PROVIDER_GOOGLE }
                showsUserLocation
                initialRegion={{
                    latitude: initizalPosition.latitude,
                    longitude: initizalPosition.longitud,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* <Marker
                    image={ require('../assets/custom-marker.png') }
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Esto es un título"
                    description="Esto es una descripción"
                /> */}
            </MapView> 

            <Fab
                iconName='star-outline'
                onPress={ () => console.log('HOla fAB') }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />
        </>
    )
}
