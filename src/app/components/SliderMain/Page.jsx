"use client"
import React, { useEffect } from 'react';
import 'flowbite/dist/flowbite.min.css';

const Page = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('flowbite').then((module) => {
                const { initCarousels } = module;
                initCarousels();  // Flowbite-ის კარუსელის ინიციალიზაცია
                console.log('Flowbite carousel initialized!');
            }).catch(error => {
                console.error('Flowbite failed to load:', error);
            });
        }
    }, []);

    return (
        <div id="default-carousel" className="relative w-full mt-[-10px]" data-carousel="slide">
            <div className="relative h-[400px] overflow-hidden rounded-lg md:h-[580px]">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

                <div className="relative z-20 h-full">
                    <div className="relative w-full h-full flex items-end justify-start transition-opacity duration-700 ease-in-out" data-carousel-item>
                        <img src="https://www.yourdentistryguide.com/wp-content/uploads/2017/11/kids-dentistry-min.jpg"
                            className="w-full h-full object-cover" alt="First slide" />
                        {/* შიდა სლაიდერის ქარდი 1 სურათის */}
                        <div className='absolute z-50 opacity-70 border-none'>
                            <div className="max-w-sm p-6  border-none border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <h5 className="mb-2 text-3xl tracking-wider font-bold tracking-tight text-gray-900 dark:text-white">JC DENTAL</h5>
                                </a>
                                <p className="mb-3 font-normal tracking-wider text-gray-700 dark:text-gray-400">სტომატოლოგიური კლინიკა</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    ნახეთ მეტი
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="absolute w-full h-full  flex items-end justify-start transition-opacity duration-700 ease-in-out" data-carousel-item>
                        <img src="https://healthcare.trainingleader.com/wp-content/uploads/2017/09/dentist-teeth.jpg"
                            className="w-full h-full object-cover" alt="Second slide" />
                        <div className='absolute z-50 opacity-70 border-none'>
                            <div className="max-w-sm p-6  border-none border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <h5 className="mb-2 text-3xl tracking-wider font-bold tracking-tight text-gray-900 dark:text-white">JC DENTAL</h5>
                                </a>
                                <p className="mb-3 font-normal tracking-wider text-gray-700 dark:text-gray-400">სტომატოლოგიური კლინიკა</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    ნახეთ მეტი
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute w-full h-full  flex items-end justify-start transition-opacity duration-700 ease-in-out" data-carousel-item>
                        <img src="https://familydentalcareindore.com/wp-content/uploads/2013/08/Family-Dental-Care-Indore.jpg"
                            className="w-full h-full object-cover" alt="Third slide" />
                        <div className='absolute z-50 opacity-70 border-none'>
                            <div className="max-w-sm p-6  border-none border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <h5 className="mb-2 text-3xl tracking-wider  text-white font-bold tracking-tight text-gray-900 dark:text-white">JC DENTAL</h5>
                                </a>
                                <p className="mb-3 font-normal tracking-wider text-white text-gray-700 dark:text-gray-400">სტომატოლოგიური კლინიკა</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    ნახეთ მეტი
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* მარცხენა ღილაკი */}
            <button type="button" className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none" data-carousel-prev>
                <svg className="w-6 h-6 text-white" viewBox="0 0 6 10" fill="none">
                    <path stroke="currentColor" strokeWidth="2" d="M5 1L1 5l4 4" />
                </svg>
            </button>

            {/* მარჯვენა ღილაკი */}
            <button type="button" className="absolute top-1/2 right-4 transform -translate-y-1/2 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none" data-carousel-next>
                <svg className="w-6 h-6 text-white" viewBox="0 0 6 10" fill="none">
                    <path stroke="currentColor" strokeWidth="2" d="M1 9l4-4-4-4" />
                </svg>
            </button>
        </div>




    );
};

export default Page;
