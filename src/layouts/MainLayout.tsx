import { Footer } from '@/components';
import { Header, Navbar } from '@/components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <header className="sticky left-0 right-0 top-0 z-20">
                <Header />
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
