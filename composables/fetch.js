import { queryCollection } from '@nuxt/content/server';

export default function useFetch() {
  async function fetchAll(endpoint, url, where = {}, limit = null) {
    const { data } = await useAsyncData(`${endpoint}`, () => {
      const query = queryCollection(url)
        .only(["id", "title", "description", "category", "_path", "last_updated"])
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
      return queryCollection().where(query).findOne();
    });

    return data.value;
  }

  return { fetchAll, fetchOne };
}
