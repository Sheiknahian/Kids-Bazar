
import { client } from './dbConnect';
export async function getProducts() {
  const db = client.db("kidsbazar");

  const products = await db.collection("products").find({}).toArray();

  const serializedProducts = products?.map((product) => ({
    ...product,
    _id: product._id.toString(),
    }));

    return serializedProducts;
}