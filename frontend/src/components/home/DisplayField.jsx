const DisplayField = ({ label, value }) => {
    // Helper function to render complex object v
    const renderComplexValue = (obj) => (
        <div className="flex-grow ml-4 mt-2 bg-moonlight p-2 rounded-lg">
            {Object.entries(obj).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-black">{key}:</span>
                    <span className="text-sm text-black">
                        {typeof val === 'object' && val !== null ? `${val.value} ${val.unit}` : val}
                    </span>
                </div>
            ))}
        </div>
    );

    // Handling boolean values
    if (typeof value === 'boolean') {
        return (
            <div className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                <span className="font-medium text-gray-700">{label}:</span>
                <span className="text-green-500">{value ? 'Yes' : 'No'}</span>
            </div>
        );
    }

    // Handling object, null, and array checks for value
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
            <div className="p-4 bg-white shadow-md rounded-lg flex flex-col">
                <span className="font-medium text-gray-700 mb-2">{label}:</span>
                {renderComplexValue(value)}
            </div>
        );
    }

    // Default render for simple values
    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
            <span className="font-medium text-gray-700">{label}:</span>
            <span className="text-gray-800">{value || 'N/A'}</span>
        </div>
    );
};

export default DisplayField;
