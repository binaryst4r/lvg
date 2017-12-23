import axios from 'axios';

const _defaultHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

function _request(method = 'GET', url, params = {}, headers = {}) {
  let defaultHeaders = Object.assign({}, _defaultHeaders, headers);
  let axiosParams = Object.assign({}, params);
  let options = {
    method,
    url,
    headers: defaultHeaders,
    timeout: 30000
  };
  if (method.toUpperCase() === 'GET') {
    options.params = axiosParams;
  } else {
    options.data = axiosParams;
  }

  return axios(options);
}

export const get = (path, params, headers) => {
  return _request('GET', path, params, headers);
}

export const patch = (path, params, headers) => {
  return _request('PATCH', path, params, headers);
}

export const post = (path, params, headers) => {
  return _request('POST', path, params, headers);
}

export const remove = (path, params, headers) => {
  return _request('DELETE', path, params, headers);
}
