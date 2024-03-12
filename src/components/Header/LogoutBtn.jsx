import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/slices/authSlice"
const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logOutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
