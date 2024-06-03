import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Loader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        console.log(searchParams)

        const code = searchParams.get('code');
        const scope = searchParams.get('scope');
        const authUser = searchParams.get('authuser');
        const prompt = searchParams.get('prompt');
        if (code && scope && authUser && prompt) {

            console.log("Login correcto")
            navigate(`/?code=${code}&scope=${scope}&authuser=${authUser}&prompt=${prompt}`);
        } else {
            setError('No se encontró un token en la URL');
            navigate('/login');
        }

    }, [navigate, location.search]);

    return (
        <div>
            {error && <p>{error}</p>}
            {!error &&
                <div
                    className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
            }
        </div>

    );
}