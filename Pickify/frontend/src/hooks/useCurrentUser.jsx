import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUser, setLoading, setError } from '../redux/userSlice'

const useCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCurrentUser = async () => {
            dispatch(setLoading(true))
            try {
                const res = await axios.get(`${serverUrl}/api/user/current-user`, {
                    withCredentials: true
                })
                dispatch(setUser(res.data))
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    dispatch(setUser(null))
                } else {
                    console.error("Error fetching current user:", err)
                    dispatch(setError(err.message))
                }
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchCurrentUser()
    }, [dispatch])
}

export default useCurrentUser