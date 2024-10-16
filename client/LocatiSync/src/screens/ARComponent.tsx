import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ARComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ARComponent;