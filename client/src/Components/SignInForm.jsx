import {useState} from "react";

const UserForm = ({user, disabled, onSave}) => {

    const [username, setUsername] = useState(user?.username ?? "");
    const [password, setPassword] = useState(user?.password ?? "");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({username: username, password: password});
    }

    return <>
        <form className="EmployeeForm" onSubmit={handleSubmit}>
            <div className="control">
                <label htmlFor="username">Username:</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    id="username"
                />
            </div>
            <div className="control">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                />
            </div>
            <div className="buttons">
                <button type="submit" disabled={disabled}>
                    Sign in
                </button>
            </div>
        </form>
    </>
}

export default UserForm;