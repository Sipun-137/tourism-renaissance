"use client";
import TextInput from "@/components/inputControl/TextInput";
import { GlobalContext } from "@/context";
import { userCredentialForm } from "@/utils";
import { FormControl, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GetHotelData } from "@/services/Data/getHotelData";
import { CreateBooking } from "@/services/Booking";
import toast, { Toaster } from "react-hot-toast";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  const initialFormData = {
    userID: "",
    hotelId: id,
    name: "",
    hotelName:"name",
    aadharNo: "",
    email: "",
    ContactNo: "",
    CheckInDate: "",
    CheckOutDate: "",
    address: "",
    price: 0,
    status:"booked"
  };
  const { user, isAuthUser } = useContext(GlobalContext);
  const [data, setData] = useState<any>(null);
  async function getData() {
    const hdata = await GetHotelData(id);
    setData(hdata.data);
    console.log("data fetching useeffect hook");
  }

  const [formData, setFormData] = useState<any>(initialFormData);
  const formatDate = (dateString: string)=> {
    // Assuming dateString is in yyyy-mm-dd format (default for input type 'date')
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`
  };

  async function handleBooking() {
    setFormData({ ...formData, CheckInDate: formatDate(formData.CheckInDate)});
    setFormData({ ...formData, CheckOutDate: formatDate(formData.CheckOutDate)});
    const res = await CreateBooking(formData);
    if (res.success) {
      toast.success(res.message);
      // setFormData(initialFormData);
      router.push("/u/my-booking");
    } else {
      // setFormData(initialFormData);
      setUserData();
      toast.error(res.message);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);



  function setUserData(){
    setFormData({ ...formData, email: user?.email, userID: user?._id });
  }

  useEffect(() => {
    if (data === null) {
      setFormData({ ...formData, price: 2500 });
    }
    setFormData({ ...formData, email: user?.email, userID: user?._id });
    if (data !== null) {
      setFormData({ ...formData, price: data?.price.displayPrice,hotelName:data?.title });
    }
  }, [isAuthUser, user, data]);

  console.log(formData);
  return (
    <>
      <Toaster position="top-right" />
      <section className="min-h-screen p-8 ">
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]"></p>
          </div>
        </div>

        <div className="grid grid-cols-8 grid-rows-1 gap-4">
          <div className="col-span-4  m-2">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  data !== null
                    ? data?.photos[0].urlTemplate.replace(
                        "?w={width}&h={height}&s=1",
                        ""
                      )
                    : "https://media.istockphoto.com/id/487042276/photo/hotel-sign.jpg?s=612x612&w=0&k=20&c=DjEVAoFnjB2cWwX28cxSKWkxsbze7o9jgkYrhyfmq9E="
                }
                alt="image"
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

                {/* check in and check out date input */}
                <div className="flex justify-start ">
                  <FormControl className="m-1">
                    <label htmlFor="">check in</label>
                    <input
                      id="chkin-input"
                      type="date"
                      value={formData.CheckInDate}
                      className="bg-[#b4b1e9a7] border border-black rounded-sm"
                      onChange={(event: any) => {
                        setFormData({
                          ...formData,
                          CheckInDate: event.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl className="m-1">
                    <label htmlFor="">check out</label>
                    <input
                      type="date"
                      value={formData.CheckOutDate}
                      className="bg-[#b4b1e9a7] border border-black rounded-sm"
                      onChange={(event: any) => {
                        setFormData({
                          ...formData,
                          CheckOutDate: event.target.value,
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
                    <Typography>
                      {data && data.price.providerName
                        ? data.price.providerName
                        : "provider"}
                    </Typography>
                    <Typography>
                      {data && data.price.displayPrice
                        ? data.price.displayPrice
                        : "in progress"}
                    </Typography>
                  </div>
                  <div className="p-4">
                    <Button
                      fullWidth
                      variant="outlined"
                      color="inherit"
                      // disabled={data && data.price.displayPrice ? false : true}
                      onClick={() => {
                        handleBooking();
                      }}
                    >
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
