"use client";
import FormInputControls from "@/components/FormInputControl";
import Loading from "@/components/Loading";
import { loginUserData } from "@/services/LoginUser";
import { LoginCredentials } from "@/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  async function handleLogin() {
    setLoading(true);
    const res = await loginUserData(formData);
    console.log(res);
    if (res.success) {
      setFormData({
        email: "",
        password: "",
      });
      toast.success(res.message);
      router.push("/");
      setLoading(false);
    } else {
      toast.error(res.message);
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  }
  console.log(formData);
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
      <div className=" relative m-8">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 ,t-8 mr-auto xl:px-5 lg:flex-row  ">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-center pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl relative z-10 rounded-xl ">
                <p className="w-full text-4xl font-medium text-center font-serif">
                  Login to Account
                </p>
                <div className="w-full mt-6 mr-0 mb-0 relative space-y-8 ">
                  {LoginCredentials.map((item: any) => (
                    <div key={item.id}>
                      <FormInputControls
                        obj={item}
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
                  <div>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="inherit"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      {loading ? <Loading msg="loading" /> : "login"}
                    </Button>
                  </div>
                  <div className=" ">
                    <p className="font-serif text-black">New to Website</p>
                    <Button
                      onClick={() => router.push("/register")}
                      fullWidth
                      variant="outlined"
                      className="rounded-md tracking-[8px] font-serif text-black"
                    >
                      register
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
