import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const DefaultLayout = () => {
   const {user,token} =  useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = () => {

    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashbooard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
