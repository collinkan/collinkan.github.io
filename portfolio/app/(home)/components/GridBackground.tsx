// import React, { useState, useRef, Suspense } from 'react'

// export default function GridBackground() {
//     return (
//         <div className='absolute w-screen h-full -inset-y-40 flex justify-center overflow-hidden'>
//             <div className="absolute w-[200vw] h-full perspective-500 overflow-hidden">
//                 <div className="transform-gpu w-full h-full rotate-x-[80deg] bg-fixed bg-[linear-gradient(#fe53bb_5px,transparent_1px),linear-gradient(90deg,#fe53bb_5px,#2a3459_1px)] bg-[length:50px_50px]">
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
 
export default function BoxesCore({ className, ...rest }: { className?: string }) {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  return (
    <div className="absolute flex justify-center inset-y-[250px] w-screen h-[759px] perspective-500 overflow-hidden">
        <div 
            className="
                transform-gpu
                rotate-x-[50deg]
                 translate-x-[50%]
                absolute
                flex
                justify-center
                w-full
                z-0"
        >
        {rows.map((_, i) => (
            <motion.div
            key={`row` + i}
            className="w-10 h-5 border-l-2 border-x-synthGrid relative"
            >
            {cols.map((_, j) => (
                <motion.div
                key={`col` + j}
                whileHover={{
                    backgroundColor: `#fe53bb`,
                    transition: { duration: 0 },
                }}
                animate={{
                    transition: { duration: 2 },
                }}
                className="w-10 h-5 border-r-2 border-t-2 border-synthGrid relative bg-synthBlack"
                >
                </motion.div>
            ))}
            </motion.div>
        ))}
        </div>
    </div>
  );
};

