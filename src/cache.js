import apicache from "apicache-plus";

export const getFromCache = async (id) => {
  if (await apicache.has(id)) {
    return await apicache.get(id);
  }
  return false;
};

export const saveToCache = async (id, data, expiration = "5 minutes") =>
  await apicache.set(id, data, expiration);
