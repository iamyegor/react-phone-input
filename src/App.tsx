import { useState } from "react";
import { Country } from "@/types/Country.ts";
import PhoneInput from "@/components/PhoneInput.tsx";
import { countries } from "@/constants/countries.ts";

export default function App() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState<Country>(countries[0]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
            <PhoneInput
                country={country}
                setCountry={setCountry}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
            />
        </div>
    );
}
