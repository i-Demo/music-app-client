export interface TypeAlert {
    type: string;
    message: string;
}

function AlertMessage({ info }: { info: TypeAlert | null }) {
    return info === null ? null : (
        <div
            className="bg-transparent top-4 right-2 border-l-4 border-red-500 text-red-700 px-4 py-1 mb-3"
            role="alert"
        >
            <p>{info.message}</p>
        </div>
    );
}

export default AlertMessage;
