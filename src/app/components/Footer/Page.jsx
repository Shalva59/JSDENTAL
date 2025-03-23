'use client';

import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import logo from './../../Assets/logo.png';
import Image from 'next/image';

export default function Footer() {
  return (
    // <footer className="bg-gray-900 pt-12 pb-6 px-10 tracking-wide">
    //   <div className="max-w-screen-xl mx-auto">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    //       <div className="lg:flex lg:items-center">
    //         <a href="javascript:void(0)">
    //            <Image src={logo} alt='jc dental' width={150} height={150}/> 
    //           {/* <img src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="w-48" /> */}
    //         </a>
    //       </div>

    //       <div className="lg:flex lg:items-center">
    //         <ul className="flex space-x-6">
    //           {/* Facebook Link JC Dental */}
    //           <li>
    //             <a href="https://www.facebook.com/profile.php?id=61573996716691">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
    //                 <path fillRule="evenodd"
    //                   d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
    //                   clipRule="evenodd" />
    //               </svg>
    //             </a>
    //           </li>
    //           {/* Instagram Link JC Dental */}
    //           <li>
    //             <a href="https://www.instagram.com/j_c_dental/">
    //               <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-6 h-7" viewBox="0 0 24 24">
    //                 <path fillRule="evenodd"
    //                   d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.347 3.608 1.322.975.975 1.26 2.242 1.322 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.347 2.633-1.322 3.608-.975.975-2.242 1.26-3.608 1.322-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.347-3.608-1.322-.975-.975-1.26-2.242-1.322-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.347-2.633 1.322-3.608.975-.975 2.242-1.26 3.608-1.322C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.74 0 8.332.013 7.052.07 5.72.129 4.5.392 3.348 1.347 2.196 2.302 1.433 3.523 1.07 4.848.713 6.18.675 6.74.675 12s.038 5.82.395 7.152c.363 1.325 1.126 2.546 2.278 3.501 1.152.955 2.372 1.218 3.704 1.277 1.28.058 1.688.07 4.948.07s3.668-.012 4.948-.07c1.332-.059 2.552-.322 3.704-1.277 1.152-.955 1.915-2.176 2.278-3.501.357-1.332.395-1.892.395-7.152s-.038-5.82-.395-7.152c-.363-1.325-1.126-2.546-2.278-3.501C19.5.392 18.28.129 16.948.07 15.668.013 15.26 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zM18.406 4.594a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
    //                   clipRule="evenodd" />
    //               </svg>
    //             </a>
    //           </li>
    //           <li>
    //             <a href="javascript:void(0)">
    //               <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-300 hover:fill-white w-7 h-7"
    //                 viewBox="0 0 24 24">
    //                 <path
    //                   d="M22.92 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.83 4.5 17.72 4 16.46 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
    //               </svg>
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       <div>
    //         <h4 className="text-am mb-6 text-white">Useful links</h4>
    //         <ul className="space-y-4 pl-2">
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">Featured</a>
    //           </li>
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">New Arrivals</a>
    //           </li>
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">New Arrivals</a>
    //           </li>
    //         </ul>
    //       </div>

    //       <div>
    //         <h4 className="text-am mb-6 text-white">Information</h4>
    //         <ul className="space-y-4 pl-2">
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">About Us</a>
    //           </li>
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">Terms &amp; Conditions</a>
    //           </li>
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
    //           </li>
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">Sale</a>
    //           </li>
    //           <li>
    //             <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm">Documentation</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>

    //     <p className="text-gray-400 text-sm mt-10">© ReadymadeUI. All rights reserved.
    //     </p>
    //   </div>
    // </footer>


    // m-4

    <footer className="bg-gray-900 rounded-lg shadow-sm dark:bg-gray-900">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      {/* მთავარი wrapper div */}
      <div className="flex flex-col items-center sm:flex-row  sm:justify-between text-center">
        <a href="https://flowbite.com/" className="flexMobileResponsive flex  items-center mb-4 sm:mb-0  space-x-3 rtl:space-x-reverse">
          <Image src={logo} alt="jc dental" width={80} height={80} />
          <span className="text-white text-3xl font-semibold whitespace-nowrap dark:text-white">JC Dental</span>
        </a>
        <ul className="flex flex-wrap justify-center sm:justify-start text-sm  font-medium text-gray-500 dark:text-gray-400">
          <li className='mb-2'><a href="#" className="tracking-[4px] text-white hover:underline mx-4">მთავარი</a></li>
          <li className='mb-2'><a href="#" className="tracking-[4px] text-white hover:underline mx-4">სერვისი</a></li>
          <li className='mb-2'><a href="#" className="tracking-[4px] text-white hover:underline mx-4">ექიმები</a></li>
          <li className='mb-2'><a href="#" className="tracking-[4px] text-white hover:underline mx-4">კონტაქტი</a></li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
      
      {/* ქვედა ნაწილი - ცენტრში ტელეფონებზე */}
      <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between">
        <span className="text-gray-500 text-sm dark:text-gray-400">
          © 2025 <a href="https://flowbite.com/" className="hover:underline">JC Dental</a>. All Rights Reserved.
        </span>
        <ul className="flex space-x-6 mt-4 sm:mt-0">
          {/* Facebook */}
          <li>
            <a href="https://www.facebook.com/profile.php?id=61573996716691">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                <path fillRule="evenodd"
                  d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                  clipRule="evenodd" />
              </svg>
            </a>
          </li>
          {/* Instagram */}
          <li>
            <a href="https://www.instagram.com/j_c_dental/">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                <path fillRule="evenodd"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.347 3.608 1.322.975.975 1.26 2.242 1.322 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.347 2.633-1.322 3.608-.975.975-2.242 1.26-3.608 1.322-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.347-3.608-1.322-.975-.975-1.26-2.242-1.322-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.347-2.633 1.322-3.608.975-.975 2.242-1.26 3.608-1.322C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.74 0 8.332.013 7.052.07 5.72.129 4.5.392 3.348 1.347 2.196 2.302 1.433 3.523 1.07 4.848.713 6.18.675 6.74.675 12s.038 5.82.395 7.152c.363 1.325 1.126 2.546 2.278 3.501 1.152.955 2.372 1.218 3.704 1.277 1.28.058 1.688.07 4.948.07s3.668-.012 4.948-.07c1.332-.059 2.552-.322 3.704-1.277 1.152-.955 1.915-2.176 2.278-3.501.357-1.332.395-1.892.395-7.152s-.038-5.82-.395-7.152c-.363-1.325-1.126-2.546-2.278-3.501C19.5.392 18.28.129 16.948.07 15.668.013 15.26 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zM18.406 4.594a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
                  clipRule="evenodd" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  



  );
}
