import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-aae34.firebaseio.com/'
})