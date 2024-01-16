import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='overflow-x-hidden bg-[#0E1E3A] h-[100vh] max-h-screen relative'>
            <div className='absolute px-20 py-10'>
                <a href="/" className="flex items-center">
                    <span className="text-iPrimary text-title-lg font-bold ">i</span>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MED</span>
                </a>
            </div>
            <div className='flex'>
                <img src="/images/vector.png" alt="" />
                <img src="/images/vector_1.png" alt="" />
            </div>
            <div className="w-full absolute top-40">
                <div className=" grid grid-flow-col-1 md:grid-cols-2 ">
                    <div className="w-auto md:px-20 h-[450px] bg-[#1B3C74] hidden md:block rounded-lg">
                        <img className='md:h-[460px]' src="/images/doctor_01.png" alt="" />
                    </div>
                    <div className="w-full bg-transparent md:pl-16 rounded-lg lg:rounded-l-none">
                        <h3 className="text-title-xl px-10 text-white">Register Account to iMed</h3>
                        <form className="px-10 md:px-20 pt-6 pb-8 mb-4 bg-transparent rounded">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold " htmlFor="username">
                                    HP
                                </label>
                                <input className="w-full px-3 py-2 text-sm leading-tight  bg-transparent  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="text" placeholder="HP" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold " htmlFor="password">
                                    Password
                                </label>
                                <input className="w-full px-3 py-2 mb-3  bg-transparent  text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                                {/* <p className="text-xs italic text-white">password.</p> */}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold " htmlFor="username">
                                    Name
                                </label>
                                <input className="w-full px-3 py-2 text-sm  bg-transparent  leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="text" placeholder="Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                    DOB
                                </label>
                                <input className="w-full px-3 py-2 text-sm leading-tight  bg-transparent  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="date" placeholder="dd/mm/yyyy" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold " htmlFor="Email">
                                    Email
                                </label>
                                <input className="w-full px-3 py-2 text-sm  bg-transparent  leading-tight  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="text" placeholder="Email Address" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold " htmlFor="username">
                                    Nationality
                                </label>
                                <select name="Nationality" className='w-full px-3 py-2 text-sm  bg-transparent  leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id="Nationality" placeholder='Nationality'>
                                    <option value="DEFAULT">Nationality</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold " htmlFor="username">
                                    Limousine Hearse
                                </label>
                                <div className='flex  gap-10'>
                                    <div className='flex gap-3'>
                                        <input className="px-3 py-2 checked:active:bg-[#FFB300] text-sm" name='Limousine' value="male" id="male" type="radio" />
                                        <label className="block text-sm font-bold " htmlFor="username">
                                            Male
                                        </label>
                                    </div>
                                    <div className='flex gap-3'>
                                        <input className="px-3 py-2 text-sm text-[#FFB300] bg-[#FFB300]  focus:ring-[#FFB300]  bg-transparent " name='Limousine' id='female' value="female" type="radio" />

                                        <label className="block text-sm font-bold " htmlFor="username">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                    ID
                                </label>
                                <input className="w-full px-3 py-2 text-sm leading-tight  bg-transparent  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="text" placeholder="Select ID" />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                    ID Number
                                </label>
                                <input className="w-full px-3 py-2 text-sm leading-tight  bg-transparent  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="text" placeholder="ID Number" />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                    Address
                                </label>
                                <input className="w-full px-3 py-2 text-sm leading-tight  bg-transparent  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="text" placeholder="Address" />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-3'>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                        Post Code
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight  bg-transparent  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="number" placeholder="Post Code" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                        Unit Number
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight  bg-transparent  border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hp" type="number" placeholder="Unit Number" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-3'>

                                <div className='gap-10'>
                                    <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                        Allergy
                                    </label>
                                    <div className='flex gap-10'>
                                        <div className='flex gap-3'>

                                            <input className="px-3 py-2 checked:active:bg-[#FFB300] text-sm" name='Limousine' value="male" id="male" type="radio" />
                                            <label className="block text-sm font-bold " htmlFor="username">
                                                Yes
                                            </label>
                                        </div>
                                        <div className='flex gap-3'>
                                            <input className="px-3 py-2 text-sm text-[#FFB300] bg-[#FFB300]  focus:ring-[#FFB300]  bg-transparent " name='Limousine' id='female' value="female" type="radio" />

                                            <label className="block text-sm font-bold " htmlFor="username">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='gap-10'>
                                    <label className="block mb-2 text-sm font-bold  bg-transparent " htmlFor="username">
                                        G6PD
                                    </label>
                                    <div className='flex gap-10'>
                                        <div className='flex gap-3'>

                                            <input className="px-3 py-2 checked:active:bg-[#FFB300] text-sm" name='Limousine' value="male" id="male" type="radio" />
                                            <label className="block text-sm font-bold " htmlFor="username">
                                                Yes
                                            </label>
                                        </div>
                                        <div className='flex gap-3'>
                                            <input className="px-3 py-2 text-sm text-[#FFB300] bg-[#FFB300]  focus:ring-[#FFB300]  bg-transparent " name='Limousine' id='female' value="female" type="radio" />

                                            <label className="block text-sm font-bold " htmlFor="username">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="m-6 text-center">
                                <button className="w-full px-4 py-2 font-bold text-white bg-iPrimary rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                                    Register
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="flex m-6 items-center">
                                <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Privacy policy* By proceeding,
                                    I am agreeing to terms and conditions</label>
                            </div>
                            <div className="m-6 text-center ">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                                    Already Have an Account? <span className='cursor-pointer text-iPrimary'>Login</span>With Us Today
                                </a>
                            </div>
                            {/* <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                                    Forgot Password?
                                </a>
                            </div> */}
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default page