import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import orderSlice, {orderType} from '../slices/order';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import axios, {AxiosError} from 'axios';
import {API_URL} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../App';

interface Props {
  item: orderType;
}
function EachOrder({item}: Props) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [detail, showDetail] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const toggleDetail = useCallback(() => {
    showDetail(prevState => !prevState);
  }, []);

  const onAccept = useCallback(async () => {
    if (!accessToken) {
      return;
    }
    try {
      await axios.post(
        `${API_URL}/accept`,
        {orderId: item.orderId},
        {headers: {authorization: `Bearer ${accessToken}`}},
      );
      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      navigation.navigate('Delivery');
    } catch (error) {
      let errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        // 타인이 이미 수락한 경우
        Alert.alert('알림', errorResponse.data.message);
        dispatch(orderSlice.actions.rejectOrder(item.orderId));
      }
    }
  }, [navigation, dispatch, item, accessToken]);

  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item.orderId]);

  return (
    <View style={styles.orderContainer}>
      <Pressable onPress={toggleDetail} style={styles.info}>
        <Text style={styles.eachInfo}>{item.price}원</Text>
        <Text>삼성동 | </Text>
        <Text>왕십리</Text>
      </Pressable>
      {detail && (
        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.acceptButton}
            onPress={onAccept}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>수락</Text>
            )}
          </Pressable>
          <Pressable style={styles.rejectButton} onPress={onReject}>
            <Text style={styles.buttonText}>거절</Text>
          </Pressable>
        </View>
      )}
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
export default EachOrder;
