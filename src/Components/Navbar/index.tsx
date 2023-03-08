import { useEffect, useRef, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

type props = {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    sectionScrollIds: Array<string>
}
function Navbar({ setDarkMode, darkMode, sectionScrollIds }: props) {
    const navs = ["Home", "Tech", "Projects", "Contact"]
    const [menuShow, setMenuShow] = useState(false);
    const [navbarTransparent, setNavbarTransparent] = useState(true);
    const mobileMenuRef = useRef<HTMLUListElement>(null)
    const burgerRef = useRef<HTMLDivElement>(null)

    function handleMenuShow(e: React.MouseEvent) {
        e.stopPropagation();
        setMenuShow(pre => !pre);
    }
    /*
    click outside to close menu
    */
    useEffect(() => {
        let mouseClickHandler = (e: MouseEvent) => {
            // click outside excluding the burger icon
            if (!burgerRef.current?.contains(e.target as Node) && !mobileMenuRef.current?.contains(e.target as Node)) {
                setMenuShow(false);
            }
        }
        document.addEventListener("mousedown", mouseClickHandler);
        window.addEventListener('scroll', changeNavBg)
        return () => {
            document.removeEventListener("mousedown", mouseClickHandler);
            window.removeEventListener('scroll', changeNavBg)

        }
    })
    function changeNavBg() {
        if (window.scrollY >= 80) {
            setNavbarTransparent(false);
        } else { setNavbarTransparent(true) }
    }
    function handleScrollSection(sectionId: string) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    return (
        <div className={`navbar  px-5 md:px-11 drop-shadow-lg fixed top-0 z-50 ${navbarTransparent ? "bg-transparent" : "bg-base-100"}`}>
            <div className="navbar-start">
                <a className={`normal-case text-2xl font-extrabold hover:text-secondary ${navbarTransparent ? "text-neutral-content" : ""}`}
                    onClick={() => handleScrollSection(sectionScrollIds[0])}
                >&#123;
                    <span className='text-primary hidden md:inline'>John</span>
                    <span className='text-secondary hidden md:inline'>Zhang</span>
                    <span className='text-primary md:hidden'>J</span>
                    <span className='text-secondary md:hidden'>Z</span>
                    &#125;
                </a>
            </div>
            <ul className="navbar-center hidden md:flex ">
                {navs.map((nav, index) => <li className={`p-4 font-semibold hover:text-secondary ${navbarTransparent ? "text-neutral-content" : ""}`} key={index} onClick={() => handleScrollSection(sectionScrollIds[index])}>{nav}</li>)}
            </ul>
            <div className={`md:navbar-end ${navbarTransparent ? "text-neutral-content" : ""}`}>
                {darkMode ?
                    <MdOutlineLightMode className='text-2xl hover:text-secondary' onClick={() => setDarkMode(pre => !pre)} />
                    :
                    <MdOutlineDarkMode className='text-2xl hover:text-secondary' onClick={() => setDarkMode(pre => !pre)} />
                }
            </div>
            {/* mobile menu and burger */}
            <div className={`navbar-end md:hidden ${navbarTransparent ? "text-neutral-content" : ""}`} ref={burgerRef}><GiHamburgerMenu onClick={(e) => handleMenuShow(e)} /></div>
            <ul className={`z-40 flex-col md:hidden absolute left-0  bg-base-100 w-full ${menuShow ? "top-[100%]" : "hidden"} `}
                ref={mobileMenuRef}
            >
                {navs.map((nav, index) => <li className="py-2 text-center w-full border-b-2 border-slate-200 hover:bg-primary" key={index} onClick={() => {
                    setMenuShow(false);
                    handleScrollSection(sectionScrollIds[index])
                }}>{nav}</li>)}
            </ul>
        </div>
    )
}

export default Navbar