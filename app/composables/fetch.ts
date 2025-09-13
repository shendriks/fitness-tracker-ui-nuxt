export const myCsrfFetch = (request, opts?) => {
    const { $csrfFetch } = useNuxtApp();
    const config = useRuntimeConfig();
    return $csrfFetch(request, { baseURL: config.public.baseURL, ...opts });
};

export const myFetch = (request, opts?) => {
    const config = useRuntimeConfig();
    return $fetch(request, { baseURL: config.public.baseURL, ...opts });
};

export const myUseFetch = (request, opts?) => {
    const config = useRuntimeConfig();
    return useFetch(request, { baseURL: config.public.baseURL, ...opts });
};
