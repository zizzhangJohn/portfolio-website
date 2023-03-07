
import reactImage from "../../Assets/frontend/react.svg"
import bootstrapImage from "../../Assets/frontend/bootstrap.svg"
import vueImage from "../../Assets/frontend/vue.svg"
import tailwindImage from "../../Assets/frontend/tailwind.svg"
import typescriptImage from "../../Assets/frontend/typescript.svg"
import dotnetImage from "../../Assets/server/dotnetcore.svg"
import javaImage from "../../Assets/server/java.svg"
import pythonImage from "../../Assets/server/python.svg"
import mssqlImage from "../../Assets/database/mssql.svg"
import mysqlImage from "../../Assets/database/mysql.svg"
import postgresqlImage from "../../Assets/database/postgresql.svg"
import azureImage from "../../Assets/deployment/azure.svg"
import herokuImage from "../../Assets/deployment/heroku.svg"
import netlifyImage from "../../Assets/deployment/netlify.svg"
import firebaseImage from "../../Assets/deployment/firebase.svg"
type cardData = Array<{
    name: string,
    image: string
}>

type props = {
    darkMode: boolean
    sectionId:string
}
function Tech({ darkMode,sectionId }: props) {
    const frontendData = [
        { name: "React", image: reactImage },
        { name: "Vue", image: vueImage },
        { name: "Typescript", image: typescriptImage },
        { name: "Bootstrap", image: bootstrapImage },
        { name: "Tailwind", image: tailwindImage },
    ]

    const serverData = [
        { name: ".Net Core", image: dotnetImage },
        { name: "Java", image: javaImage },
        { name: "Python", image: pythonImage },
    ]

    const dataBaseData = [
        { name: "Mysql", image: mysqlImage },
        { name: "Mssql", image: mssqlImage },
        { name: "Postgresql", image: postgresqlImage },
    ]
    const deploymentData = [
        { name: "Azure", image: azureImage },
        { name: "Heroku", image: herokuImage },
        { name: "Netlify", image: netlifyImage },
        { name: "Firebase", image: firebaseImage },
    ]
    function renderCardData(data: cardData) {
        return data.map(({ name, image }, index) =>
            <div key={index} className="w-fit">
                <img className="w-8 h-8 mx-auto" src={image} alt={name} />
                <div className="text-center">{name}</div>
            </div>
        )
    }
    return (
        <div id={sectionId} className="w-full my-20">
            <h1 className="text-4xl md:text-5xl text-center mb-10">Technologies I use</h1>
            <div className="w-full flex justify-center">
                <div className="grid auto-rows-fr md:grid-rows-2 w-[95%] md:w-[80%] md:grid-cols-2 gap-4">
                    <div className={`card  shadow-2xl ${darkMode ? "bg-neutral" : "bg-base-100"}`}>
                        <div className="card-body">
                            <h2 className="card-title mx-auto">Frontend</h2>
                            <div className="flex gap-5 justify-center flex-wrap my-3">
                                {renderCardData(frontendData)}
                            </div>
                        </div>
                    </div>
                    <div className={`card  shadow-2xl ${darkMode ? "bg-neutral" : "bg-base-100"}`}>
                        <div className="card-body">
                            <h2 className="card-title mx-auto">Server</h2>
                            <div className="flex gap-5 justify-center flex-wrap my-3">
                                {renderCardData(serverData)}
                            </div>
                        </div>
                    </div>
                    <div className={`card  shadow-2xl ${darkMode ? "bg-neutral" : "bg-base-100"}`}>
                        <div className="card-body">
                            <h2 className="card-title mx-auto">DataBase</h2>
                            <div className="flex gap-5 justify-center flex-wrap my-3">
                                {renderCardData(dataBaseData)}
                            </div>
                        </div>
                    </div>
                    <div className={`card  shadow-2xl ${darkMode ? "bg-neutral" : "bg-base-100"}`}>
                        <div className="card-body">
                            <h2 className="card-title mx-auto">Deployment</h2>
                            <div className="flex gap-5 justify-center flex-wrap my-3">
                                {renderCardData(deploymentData)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tech