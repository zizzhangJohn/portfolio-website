import { FormEvent, useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';
type props = {
    darkMode: boolean
    sectionId: string
}
function Contact({ darkMode, sectionId }: props) {
    const [msg, setMsg] = useState("");
    const [msgError, setMsgError] = useState("")
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [validation, setValidation] = useState(false);
    const [toast, setToast] = useState(false);
    const [toastSuccess, setToastSuccess] = useState(true);
    useEffect(() => {
        if (toast) {
            setTimeout(() => {
                setToast(false);
            }, 3000);
        }

    }, [toast])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setEmailError("");
        setMsgError("")
        let noError = true;
        if (email.length == 0) {
            setEmailError("Email can't be empty");
            noError = false;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setEmailError("Email is invalid");
            noError = false;
        }
        if (msg.length == 0) {
            setMsgError("Message can't be empty")
            noError = false;
        }
        if (noError) {
            const templateParams = {
                from_name: 'your portfolio website',
                to_name: 'John',
                message: `
                    email: ${email}\n
                    message:${msg}
                `,
            };
            const serviceId = import.meta.env.VITE_SERVICE_ID
            const templateId = import.meta.env.VITE_TEMPLATE_ID
            const publicKey = import.meta.env.VITE_PUBLICKEY
            try {
                const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
                if (import.meta.env.DEV) {
                    console.log('SUCCESS!', response.status, response.text);
                }
                setToastSuccess(true);
                setToast(true);
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.log('FAILED...', error);
                }
                setToastSuccess(false);
                setToast(true);
            }

            resetAll()
        } else {
            setValidation(true);
        }
    }
    function resetAll() {
        setMsg("");
        setEmail("");
        setValidation(false);
        setMsgError("");
        setEmailError("");
    }
    return (
        <div id={sectionId} className='w-full py-20 flex justify-center'>
            <div className='flex flex-col'>
                <div className="mockup-phone border-primary">
                    <div className="camera"></div>
                    <div className="display">
                        <form onSubmit={(e) => handleSubmit(e)} className="artboard artboard-demo phone-1 md:phone-3 bg-slate-100 px-3 h-full">
                            <h1 className="text-4xl text-slate-800 md:text-5xl text-center mb-10">Contact</h1>
                            <input type="text" placeholder="Your email" className={`input  w-full border-2 text-zinc-800 bg-zinc-50 text-xl ${validation && emailError ? "border-red-600" : "mb-3 border-zinc-300"}`}
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                            />
                            <p className='text-red-600 w-full mb-3'>{validation ? emailError : ""}</p>
                            <textarea className={`textarea w-full h-[40%] border-2  bg-zinc-50 text-zinc-800 text-xl ${validation && msgError ? "border-red-600" : "mb-3 border-zinc-300"}`} placeholder="Your message..."
                                value={msg}

                                onChange={e => { setMsg(e.target.value) }}
                            ></textarea>
                            <p className='text-red-600 w-full mb-3'>{validation ? msgError : ""}</p>
                            <button type='submit' className='btn btn-secondary w-full'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="toast toast-end">
                {toast ? <div className={`alert ${toastSuccess ? "alert-success" : "alert-error"} transition-opacity ${toast ? "" : "opacity-0"}`}>
                    <div>
                        <span>{toastSuccess ? "Message sent successfully." : "Something is wrong try again later"}</span>
                    </div>
                </div> : ""}
            </div>

        </div>
    )
}

export default Contact