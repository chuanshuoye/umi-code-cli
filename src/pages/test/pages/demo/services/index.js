const queryString = require('query-string');
import request from '@/utils/request';

export function postTest(obj) {
  return request(`/api/test`, {
    method: 'POST',
    body: JSON.stringify(obj)
  });
}

export function getTest(payload) {
  const query = queryString({
    id: payload.id,
    name: payload.name
  });
  return request(`/api/test?${query}`, {
    method: 'GET',
    body: null
  });
}
