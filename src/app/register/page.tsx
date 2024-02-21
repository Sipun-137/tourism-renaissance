"use client";
import FormInputControls from "@/components/FormInputControl";
import Loading from "@/components/Loading";
import { RegisterCredential, RegisterCredentialItem } from "@/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { registerNewUser } from "@/services/RegisterUser";
import Link from "next/link";
import TextInput from "@/components/inputControl/TextInput";
import SelectInput from "@/components/inputControl/SelectInput";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    name:"",
    password: "",
    role:"customer"
  });
  async function handleLogin() {
    setLoading(true);
    const res = await registerNewUser(formData);
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
        name:"",
        password: "",
        role:""
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
                  Create New Account
                </p>
                <div className="w-full mt-6 mr-0 mb-0 relative space-y-8 ">
                {RegisterCredential.map((item:RegisterCredentialItem) =>
                      item.componentType === "input" ? (
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
                      ) : item.componentType === "select" ? (
                        <SelectInput
                          key={item.id}
                          helper={item.helper}
                          options={item.options}
                          label={item.label}
                          onChange={(event: any) => {
                            setFormData({
                              ...formData,
                              [item.id]: event.target.value,
                            });
                          }}
                          value={formData[item.id]}
                        />
                      ):null
                    )}
                  <div>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="inherit"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      {loading ? <Loading msg="registering" /> : "register"}
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
