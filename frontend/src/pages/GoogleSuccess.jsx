import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GoogleSuccess(){
 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if(token){
            localStorage.setItem("token", token);
            navigate("/dashboard");
        }
        else{
            navigate("/login");
        }
    }, []);

    return(
        <>
            <h2>Logging you in...</h2>
        </>
    );
}

export default GoogleSuccess;