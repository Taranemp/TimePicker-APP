import { Outlet } from 'react-router-dom'
import Topbar from '@/components/partitions/Topbar.jsx';
import Footbar from "@/components/partitions/Footbar.jsx";

export default function Layout() {
    return (
        <div className='container-fluid m-0 p-0 mx-auto'>
            <main className="">
                <Topbar />
                <div className='container-fluid mx-auto mt-4'>
                    <Outlet /> 
                </div>
                <Footbar />
            </main>
        </div>
    )
}
