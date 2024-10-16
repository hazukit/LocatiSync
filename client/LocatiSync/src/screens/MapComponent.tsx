import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = () => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 35.681236,
        longitude: 139.767125,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ latitude: 35.681236, longitude: 139.767125 }}
        title={"Your Location"}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;