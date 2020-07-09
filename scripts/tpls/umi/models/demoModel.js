import * as service from '../services';

export default {
  namespace: 'demoModel',
  state: {
  },
  reducers: {
    updateStore(state, { payload: { data } }) {
      return { ...state, saveInfo: data.value }
    },
  },
  effects: {
    *getSaveInfo({ payload: { ...params } }, { call, put }) {
      const { data } = yield call(service.getTest, { ...params })
      yield put({
        type: 'updateStore',
        payload: {
          data: data
        },
      })
      return data;
    }
  }
}
