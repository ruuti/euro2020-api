import axios from "axios";

const instance = axios.create({
  "timeout": 5000
});

/**
 * Get a file stream from URL
 * @returns {Promise}
 */
export const getFileFromUrl = async (url) =>
  await instance.get(url, {
    "responseType": "arraybuffer"
  });
