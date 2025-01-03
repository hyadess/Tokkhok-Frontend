import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../css/Toast.css';


const showtoast = (type, text) => {
    toast(text, {
        type: type, // Use `type` directly without curly braces
        position: 'top-right',
        autoClose: 2000, // Timeout in milliseconds
        hideProgressBar: false,
        className: 'toast-container',
        bodyClassName: 'toast-body',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => toast.dismiss(), // Ensures the toast is dismissed properly
    });
};






export default showtoast;