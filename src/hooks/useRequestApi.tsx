import { useCallback, useEffect, useState } from "react"

function useRequestApi<T>() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({} as T)
    const sendRequest = useCallback((requestApi: Function, ...args) => {
        const load = async () => {
            setLoading(true);
            const { data } = await requestApi(args);
            setData(data);
            setLoading(false);
        }
        if (requestApi)
            load();
    }, [])
    return { data, loading, sendRequest }
}
export default useRequestApi;