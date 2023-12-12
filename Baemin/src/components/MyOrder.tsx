import {Text, View, StyleSheet, Pressable} from 'react-native';
import {orderType} from '../slices/order';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../App';

interface Props {
  item: orderType;
}
function MyOrder({item}: Props) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const GotoOrderItem = (id: string) => {
    navigation.navigate('Complete', {orderId: id});
  };

  return (
    <View style={styles.orderContainer}>
      <Pressable
        style={styles.info}
        onPress={() => GotoOrderItem(item.orderId)}>
        <Text style={styles.eachInfo}>{item.price}원</Text>
        <Text>삼성동 | </Text>
        <Text>왕십리</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
  },
  eachInfo: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default MyOrder;
