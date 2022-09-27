export default function useFetch() {
  async function fetchAll(endpoint, url, query) {
    const { data } = await useAsyncData(`${endpoint}`, () => {
      return query ? queryContent(url).where(query).find() : queryContent(url).find();
    })

    return data.value;
  }

  async function fetchOne(endpoint, query) {
    const { data } = await useAsyncData(`${endpoint}`, () => { 
      return queryContent().where(query).findOne()
    })

    return data.value;
  }

  return { fetchAll, fetchOne };
}
