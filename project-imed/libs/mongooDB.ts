import { connect, connection } from 'mongoose'
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = 'mongodb+srv://imed:xBvLVwrQBhh4MwsH@imed.3tdr2yt.mongodb.net/imed'
} = process.env

const options: any = {
  useUnifiedTopology: true,

  useNewUrlParser: true
}

const connectToDatabase = async () => {
  if (!connection.readyState) {
    console.log('Connecting to ::', MONGO_URI)
    connect(MONGO_URI, options)
  }
}

export default connectToDatabase;