import React from "react";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <FaIcons.FaRegUser />,
        cName: 'nav-text p-3 menu_lable label'
    },
    {
        title: 'Plans',
        path: '/plans',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text p-3 menu_lable label'
    },
    {
        title: 'Templates',
        path: '/templates',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text p-3 menu_lable'
    },
    {
        title: 'Category',
        path: '/category',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text p-3 menu_lable'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text p-3 menu_lable'
    },
    {
        title: "User's",
        path: '/users',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text p-3 menu_lable'
    }, 
    {
        title: 'Settings',
        path: '/settings',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text p-3 menu_lable'
    }, 
    {
        title: 'Profile',
        path: '/profile',
        icon: <FaIcons.FaFileAudio />,
        cName: 'nav-text p-3 menu_lable'
    },
    {
        title: 'Tutorials',
        path: '/tutorials',
        icon: <FaIcons.FaBookMedical />,
        cName: 'nav-text p-3 menu_lable'
    },
    {
        title: 'Text Editor',
        path: '/textEditor',
        icon: <FaIcons.FaBookMedical />,
        cName: 'nav-text p-3 menu_lable'
    }
]