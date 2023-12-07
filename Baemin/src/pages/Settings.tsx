import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useState} from 'react';

function Setting() {
  const [count, setCount] = useState(1);
  return (
    <View>
      <Text>설정</Text>
      <Pressable onPress={() => setCount(p => p + 1)}>
        <Text>{count}</Text>
      </Pressable>
    </View>
  );
}
export default Setting;
