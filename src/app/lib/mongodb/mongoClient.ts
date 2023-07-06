import { MongoClient } from 'mongodb'

  const uri = "mongodb://127.0.0.1"
  const options = {}

  if (!uri) {
    throw new Error('Add Mongo URI to .env.local')
  }

  let client = new MongoClient(uri,options);
  // Fix this, cant connect somehow

    var clientPromise = client.connect()

export default clientPromise