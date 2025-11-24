import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [rates, setRates] = useState({});
    
    useEffect(() => {
        fetch(`https://api.frankfurter.app/latest?from=${currency}`)
            .then((res) => res.json())
            .then((data) => {
                setRates(data.rates);
            })
            .catch((error) => {
                console.error("Error fetching currency data:", error);
            });
    }, [currency]);

    return rates;
}

export default useCurrencyInfo;