interface ToastMessage {
    content: JSX.Element | null;
    type?: string;
}

function ToastMessage({ content, type = "success" }: ToastMessage) {
    if (content === null) return null;
    return (
        <div className="fixed bottom-28 left-1/2 translate-x-[-50%] bg-bgAnnounce text-white px-6 py-2 rounded-md z-[9999]">
            {content}
        </div>
    );
}

export default ToastMessage;
