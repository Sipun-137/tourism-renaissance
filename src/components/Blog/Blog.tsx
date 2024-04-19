import { DeleteBlog, GetUserBlog, UpdateBlog } from "@/services/Blog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Blog(id:string|any) {
  const router=useRouter();
  const [editmodal, setEditModal] = useState(false);
  const [confmodal, setConfModal] = useState(false);
  const [blogposts,setBlogData]=useState([])
  const initialEditFormData = {
    id: "",
    title: "",
    description: "",
  };
  async function getPostData(){
    const fetchedData=await GetUserBlog(id.id);
    setBlogData(fetchedData.data)
  }
  useEffect(()=>{
    console.log(id.id)
    if(id.id!==null){
      getPostData();
    }
  },[id])


  const [editFormData, setEditFormData] = useState(initialEditFormData);
  function editmodalClose() {
    setEditFormData(initialEditFormData);
    setEditModal(false);
  }
  function confModalClose(){
    setEditFormData(initialEditFormData);
    setConfModal(false);
  }
  const updatePost = async () => {
    console.log(editFormData);
    const res = await UpdateBlog(editFormData);
    if (res.success) {
      toast.success(res.message);
      setEditModal(false);
      router.refresh();
      // window.location.reload();
    } else {
      toast.error(res.message);
    }
  };
  const deletePost=async()=>{
    const res=await DeleteBlog(editFormData.id);
    console.log(res);
    if(res.success){
      toast.success(res.message);
      confModalClose();
      router.refresh();
      // window.location.reload();
    }else{
      toast.error(res.message);
      confModalClose();
    }
  }
  console.log(blogposts)
  return (
    <>
      <Toaster position="top-right" />
      {blogposts && blogposts.map((item: any, index: number) => (
        <div
          key={index}
          className="rounded-md border-b-2 border-sky-300 bg-slate-500 p-4 shadow-md"
        >
          <div id="title" className="flex justify-between">
            <p className="font-mono font-semibold text-emerald-950">
              {item.title}
            </p>
            {/* drop down for edit of the posts */}
            <div>
              <div className="dropdown">
                <Button className="text-white">
                  <MoreVertIcon />
                </Button>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box flex gap-2  right-6 "
                >
                  <li>
                    <Button
                      size="small"
                      className="text-white"
                      variant="outlined"
                      onClick={() => {
                        setEditFormData({
                          ...editFormData,
                          id: item._id,
                          title: item.title,
                          description: item.description,
                        });
                        setEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="small"
                      className="text-white"
                      variant="outlined"
                      onClick={() => {
                        setEditFormData({ ...editFormData, id: item._id });
                        setConfModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* details section */}
          <div>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
      {/* edit modal */}
      <Modal
        open={editmodal}
        onClose={editmodalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box border-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className=" flex items-center justify-center gap-5">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <p className="uppercase font-sans tracking-[5px] text-white">
                Edit Post
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p>{editFormData?.id}</p>
            <input
              value={editFormData.title}
              className="p-2 bg-white rounded-md m-2"
              onChange={(e) => {
                setEditFormData({ ...editFormData, title: e.target.value });
              }}
            />

            <textarea
              value={editFormData.description}
              rows={6}
              className="p-2 bg-white rounded-md m-2 text-black"
              onChange={(e) => {
                setEditFormData({
                  ...editFormData,
                  description: e.target.value,
                });
              }}
            />

            <Button
              variant="outlined"
              fullWidth
              color="success"
              className=""
              onClick={updatePost}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>

      {/* confirmation modal for deletetion */}
      <Modal
        open={confmodal}
        onClose={confModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box border-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className=" flex items-center justify-center gap-5">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <p className="uppercase font-sans tracking-[5px] text-white">
                delete post
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Typography className="text-center font-mono p-5 text-white uppercase tracking-wider">
              do you want to delete the post
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              color="error"
              className=""
              onClick={deletePost}
            >
             DELETE
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
