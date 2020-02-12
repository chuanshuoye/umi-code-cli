const queryString = require('query-string');
import request from '@/../utils/request';
import { root } from '@/../utils/proxyTable';
import { API } from './const';

export function postTest(obj) {
    return request(`${root}${API.demoAPI.now}`, {
        method: 'POST',
        body: JSON.stringify(obj)
    });
}

export function getTest(payload) {
    const query = queryString({
        id: payload.id,
        name: payload.name
    });
    return request(`${root}${API.demoAPI.now}?${query}`, {
        method: 'GET',
        body: null
    });
}