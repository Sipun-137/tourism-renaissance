import BlogPost from "@/models/BlogPostModel"

export const navOptions = [
    {
        id: "hotel",
        label: "hotel",
        path: "/u/hotel"
    }, {
        id: 'restaurant',
        label: 'restaurant',
        path: '/u/restaurant'
    },
    {
        id: 'attraction',
        label: 'attraction',
        path: '/u/attraction'
    },
    {
      id:"blog",
      label:"blog",
      path:"/u/blog"  
    },
    // {
    //     id: 'dashboard',
    //     label: 'dashboard',
    //     path: '/dashboard'
    // }
]

export const adminNavOptions = [
    {
        id: "bookings",
        label: "bookings",
        path: "/admin/booking"
    },
    {
        id:"blogs",
        label:"blogs",
        path:"/admin/blogs"
    }
    ,{
        id: "test",
        label: "test",
        path: "/test"
    }
]

export const dropdownMenu = [
    {
        id: "hotel",
        label: "hotel",
        path: "/u/hotel"
    }, {
        id: 'restaurant',
        label: 'restaurant',
        path: '/u/restaurant'
    },
    {
        id: 'attraction',
        label: 'attraction',
        path: '/u/attraction'
    }
]

