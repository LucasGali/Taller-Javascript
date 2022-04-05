export const fetchCrypto = async () => {
  try {
    const resp = await fetch('https://api.coincap.io/v2/assets?limit=10')
    const { data } = await resp.json()
    return data
    // console.log(data);
  } catch (e) {
    throw new Error('no se encontro informacion en API')
  }
}
