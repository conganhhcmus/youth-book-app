import { Footer } from '@/components';
import { Header, Navbar } from '@/components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="grid h-screen grid-cols-1 place-content-between">
            <header className="sticky left-0 right-0 top-0 z-20">
                <Header />
                <Navbar />
            </header>
            <main className="">
                <Outlet />
            </main>
            <footer className="mt-20 w-full bg-gray-200">
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;
