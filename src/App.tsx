import { Routes, Route } from "react-router-dom"


import './global.css'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home } from './_root/pages'
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "@/components/ui/toaster"


function App() {
    return (
        <main className='flex h-screen '>
            <Routes>
                {/* Public Routes */}
                <Route element={<AuthLayout />}>
                    <Route path='/sign-in' element={<SigninForm />} />
                    <Route path='/sign-up' element={<SignupForm />} />
                </Route>



                {/* Privet Routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>

            </Routes>

            <Toaster />
        </main>
    )
}
export default App