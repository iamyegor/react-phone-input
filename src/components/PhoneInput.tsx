import React, { useEffect, useRef, useState } from "react";
import useCloseOnOutsideClick from "@/hooks/useCloseOnOutsideClick.ts";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber.ts";
import CountryCodeButton from "@/components/CountryCodeButton.tsx";
import CountriesDropdown from "@/components/CountriesDropdown.tsx";
import { getPlaceholderBasedOnMaxDigits } from "@/utils/getPlaceholderBasedOnMaxDigits.ts";
import { Country } from "@/types/Country.ts";
import { countries } from "@/constants/countries.ts";

interface PhoneInputProps {
    country: Country;
    setCountry: (value: Country) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
}

export default function PhoneInput({
    country,
    setCountry,
    phoneNumber,
    setPhoneNumber,
}: PhoneInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const countriesDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPhoneNumber(formatPhoneNumber(country, phoneNumber));
    }, [phoneNumber, country]);

    useCloseOnOutsideClick(countriesDropdownRef.current, setIsDropdownOpen);

    function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(formatPhoneNumber(country, event.target.value));
    }

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
    }

    return (
        <div
            className={`flex items-center border border-gray-300 rounded-md h-14 bg-white 
            ${isFocused ? "ring-2 ring-blue-500" : ""} transition z-20 relative`}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <div ref={countriesDropdownRef}>
                <CountryCodeButton
                    country={country}
                    setIsOpen={setIsDropdownOpen}
                    disabled={countries.length == 1}
                />
                <CountriesDropdown
                    isOpen={isDropdownOpen}
                    setIsOpen={setIsDropdownOpen}
                    setCountry={setCountry}
                />
            </div>
            <input
                type="text"
                className="pl-3 text-lg border-none focus:ring-0 focus:border-none w-full h-full 
                outline-none rounded-md"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={getPlaceholderBasedOnMaxDigits(country.maxDigits)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-testid="PhoneInput.Input"
            />
        </div>
    );
}
