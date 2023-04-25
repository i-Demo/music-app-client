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
                    <div className="bg-bgDashboard dashboard h-[calc(100vh-90px)] overflow-y-auto overflow-x-hidden w-full scrollbar scrollbarHide">
                        {children}
                        <div className="pt-20 pb-32 px-8 w-full">
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
