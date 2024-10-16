import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapComponent from './MapComponent';  // 地図コンポーネント
import ARComponent from './ARComponent';    // ARコンポーネント
import auth from '@react-native-firebase/auth';

const MainScreen = () => {
  const [isARView, setIsARView] = useState(false);  // 地図かARかを制御
  // ビューを切り替える関数
  const toggleView = () => {
    setIsARView(!isARView);
  };

  return (
    <View style={styles.container}>
      {/* 地図ビュー or ARビューを表示 */}
      {isARView ? <ARComponent /> : <MapComponent />}

      {/* ボタンで地図とARを切り替える */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={toggleView}
        >
          <Text style={styles.switchText}>
            {isARView ? '地図に切り替え' : 'ARに切り替え'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  switchText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;