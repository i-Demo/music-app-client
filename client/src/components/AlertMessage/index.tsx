export interface TypeAlert {
    type: string;
    message: string;
}

function AlertMessage({ info }: { info: TypeAlert | null }) {
    if (info === null) {
        return null;
    } else if (info.type === "success") {
        return (
            <div
                className="bg-transparent top-4 right-2 border-l-4  px-4 py-1 mb-3 border-green-500 text-green-700"
                role="alert"
            >
                <p>{info.message}</p>
            </div>
        );
    }
    return (
        <div
            className="bg-transparent top-4 right-2 border-l-4  px-4 py-1 mb-3 border-red-500 text-red-700"
            role="alert"
        >
            <p>{info.message}</p>
        </div>
    );
}

export default AlertMessage;
