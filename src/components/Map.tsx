import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import LoadingScreen from '../pages/LoadingScreen'
import { Fab } from './Fab'

export const Map = () => {

    const [showPolyline, setShowPolyline] = useState(true)

    const { 
        hasLocation,
        initizalPosition,
        userLocation,
        routeLines,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation
    } = useLocation()

    const mapViewRef = useRef<MapView>()
    const following = useRef<boolean>(true)

    useEffect(() => {
        followUserLocation()
        return () => {
            // cancelar el seguimiento
            stopFollowUserLocation()
        }
    }, [])
    
    useEffect(() => {
        if (!following.current) return

        const { latitude, longitude } = userLocation
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        })
    }, [userLocation])

    const centerPosition = async() =>{
        const { latitude, longitude } = await getCurrentLocation()

        following.current = true

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        })
    }

    if (!hasLocation) return <LoadingScreen/>

    return (
        <>
            <MapView
                ref={ (el) => mapViewRef.current = el! }
                style={{ flex: 1 }}
                // provider={ PROVIDER_GOOGLE }
                showsUserLocation
                initialRegion={{
                    latitude: initizalPosition.latitude,
                    longitude: initizalPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={ () => following.current = false }
            >
                {   !!showPolyline && (
                        <Polyline
                            coordinates={routeLines}
                            strokeColor='black'
                            strokeWidth={ 3 }
                        />
                    )
                }

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
                iconName='compass-outline'
                onPress={ centerPosition }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />

            <Fab
                iconName='brush-outline'
                onPress={ () => setShowPolyline( value => !value) }
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }}
            />
        </>
    )
}
