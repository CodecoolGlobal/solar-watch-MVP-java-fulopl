import UserForm from "../Components/UserForm";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Loading from "../Components/Loading";

const registerUser = (user) => {
    return fetch("/api/user/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(res => res.statusText);
}

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const handleRegister = (user) => {
        setLoading(true);
        registerUser(user).then(() => {
                setLoading(false);
                alert("Account created.");
                navigate("/");
            }
        );
    }

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="container-main">
            <div className="textbox-main">
                <h2>Registration</h2>
                <UserForm
                    user={{username: "username"}}
                    disabled={isLoading}
                    onSave={handleRegister}
                />
            </div>
        </div>
    );
}

export default RegistrationPage;