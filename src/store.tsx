import { createStore } from 'redux'

import UserReducer from './reducers/UserReducer'

const store = createStore(UserReducer)
console.log(store.getState())

store.subscribe(() => {
    console.log("state updated : ", store.getState())
})

export default store