"use client";
import { Box, Button, Modal, Typography } from "@mui/material";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import { Fragment, useContext, useState } from "react";
import { GlobalContext } from "@/context";
import { Height } from "@mui/icons-material";

export default function Page() {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { user } = useContext(GlobalContext);
  const [modal, setModal] = useState(false);
  async function OpenModal() {
    if (!user) return;
    setModal(true);
  }
  function handleClose() {
    setModal(false);
  }

  return (
    <>
      <section className="my-8 mx-10 p-4 h-screen">
        <div className="">
          <div className="flex flex-col md:grid grid-cols-11 grid-rows-5 gap-4">
            <div className="col-span-3 row-span-3">
              {/* to show the avatar of the [erson] */}
              <div className="p-1 aspect-auto items-center justify-center flex">
                <div className="avatar placeholder">
                  <div
                    onClick={OpenModal}
                    className={`rounded-full w-24 lg:w-40 text-neutral-content ${
                      user?.imgurl
                        ? ""
                        : "border-2 border-blue-800 bg-slate-400 text-gray-600 font-bold font-serif "
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {user?.imgurl ? (
                      //  eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="profile img"
                      />
                    ) : (
                      <span className="text-[2rem] lg:text-5xl  ">
                        {user?.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 col-start-10 row-start-1">
              <Button fullWidth variant="outlined" color="inherit">
                <EditNoteSharpIcon />
              </Button>
            </div>
            <div className="col-span-6 row-span-3 col-start-4">2</div>
            <div className="col-span-2 row-span-2 col-start-10 row-start-2">
              3
            </div>
            <div className="col-span-11 row-span-2 row-start-4">5</div>
          </div>
        </div>
      </section>

      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <div>
              <Button>show image</Button>
              <Button>upload image</Button>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
}
