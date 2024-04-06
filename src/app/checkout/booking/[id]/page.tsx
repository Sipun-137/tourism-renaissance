"use client";
import TextInput from "@/components/inputControl/TextInput";
import { GlobalContext } from "@/context";
import { userCredentialForm } from "@/utils";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { FormControl, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };
  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
  const router = useRouter();
  const id = params.id;
  const { user, isAuthUser } = useContext(GlobalContext);
  const [formData, setFormData] = useState<any>({
    hotelId: id,
    name: "",
    aadharno: "",
    email: user?.email,
    chkindt: "",
    chkoutdt: "",
    address: "",
  });
  useEffect(() => {
    if (!isAuthUser) {
      router.push("/login");
    }
  }, [isAuthUser]);
  console.log(formData);
  return (
    <>
      <section className="min-h-screen p-8 ">
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]">Ckeckout</p>
          </div>
        </div>

        <div className="grid grid-cols-8 grid-rows-1 gap-4">
          <div className="col-span-4  m-2">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media.istockphoto.com/id/487042276/photo/hotel-sign.jpg?s=612x612&w=0&k=20&c=DjEVAoFnjB2cWwX28cxSKWkxsbze7o9jgkYrhyfmq9E="
                alt=""
              />
            </div>
          </div>
          <div className="col-span-4 col-start-5  m-2">
            <p className="mb-2">information about the guests</p>
            <div className="container">
              <div className="">
                {userCredentialForm.map((item: any) => (
                  <div key={item.id} className="m-1">
                    <TextInput
                      key={item.id}
                      type={item.type}
                      label={item.label}
                      helper={item.helper}
                      placeholder={item.placeholder}
                      onChange={(event: any) => {
                        setFormData({
                          ...formData,
                          [item.id]: event.target.value,
                        });
                      }}
                      value={formData[item.id]}
                    />
                  </div>
                ))}

                {/* form controls for the  */}
                <FormControl className="m-1" fullWidth>
                  <label htmlFor="Address">Address</label>
                  <Textarea
                    aria-label="Address"
                    minRows={3}
                    placeholder="Address"
                    onChange={(event: any) => {
                      setFormData({
                        ...formData,
                        address: event.target.value,
                      });
                    }}
                  />
                </FormControl>
                {/* check in and check out date input */}
                <div className="flex justify-start ">
                  <FormControl className="m-1">
                    <label htmlFor="">check in</label>
                    <input
                      id="chkin-input"
                      type="date"
                      value={formData.chkindt}
                      className="bg-[#b4b1e9a7] border border-black rounded-sm"
                      onChange={(event: any) => {
                        setFormData({
                          ...formData,
                          chkindt: event.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl className="m-1">
                    <label htmlFor="">check out</label>
                    <input
                      type="date"
                      value={formData.chkoutdt}
                      className="bg-[#b4b1e9a7] border border-black rounded-sm"
                      onChange={(event: any) => {
                        setFormData({
                          ...formData,
                          chkoutdt: event.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </div>
                <div className="container shadow-md mt-8 rounded ">
                  <div className="flex justify-between flex-wrap gap-4 items-center">
                    <p className="p-4 uppercase font-sans tracking-[5px]">
                      Ckeckout
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <Typography className="uppercase tracking-wide">
                      price
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <Typography>provider name</Typography>
                    <Typography>₹{2500}</Typography>
                  </div>
                  <div className="p-4">
                    <Button fullWidth variant="outlined" color="inherit">
                      Ckeckout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
