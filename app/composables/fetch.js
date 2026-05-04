import { queryCollection } from "#imports";

export default function useFetch() {
  async function fetchAll(collection, where = null, limit = null) {
    const query = queryCollection(collection).where("draft", "IS NOT", true);

    if (where) {
      if (Array.isArray(where)) {
        where.forEach((condition) => {
          query.where(condition.field, condition.operator, condition.value);
        });
      } else {
        query.where(where.field, where.operator, where.value);
      }
    }

    if (limit) {
      query.limit(limit);
    }

    return query.order("last_updated", "DESC").all();
  }

  async function fetchOne(collection, where) {
    const query = queryCollection(collection);
    if (where) {
      if (Array.isArray(where)) {
        where.forEach((condition) => {
          query.where(condition.field, condition.operator, condition.value);
        });
      } else {
        query.where(where.field, where.operator, where.value);
      }
    }

    return query.first();
  }

  return { fetchAll, fetchOne };
}
