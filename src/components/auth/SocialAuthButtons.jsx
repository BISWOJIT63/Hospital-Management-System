import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SocialAuthButtons = () => {
    return (
        <div className="flex flex-col gap-3 mt-6">
            <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
                <FcGoogle size={20} />
                Continue with Google
            </motion.button>

            <motion.button
            onClick={()=>{window.location.href="https://www.freepik.com/free-vector/fuck-you-symbol-comic-style_10296883.htm#fromView=keyword&page=1&position=1&uuid=6fa19cb1-3319-4088-ac30-64de43b25494&query=Fuck+you+symbol"}}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#1877F2] text-white rounded-lg font-medium hover:bg-[#166fe5] transition-colors shadow-sm"
            >
                <FaFacebook size={20} />
                Continue with Facebook
            </motion.button>
        </div>
    );
};

export default SocialAuthButtons;
