import { Routes, Route } from "react-router-dom"


import './global.css'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages'
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
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/all-users" element={<AllUsers />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post/:id" element={<EditPost />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                    <Route path="/profile/:id/*" element={<Profile />} />
                    {/* "/* means it going to work with any route after the profile id" */}

                    <Route path="/update-profile/:id" element={<UpdateProfile />} />
                    <Route path="/update-profile/:id" element={<UpdateProfile />} />

                </Route>

            </Routes>

            <Toaster />
        </main>
    )
}
export default App;