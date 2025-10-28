import React, { useEffect, useRef, useState } from 'react'

const AddressAutocomplete = ({ value = '', onSelect, placeholder = 'Start typing address...', country = 'us' }) => {
    const [input, setInput] = useState(value)
    const [predictions, setPredictions] = useState([])
    const [prevInput, setPrevInput] = useState('') // Add this line
    const debRef = useRef(null)

    useEffect(() => {
        if (!input || input.length < 3) {
            setPredictions([]);
            setPrevInput('');
            return;
        }

        if (input === prevInput) {
            return;
        }

        clearTimeout(debRef.current)
        debRef.current = setTimeout(async () => {
            try {
                const countryCode = country === 'us' ? 'us' : country
                const response = await fetch(
                    `https://api.locationiq.com/v1/autocomplete.php?key=${import.meta.env.VITE_LOCATIONIQ_TOKEN}&q=${encodeURIComponent(input)}&countrycodes=${countryCode}&limit=5&format=json`, {
                }
                )
                const data = await response.json()
                setPredictions(data)
                setPrevInput(input)
            } catch (error) {
                console.error('Address search error:', error)
                setPredictions([])
                setPrevInput('')
            }
        }, 1000)

        return () => clearTimeout(debRef.current)
    }, [input, country, prevInput])

    const parseLocationIQAddress = (place) => {
        const addressParts = place.display_name.split(',').map(part => part.trim())
        return {
            line1: addressParts[0] || '',
            line2: '',
            city: addressParts[1] || '',
            state: addressParts[2] || '',
            zipCode: '',
            formatted: place.display_name,
            placeId: place.place_id
        }
    }

    const handleSelect = (place) => {
        const addressObj = parseLocationIQAddress(place);
        setInput(addressObj.line1 || addressObj.formatted)
        setPredictions([])
        setPrevInput(addressObj.line1 || addressObj.formatted)
        if (onSelect) onSelect(addressObj)
    }

    return (
        <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="w-full border px-3 py-2 rounded"
            />
            {predictions.length > 0 && (
                <ul className="absolute z-50 bg-white border w-full mt-1 max-h-60 overflow-auto rounded shadow-lg">
                    {predictions.map((place, index) => (
                        <li key={place.place_id ? `${place.place_id}-${index}` : index} className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                            onClick={() => handleSelect(place)}>
                            <div className="font-medium text-sm">{place.display_name}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AddressAutocomplete