"use client";
import { Button, Modal, styled, Typography } from "@mui/material";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { firebaseConfig } from "@/utils/firebase";
import { initializeApp } from "firebase/app";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { UploadProfilePicture } from "@/services/LoginUser";
import toast, { Toaster } from "react-hot-toast";
import Blog from "@/components/Blog/Blog";
import { GetUserBlog } from "@/services/Blog";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Page() {
  const { setAuthUser, user, setUser } = useContext(GlobalContext);

  const initialFromData = {
    _id: "",
    imgurl: "",
  };
  const router = useRouter();
  const [formData, setFormData] = useState(initialFromData);
  const [modal, setModal] = useState(false);
  const [imgloading, setimgLoading] = useState(false);
  const [uploadmodal, setUploadmodal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [imgurl, setImgUrl] = useState("");
 
  async function OpenModal() {
    if (!user) return;
    setModal(true);
  }
  function handleClose() {
    setModal(false);
  }
  function handleImageModalClose() {
    setProfileModal(false);
  }
  function uploadmodalClose() {
    setUploadmodal(false);
  }
  function handleLogout() {
    setAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app, process.env.FIREBASEUTILURL as string);
  const createuniquefileName = (getFile: File) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);
    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
  };

  async function helperForUploadingImageToFirebase(file: File) {
    const getFileName = createuniquefileName(file);
    const storageReference = ref(storage, `profile/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downLoadUrl) => resolve(downLoadUrl))
            .catch((error) => reject(error));
        }
      );
    });
  }



  async function handleImage(event: any) {
    setimgLoading(true);
    console.log(event.target.files);
    const imagefile = event.target.files;
    console.log(imagefile.length);
    const extractImageUrl = await helperForUploadingImageToFirebase(
      imagefile[0]
    );
    const newUrl: string = extractImageUrl as string;
    setImgUrl(newUrl);
    setFormData({ ...formData, imgurl: newUrl });
    console.log(formData);
    setimgLoading(false);
  }

  async function uploadImage() {
    const response = await UploadProfilePicture(formData);
    if (response.success) {
      toast.success(response.message);
      setModal(false);
      setUploadmodal(false);
      setFormData({ ...formData, imgurl: "" });
    } else {
      toast.error(response.message);
      setModal(false);
      setUploadmodal(false);
      setFormData({ ...formData, imgurl: "" });
    }
  }


  async function handleEdit(){
    
  }
  useEffect(() => {
    setFormData({ ...formData, _id: user?._id });
  }, [user]);
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <section className="my-8 mx-10 p-4">
        <div className="">
          <div className="flex flex-col md:grid grid-cols-11 grid-rows-5 gap-4">
            {/* user profile image section */}
            <div className="col-span-3 row-span-3">
              {/* to show the avatar of the [erson] */}
              <div className="p-1 aspect-auto items-center justify-center flex">
                <div className="avatar placeholder">
                  <div
                    onClick={OpenModal}
                    className={`rounded-full w-24 lg:w-40 cursor-pointer text-neutral-content ${
                      user?.imgurl
                        ? ""
                        : "border-2 border-blue-800 bg-slate-400 text-gray-600 font-bold font-serif "
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {user?.imgurl ? (
                      //  eslint-disable-next-line @next/next/no-img-element
                      <img src={user?.imgurl} alt="profile img" />
                    ) : (
                      <span className="text-[2rem] lg:text-5xl  ">
                        {user?.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* user profile edit button and logout button */}
            <div className="col-span-2 col-start-10 row-start-1 flex justify-between flex-row gap-6">
              <Button variant="outlined" color="inherit" onClick={handleEdit}>
                <EditNoteSharpIcon />
              </Button>
              <Button onClick={handleLogout} variant="outlined" color="inherit">
                logout
              </Button>
            </div>
            {/*  */}
            <div className="col-span-6 row-span-3 col-start-4 lg:pt-8 ">
              <label htmlFor="username" className="text-sm font-serif">
                Name
              </label>
              <Typography className="lg:text-xl font-serif font-semibold capitalize">
                {user?.name}
              </Typography>
              <label htmlFor="email" className="text-sm font-serif">
                email
              </label>
              <Typography className="lg:text-xl font-serif font-semibold capitalize">
                {user?.email}
              </Typography>
            </div>
            {/*  */}
            <div className="col-span-2 row-span-2 col-start-10 row-start-2">
              <div className="">
                <label htmlFor="role" className="text-sm font-serif">
                  {/* role */}
                </label>
                <Typography className="lg:text-xl font-serif font-semibold capitalize">
                  {/* {user?.role} */}
                </Typography>
              </div>
            </div>
            {/*  */}
            <div className="col-span-11 row-span-2 row-start-4 text-white">
              5
            </div>
          </div>
        </div>
      </section>
      {/* blog post */}
      <section className="min-h-screen">
        <section className="min-h-screen m-8">
          <div className="container mx-auto my-8 px-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <p className="uppercase font-sans tracking-[5px]">Blog post</p>
            </div>
          </div>
          <div className="container mx-auto my-8 px-4">
            <div className="flex flex-col gap-3">
              <Blog id={user?._id} />
            </div>
          </div>
        </section>
      </section>

      {/* view profile modal  and upload modal button */}
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box border-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className=" flex items-center justify-center gap-5">
            {user?.imgurl ? (
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                className="p-2 rounded-xl"
                onClick={() => {
                  setModal(false);
                  setProfileModal(true);
                }}
              >
                View Profile
              </Button>
            ) : null}
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              className="p-2 rounded-xl"
              onClick={() => {
                setModal(false);
                setUploadmodal(true);
              }}
            >
              upload profile picture
            </Button>
          </div>
        </div>
      </Modal>
      {/* view profile modal */}
      <Modal
        open={profileModal}
        onClose={handleImageModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box border-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className=" flex items-center justify-center gap-5">
            {user?.imgurl ? (
              //  eslint-disable-next-line @next/next/no-img-element
              <img src={user?.imgurl} alt="profile img" />
            ) : (
              <span className="text-[2rem] lg:text-5xl  ">
                {user?.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </Modal>
      {/* upload image modal */}
      <Modal
        open={uploadmodal}
        onClose={uploadmodalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box border-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className=" flex items-center justify-center gap-5">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              {imgloading ? "loading" : "upload"}
              <VisuallyHiddenInput type="file" onChange={handleImage} />
            </Button>
            <Button
              hidden={formData.imgurl === ""}
              color="inherit"
              variant="outlined"
              onClick={uploadImage}
            >
              upload
            </Button>
          </div>
        </div>
      </Modal>
      
    </>
  );
}
