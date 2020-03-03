import React, { useEffect, useState } from 'react';
import { StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar
} from 'react-native';
import VerticalSlider from 'rn-vertical-slider'

import axios from 'axios'

const URL = 'http://192.168.15.10/api'

async function getURLParams(r, g, b) {
  const queryURL = `${URL}?red=${r}&green=${g}&blue=${b}`

  return await axios.get(queryURL)
}

function transformToRGB(r, g, b) {
  let red = 255*r/1023
  let green = 255*g/1023
  let blue = 255*b/1023

  return `rgb(${red}, ${green}, ${blue})`
}

const [widthSlider, heightSlider] = [40, 300]
const maxColorSlider = '#EEE9E9'

export default function App() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [connection, setConnection] = useState('Disconnected')

  useEffect(() => {
    try {
      const response = getURLParams(red, green, blue)
      if(response.status == 200) {
        setConnection('Connected')
      }
    } catch (error) {
      setConnection('Disconnected')
    }
  }, [red, green, blue])

  changeColorCircle = () => {
    return {
      marginTop: '10%',
      width: 100,
      height: 100,
      borderRadius: 100/2,
      backgroundColor: transformToRGB(red, green, blue)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.viewText}>
        <Text style={styles.textData}>{ connection }</Text>
        <View style={changeColorCircle()} />
      </View>
      <View style={styles.viewSlider}>
        <VerticalSlider
          value={0}
          disabled={false}
          min={0}
          max={1023}
          onChange={(red) => setRed(red)}
          width={widthSlider}
          height={heightSlider}
          step={20}
          borderRadius={10}
          minimumTrackTintColor={"#FF6A6A"}
          maximumTrackTintColor={maxColorSlider}
        />
        <VerticalSlider
          value={0}
          disabled={false}
          min={0}
          max={1023}
          onChange={(green) => setGreen(green)}
          width={widthSlider}
          height={heightSlider}
          step={20}
          borderRadius={10}
          minimumTrackTintColor={"#00FF7F"}
          maximumTrackTintColor={maxColorSlider}
        />
        <VerticalSlider
          value={0}
          disabled={false}
          min={0}
          max={1023}
          onChange={(blue) => setBlue(blue)}
          width={widthSlider}
          height={heightSlider}
          step={20}
          borderRadius={10}
          minimumTrackTintColor={"#00BFFF"}
          maximumTrackTintColor={maxColorSlider}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewText: {
    marginTop: '10%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewSlider: {
    flex: 3,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  textData: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Roboto'
  },
});
