import heroImage from "../../Assets/heroImage.jpg"
import AutoTyping from "../AutoTyping"
import {BsGithub} from 'react-icons/bs'
type props={
    sectionId:string
}
function Home({sectionId}:props) {

    return (
        <div id={sectionId} className="hero min-h-screen" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="hero-overlay bg-opacity-[45%]"/>
            <div className="hero-content  text-neutral-content">
                <div className="w-full">
                    <h2 className="md:text-2xl text text-primary-focus">Hi, my name is</h2>
                    <h1 className="mb-2 md:mb-5 text-2xl md:text-5xl font-bold">John Zhang</h1>
                    <h1 className="mb-2 md:mb-5 text-2xl md:text-5xl font-bold text-neutral-300">I'm a full stack developer</h1>
                    <AutoTyping />
                    {/* <h2 className="mb-5 text-xl md:text-2xl text-neutral-300">I work with React</h2> */}
                    <a href="https://github.com/zizzhangJohn" target="_blank"><BsGithub className="text-4xl mx-auto hover:text-secondary" /></a>
                </div>
            </div>
        </div>
    )
}

export default Home