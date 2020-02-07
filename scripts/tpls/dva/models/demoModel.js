import * as service from '../services';

export default {
  namespace: 'DVA_NAMESPACE',
  state: {
  },
  reducers: {
    updateStore(state, {payload: {data}}) {
      return {...state, saveInfo: data.value}
    },
  },
  effects: {
    async getSaveInfo ({payload: {...params}}, {call, put}) {
      const {data} = await call(service.getTest, {...params})
      await put({
        type: 'updateStore',
        payload: {
          data: data
        },
      })
      return data;
    }
  }
}