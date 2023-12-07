export default function useFetch() {
  async function fetchAll(endpoint, url, where = {}, limit = null) {
    const { data } = await useAsyncData(`${endpoint}`, () => {
      const query = queryContent(url)
        .only(["id", "title", "description", "category", "_path"])
        .sort({ id: -1, $numeric: true })
        .where({...where, draft: { $ne: true }});
      
        if (limit) {
          query.limit(limit)
        }


      return query.find()
    });

    return data.value;
  }

  async function fetchOne(endpoint, query) {
    const { data } = await useAsyncData(`${endpoint}`, () => {
      return queryContent().where(query).findOne();
    });

    return data.value;
  }

  return { fetchAll, fetchOne };
}
