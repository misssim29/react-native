import React, {useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import MyOrder from '../components/MyOrder';
import {orderType} from '../slices/order';

function Ing() {
  const Deliveries = useSelector((state: RootState) => state.order.deliveries);
  console.log(Deliveries);
  const renderItem = useCallback(({item}: {item: orderType}) => {
    return <MyOrder item={item} />;
  }, []);
  return (
    <View>
      <FlatList
        data={Deliveries}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
}
export default Ing;
