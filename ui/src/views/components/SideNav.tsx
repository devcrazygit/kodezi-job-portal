import { Link } from "react-router-dom";

const SideNav = () => {

    return (
        <div className={"flex-none w-2/12 menu min-h-screen bg-zinc-800"}>
            <div className="bg-zinc-800 p-2">
                <div className="flex items-center flex-col space-y-2 rounded p-2 _bg-gray-400/90">
                    <div className="h-7 w-7 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-5 text-gray-500" viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="ic_fluent_person_24_filled" fill="currentColor" fillRule="nonzero">
                                    <path d="M17.7541747,13.999921 C18.9961948,13.999921 20.0030511,15.0067773 20.0030511,16.2487975 L20.0030511,17.1672553 C20.0030511,17.7406209 19.8238304,18.2996465 19.4904678,18.7661395 C17.9445793,20.9293884 15.4202806,22.0010712 12,22.0010712 C8.57903185,22.0010712 6.05606966,20.9289147 4.51390935,18.7645697 C4.18194679,18.2986691 4.00354153,17.7408416 4.00354153,17.1687745 L4.00354153,16.2487975 C4.00354153,15.0067773 5.0103978,13.999921 6.25241795,13.999921 L17.7541747,13.999921 Z M12,2.0046246 C14.7614237,2.0046246 17,4.24320085 17,7.0046246 C17,9.76604835 14.7614237,12.0046246 12,12.0046246 C9.23857625,12.0046246 7,9.76604835 7,7.0046246 C7,4.24320085 9.23857625,2.0046246 12,2.0046246 Z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="text-gray-100 text-center">
                        <p className="text-sm font-semibold">
                            Name
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <nav>
                    <ul>
                        <li>
                            <Link className="flex p-1 align-center cursor-pointer py-4 px-4 bg-blue-500 hover:bg-blue-300" 
                                to="/"
                            >
                                <span className="font-bold ml-2 text-white">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className="flex p-1 align-center cursor-pointer py-4 px-4 bg-zinc-800 hover:bg-blue-300" 
                                to="/"
                            >
                                <span className="font-bold ml-2 text-white">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div> 
    )
}
export default SideNav;