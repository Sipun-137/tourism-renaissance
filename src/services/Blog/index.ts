import axios from "axios"
import Cookies from 'js-cookie'

export const AddBlog = async (formData: any) => {
    try {
        const response = await axios.post("/api/blog/add-post", formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const GetAllBlog = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/blog/get-all-data`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const GetUserBlog = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/blog/get-user-posts?id=${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

interface updateData {
    id: string,
    title: string,
    description: string
}

export const UpdateBlog = async (formData: updateData) => {
    try {
        const response = await axios.put(`/api/blog/update-a-blog`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const DeleteBlog = async (id: string) => {
    try {
        const response = await axios.delete(`/api/blog/delete-a-blog?id=${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// export const 