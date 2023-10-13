import axios from "axios";
import redis from "$lib/redis";

const instance = axios.create();

// Request interceptor
instance.interceptors.request.use(async (request) => {
  const data = await redis.get(request.url);
  if (data) {
    request.adapter = () => Promise.resolve({
      data: JSON.parse(data),
      status: 200,
      statusText: 'OK',
      headers: {}, // Or some default headers
      config: request,
      request: null,
      fromCache: true,  // Custom property indicating the response comes from cache
    });
  }
  return request;
});


// Response interceptor
instance.interceptors.response.use(async (response) => {
  await redis.set(response.config.url, JSON.stringify(response.data), 'EX', 3600); // caching for 1 hour
  return response;
});

export default instance;
