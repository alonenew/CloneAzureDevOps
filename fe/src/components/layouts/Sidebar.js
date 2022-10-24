import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectOpenLogo, toggleLogo } from '../../store/slices/toggleSlice'
import { selectToken } from '../../store/slices/authSlice';

function Sidebar() {
  const token = useSelector(selectToken);
  const open = useSelector(selectOpenLogo);
  const dispatch = useDispatch();

  const Menus = [
    { title: "Overview", src: "https://cdn.vsassets.io/ext/ms.vss-tfs-web/platform-content/Nav-Dashboard.S24hPD.png"},
    { title: "Board", src:"https://cdn.vsassets.io/ext/ms.vss-work-web/common-content/Content/Nav-Plan.XB8qU6.png" ,link: "boards", gap: true },
    { title: "Repos ", src: "https://cdn.vsassets.io/ext/ms.vss-code-web/common-content/Nav-Code.0tJczm.png" },
    { title: "Pipelines", src: "https://cdn.vsassets.io/ext/ms.vss-build-web/common-library/Nav-Launch.3tiJhd.png" },
    { title: "Test Plans", src: "https://cdn.vsassets.io/ext/ms.vss-test-web/common-content/Nav-Test.CLbC8L.png" },
    { title: "Artifacts ", src: "https://ms.gallerycdn.vsassets.io/extensions/ms/azure-artifacts/19.209.0.1217230287/1663176925682/root/img/artifacts-icon.png" , gap: true },
  ];

  return (
    <>
      {token && <div className={` ${open ? " w-65" : "w-12"} duration-400`}>
        <div className={`relative flex flex-col justify-between min-h-[calc(100vh-48px)] h-full border border-gray-300 overflow-auto shadow bg-gray-200 `}
        >
          <div className={`w-full ${open ? "flex items-center py-1 pr-2" : ""}`}>
            <div className={`flex items-center duration-200 ${!open ? "mx-auto" : "mr-auto"}`}> 
              <img src={`https://www.svgrepo.com/show/349488/react.svg`} alt="" className='rounded-md w-6 h-6 m-2.5' /> 
              <span className={`${!open && "hidden"} font-bold duration-200`} >
                Miniproject
              </span>
            </div>
            <img src="https://www.svgrepo.com/show/327597/add.svg" width={26} height={26} alt="" className={`cursor-pointer ${open ? "ml-auto" : "mx-auto my-3"}`}/>
          </div>
            <ul className="flex-grow">
              {Menus.map((Menu, index) => (
                <Link to={Menu.link} className={`py-1 flex justify-center items-center rounded-md hover:bg-gray-300 `} key={index}>
                  <li className={`text-sm flex items-center duration-200 ${!open ? "mx-auto" : "mr-auto"}`} >
                    <img src={`${Menu.src}`} alt="" className='w-6 h-6 m-2.5' />
                    <span className={`${!open && "hidden"} duration-200`} >
                      {Menu.title}
                    </span>
                  </li>
                  <hr />
                </Link>
              ))}
            </ul>
            <div className={`w-full ${open ? "flex items-center py-2 pr-2" : ""}`}>
              <div className={`flex items-center duration-200 `}> 
                  <img src="https://www.svgrepo.com/show/391537/setting-o.svg" alt="" className={`w-4 h-4  ${!open ? "mx-auto my-3" : "m-2.5"}`}  />
                  {open && <span className={`duration-200 text-sm`} >Project Setting</span>}
                </div>
                <svg onClick={() => dispatch(toggleLogo())}
                  className={`w-6 ${open ? "ml-auto rotate-180" : "mx-auto my-3"}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                </svg>
            </div>
        </div>
      </div>}
    </>
  );
}


export default Sidebar