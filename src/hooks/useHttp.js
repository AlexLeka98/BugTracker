import { useState } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const httpRequest = async (httpInfo, dataFunc) => {
        setIsLoading(true);
        setError(null);
        console.log(dataFunc)
        try {
            const response = await fetch(httpInfo.url,
                {
                    method: httpInfo.method ? httpInfo.method : 'GET',
                    body: httpInfo.body ? JSON.stringify(httpInfo.body) : undefined,
                    headers: httpInfo.headers ? httpInfo.headers : undefined,
                })
            if (!response.ok) {
                setIsLoading(false);
                throw new Error('Something went wrong!');
            }
            setIsLoading(false);
            const data = await response.json();
            if (dataFunc !== undefined) {
                return dataFunc(data);
            }
            return;
        }
        catch (error) {
            console.log(error);
            setError(error);
        }
    }

    return { httpRequest, error, isLoading }
}

export default useHttp;