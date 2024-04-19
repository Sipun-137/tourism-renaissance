"use client";
import { GlobalContext } from "@/context";
import { AllBooking, CancelBooking } from "@/services/Booking";
import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionActions, Button, Chip, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useContext(GlobalContext);
  const router = useRouter();
  const id = user?._id;
  const [bookingdata, setBookingdata] = useState<any>([]);
  async function handleCancel(id: string) {
    const data = {
      id: id,
    };
    const res = await CancelBooking(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }
  async function collectdata(id: string) {
    const data = await AllBooking(id);
    setBookingdata(data.data);
  }
  useEffect(() => {
    if (user !== null) {
      collectdata(id);
    }
  }, [user, id]);
  console.log(bookingdata);
  return (
    <>
      <Toaster position="top-right" />
      <section className="min-h-screen p-8">
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]">Ckeckout</p>
          </div>
        </div>
        <div className="container mx-auto my-8 px-4 ">
          <div className="flex flex-col gap-y-4">
            {bookingdata.map((item: any, index: number) => (
              <div key={index}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel1-content${index}`}
                    id={item.id}
                  >
                    <Typography>{item.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="m-8">
                      <div className="flex justify-between">
                        <Typography> Hotel Name:</Typography>
                        <Typography> {item.hotelName}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography> checkIn Date:</Typography>
                        <Typography> {item.CheckInDate}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography> checkOut Date:</Typography>
                        <Typography> {item.CheckOutDate}</Typography>
                      </div>
                      <div className="flex gap-3 m-2">
                        <Chip label={item.status} variant="outlined" />
                      </div>
                    </div>
                  </AccordionDetails>
                  <AccordionActions>
                  
                    <div className="">
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => {
                          handleCancel(item._id);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    
                  </AccordionActions>

                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
