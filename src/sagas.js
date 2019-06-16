import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, t} from './actions';

// the base URL for your REST API backend
const baseUrl = 'https://api.github.com/users';

// sending request with username and getting user data from GitHub 
function* loadUserData(action) {
    const response = yield axios.get(`${baseUrl}/${action.name}/repos`);
   let result =response.data.map(full_name => full_name.full_name)
   let temp =Object.values(response.data)
   var arr = [];
for (var key in response.data) {
  arr.push(response.data[key]);
}
console.log(typeof arr)
    yield put(actions.loadUserDataSuccess(result))
}

// watches for actions dispatched to the store and starts loadUserData saga
export function* watchLoadUserData() {
    yield takeLatest(t.LOAD_USER_DATA, loadUserData)
}
