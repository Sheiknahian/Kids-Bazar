import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;
const dbname = process.env.DB_NAME;

const collections = {
    PRODUCT: 'product'
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect = (collsName) => {
    return client.db(dbname).collection(collsName)
}