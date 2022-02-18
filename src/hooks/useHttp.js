import { useState } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
                console.dir(error)
                throw new Error(data.error.message);
            }
            if (dataFunc !== undefined) {
                return await dataFunc(data);
            }
            setIsLoading(false);
            // console.log(data);
            return data;
        }
        catch (error) {
            setError(error);
        }
    }

    return { httpRequest, error, isLoading }
}

export default useHttp;