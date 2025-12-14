import { Outlet } from 'react-router-dom'
import Topbar from '@/components/partitions/Topbar.jsx';

export default function Layout() {
    return (
        <div className='container-fluid m-0 p-0'>
            <main>
                <Topbar />
                <div className='container mx-auto mt-5'>
                    <Outlet /> 
                </div>
            </main>
        </div>
    )
}
