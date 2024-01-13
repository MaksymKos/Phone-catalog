import axios from 'axios';

const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export async function getDetails(path: string) {
  const products = await axios.get(`${BASE_URL}/${path}.json`);

  return products.data;
}
