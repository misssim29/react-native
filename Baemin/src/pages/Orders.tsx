import React, {useCallback} from 'react';
import {Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import EachOrder from '../components/EachOrder';
import {orderType} from '../slices/order';

function Order() {
  const orders = useSelector((state: RootState) => state.order.orders);
  const renderItem = useCallback(({item}: {item: orderType}) => {
    return <EachOrder item={item} />;
  }, []);
  return (
    <View>
      <Text>주문</Text>
      <View>
        <FlatList
          data={orders}
          keyExtractor={item => item.orderId}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
export default Order;
