import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GoogleSuccess(){
 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        console.log("Token from URL: ", token);

        if(token){
            localStorage.setItem("token", token);
            navigate("/dashboard");
        }
        else{
            navigate("/login");
        }
    }, [location, navigate]);

    return(
        <>
            <h>Logging you in...</h>
        </>
    );
}

export default GoogleSuccess;