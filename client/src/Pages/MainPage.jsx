import {useEffect, useState} from "react";
import Loading from "../Components/Loading";

const fetchUserContext = (token) => {
    return fetch("api/user/context",
        {
            method: "GET",
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        }
    ).then(res => res.json());
}

const MainPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [userContext, setUserContext] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        fetchUserContext(token).then(resp => {
            setUserContext(resp);
            console.log(resp)
            setLoading(false)
        })
    }, [])

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div>
            <h1>Welcome {userContext.name}!</h1>
        </div>
    )
}

export default MainPage;