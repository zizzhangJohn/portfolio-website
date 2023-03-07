import { BsGithub } from 'react-icons/bs'
import { IoEyeSharp } from 'react-icons/io5'
import projectData from './projectData'

type props = {
    darkMode: boolean
    sectionId: string
}
function Projects({ darkMode, sectionId }: props) {
    return (
        <div id={sectionId} className={`w-full py-20 ${darkMode ? "bg-neutral-focus" : "bg-base-200"} `}><h1 className="text-4xl md:text-5xl text-center mb-10">Projects</h1>

            <div className="w-full mx-auto flex justify-center ">
                <div className="grid auto-rows-fr w-[95%] md:w-[80%] md:grid-cols-2 gap-4">
                    {projectData.map((p, index) =>
                        <div key={index} className={`card shadow-2xl ${darkMode ? "bg-neutral" : "bg-base-100"}`}>
                            <div className="card-body">
                                <h2 className="card-title">{p.name}</h2>
                                <p>{p.des}</p>
                                <div className="card-actions justify-start">
                                    {p.tags.map((t, i) =>
                                        <div key={i} className="badge badge-outline">{t}</div>
                                    )}
                                </div>
                                <div className="flex items-start gap-5 text-2xl">
                                    <a href={p.github} target="_blank"><BsGithub className='hover:text-secondary' /></a>
                                    <a href={p.demo} target="_blank"><IoEyeSharp className='hover:text-secondary' /></a>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Projects