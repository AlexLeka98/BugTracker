import { useState } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cancelRequest, setCancelRequest] = useState(false);
    const httpRequest = async (httpInfo, dataFunc) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(httpInfo.url,
                {
                    method: httpInfo.method ? httpInfo.method : 'GET',
                    body: httpInfo.body ? JSON.stringify(httpInfo.body) : undefined,
                    headers: httpInfo.headers ? httpInfo.headers : undefined,
                })
            const data = await response.json();
            if (!response.ok) {
                setIsLoading(false);
                throw new Error(data.error.message);
            }
            if (dataFunc !== undefined) {
                return await dataFunc(data);
            }
            setIsLoading(false);
            return data;
        }
        catch (error) {
            setError(error);
            return ({ error: error.message });
        }
    }

    return { httpRequest, error, isLoading, cancelRequest, setCancelRequest }
}

export default useHttp;