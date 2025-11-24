import { useState, useEffect } from "react";
import useCurrencyInfo from "./useCurrencyInfo";

function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyRates = useCurrencyInfo(fromCurrency);

    useEffect(() => {
        if (currencyRates[toCurrency]) {
            const rate = currencyRates[toCurrency];
            setConvertedAmount(amount * rate);
        }
    }, [amount, fromCurrency, toCurrency, currencyRates]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value === "" ? 0 : Number(value));
    };

    const currencies = [
        "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", 
        "INR", "SGD", "NZD", "MXN", "BRL", "RUB", "ZAR", "KRW"
    ];

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            
            <div className="converter-form">
                {/* Amount Input */}
                <div className="input-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        min="0"
                        step="0.01"
                        placeholder="Enter amount"
                    />
                </div>

                {/* Currency Selection Row */}
                <div className="currency-row">
                    {/* From Currency */}
                    <div className="input-group">
                        <label>From</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {currencies.map(currency => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Swap Button */}
                    <button 
                        className="swap-btn" 
                        onClick={swapCurrencies}
                        title="Swap currencies"
                    >
                        ⇄
                    </button>

                    {/* To Currency */}
                    <div className="input-group">
                        <label>To</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {currencies.map(currency => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Result Display */}
                <div className="result">
                    <h2>
                        {amount} {fromCurrency} = {" "}
                        {convertedAmount > 0 ? convertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) : "0.00"} {toCurrency}
                    </h2>
                    {currencyRates[toCurrency] && (
                        <p className="exchange-rate">
                            1 {fromCurrency} = {currencyRates[toCurrency].toFixed(4)} {toCurrency}
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {Object.keys(currencyRates).length === 0 && (
                    <div className="loading">
                        Loading exchange rates...
                    </div>
                )}
            </div>
        </div>
    );
}

export default CurrencyConverter;