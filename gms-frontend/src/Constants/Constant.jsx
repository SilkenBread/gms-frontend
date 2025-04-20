import { Slide } from "@mui/material";
import axios from "axios";
import { forwardRef } from "react";

const getCart = async (setProceed, setCart, authToken) => {
    if (setProceed) {
        const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setCart(data);
    }
}
const handleLogOut = (setProceed, toast, navigate, setOpenAlert) => {
    if (setProceed) {
        localStorage.removeItem('Authorization')
        toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
        navigate('/')
        setOpenAlert(false)
    }
    else {
        toast.error("User is already logged of", { autoClose: 500, theme: 'colored' })
    }
}

const handleClickOpen = (setOpenAlert) => {
    setOpenAlert(true);
};

const handleClose = (setOpenAlert) => {
    setOpenAlert(false);
};


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





export { getCart, handleClickOpen, handleClose, handleLogOut, Transition }