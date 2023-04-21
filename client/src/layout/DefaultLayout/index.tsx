import Sidebar from "./Sidebar";
import Header from "./Header";
import PlayingBar from "./PlayingBar";

function DefaultLayout({ children }: any) {
    return (
        <div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col">
            <div className="flex flex-row flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 relative">
                    <Header />
                    <div className="flex flex-col dashboard bg-bgDashboard h-[calc(100vh-90px)] w-full overflow-y-auto px-8 pt-16 pb-8 scrollbar">
                        <div className="flex-1">{children}</div>
                        <div className="py-20 w-full">
                            <hr className="border-secondary" />
                        </div>
                    </div>
                </div>
            </div>
            <PlayingBar />
        </div>
    );
}

export default DefaultLayout;
