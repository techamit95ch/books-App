import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const CustomRating = ({ totalStars, getRating, fixRating }) => {
  const [getStarNumber, setStarNumber] = useState(0);
  let arr = [];
  for (let i = 0; i < totalStars; i++) {
    arr.push(i);
  }
  useEffect(() => {
    if (fixRating !== 0) {
      setStarNumber(fixRating);
    }
  }, []);

  return (
    <SafeAreaView>
      <View>
        {arr.map((item) => (
          <TouchableOpacity>
            {getStarNumber < totalStars ? <></> : <></>}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CustomRating;

const styles = StyleSheet.create({});
