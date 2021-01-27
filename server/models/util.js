import mongoose from 'mongoose'
import constants from '../constants'
  
const connectDb = () => {
  return mongoose.connect(constants.connection_string, {useNewUrlParser: true, useUnifiedTopology: true})
}
 
export default connectDb