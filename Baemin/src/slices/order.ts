import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface orderType {
  orderId: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  price: number;
}
interface initialState {
  orders: orderType[];
  deliveries: orderType[];
}

const initialState: initialState = {
  orders: [],
  deliveries: [],
};
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<orderType>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<String>) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder(state, action) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        state.orders.splice(index, 1);
      }
      const delivery = state.deliveries.findIndex(
        v => v.orderId === action.payload,
      );
      if (delivery > -1) {
        state.deliveries.splice(delivery, 1);
      }
    },
  },
  extraReducers: builder => {},
});

export default orderSlice;
