import React from 'react'

function Search() {
    return (
            <div className="relative">
                <div className="flex absolute inset-y-0 pl-2">
                    <img src='https://www.svgrepo.com/show/343280/search.svg' 
                    className="w-5 rotate-90" alt=''/>
                </div>
                <input type="text" className=" focus:w-96 duration-200 focus:outline-none focus:shadow-outline border border-slate-500 text-sm pl-9 block h-8 w-52" placeholder="Search" />
            </div>
    )
}

export default Search