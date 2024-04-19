"use client";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface reviewType {
  title: string;
  text: string;
  bubbleRatingText: string;
  publishedDate: string;
  userProfile: {
    deprecatedContributionCount: string;
    avatar: { maxHeight: number; maxWidth: number; urlTemplate: string };
  };
  photos: any;
}

export default function Details({ details, hid }: any) {
  const router = useRouter();
  const [imgurl, setImgurl] = useState("");
  useEffect(() => {
    let newurl = details?.photos[0].urlTemplate.replace(
      "?w={width}&h={height}&s=1",
      ""
    );
    setImgurl(newurl);
  }, [details]);
  return (
    <>
      <section className="container mx-auto max-w-screen-xl min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4">
          <div className="lg:col:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg ">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-full w-full max-w-full object-cover"
                      src={imgurl}
                      alt="Product Details"
                    />
                  </div>
                </div>
                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0 h-80 overflow-visible overflow-y-scroll ">
                  <div className="flex flex-row items-start lg:flex-col  ">
                    {details?.photos.map((item: any, index: number) => (
                      <button
                        key={index}
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2
                    border-gray-100 text-center"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.urlTemplate.replace(
                            "?w={width}&h={height}&s=1",
                            ""
                          )}
                          alt="Product Deatils"
                          className="h-full w-full object-cover"
                          onClick={() => {
                            setImgurl(
                              item.urlTemplate.replace(
                                "?w={width}&h={height}&s=1",
                                ""
                              )
                            );
                          }}
                        />
                      </button>
                    ))}
                    <button
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2
                    border-gray-100 text-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgurl}
                        alt="Product Deatils"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className=" font-bold text-gray-900 capitalize text-2xl">
                {details && details.title}
              </h1>
              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h2 className="text-red-400">
                    {details && details.price.strikeThroughPrice}
                  </h2>
                  <h1 className="text-3xl font-bold">
                    ₹{details && details.price.displayPrice}
                  </h1>
                  <p className="text-sm">{details && details.price.status}</p>
                  {/* <p
                    className={`mr-3 font-semibold  ${
                      item.onsale === "yes"
                        ? "line-through text-3xl "
                        : " text-3xl"
                    }`}
                  >{`₹ ${item.price}`}</p>
                  {item.onsale === "yes" ? (
                    <p className="mr-3 text-3xl font-semibold text-red-700">{`${
                      item.price - item.price * (item.priceDrop / 100)
                    }`}</p>
                  ) : null} */}
                </div>
                <Button
                  type="button"
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
                  onClick={() => {
                    router.push(`/checkout/booking/${hid}`);
                  }}
                >
                  Book Now
                </Button>
              </div>
              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-gray-600">
                  {/* {item && details.deliveryinfo} */}
                </li>
                <li className="flex items-center text-left text-sm font-gray-600">
                  Cancel Any Time
                </li>
              </ul>
              <div className="lg:col-span-3 mt-8">
                <div className=" border-b border-ray-400">
                  <p className="border-b-2 border-[#1b1f1f] py-4 text-sm font-medium text-gray-900">
                    Location
                  </p>
                </div>
                <div className=" flow-root sm:mt-12">
                  {/* {item && item.description} */}
                  <Typography className="font-semibold">
                    {details.location?.title}
                  </Typography>
                  <div>
                    <Typography className="text-sm ">
                      {details.location?.address}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm tracking-wide font-semibold">
                      {details.location?.gettingThere?.title}
                    </Typography>

                    <div>
                      {details.location?.gettingThere?.content?.map(
                        (item: string, index: number) => (
                          <Chip key={index} label={item} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider
          orientation="horizontal"
          className="m-6 border-black "
          sx={{ opacity: "0.8", color: "#ff0000" }}
        />

        {/* amenitiesScreen */}
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]">
              amenities Screen
            </p>
          </div>
          <div className="p-2 m-2 shadow-lg flex flex-wrap justify-between gap-1 items-center">
            {details?.amenitiesScreen.map((item: any, index: number) => (
              <div key={index} className=" p-2 rounded-sm ">
                <Chip key={index} label={item.title} size="small" />
                {/* <div className="flex gap-1">
                  {item?.content.map((contentdata: string, indexn: number) => (
                    <Chip key={indexn} label={contentdata} size="small" />
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* review section */}
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]">Reviews</p>
          </div>
          <div className="p-2 m-2 shadow-lg">
            {details?.reviews.content.map((item: reviewType, index: number) => (
              <div key={index} className="p-2 m-2 rounded-lg ">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="text-center"
                  >
                    <div className="flex justify-start items-center">
                      <Avatar
                        className="mx-4"
                        alt="Remy Sharp"
                        src={item.userProfile?.avatar.urlTemplate.replace(
                          "?w={width}&h={height}&s=1",
                          ""
                        )}
                      />
                      {item.title}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.text}</Typography>
                    <div className="flex gap-3 m-2">
                      <Chip
                        label={item.bubbleRatingText}
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        label={item.publishedDate}
                        variant="outlined"
                        size="small"
                      />
                    </div>
                    <div></div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
        {/*  restaurants nearby*/}
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]">
              {details?.restaurantsNearby.sectionTitle}
            </p>
          </div>
          <div className="flex flex-row  mt-8 gap-4 overflow-y-auto data">
            {details?.restaurantsNearby.content.map(
              (content: any, index: number) => (
                <div key={index}>
                  <Card sx={{ width: 345 }} className="">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={
                        content.cardPhoto?.urlTemplate
                          ? content.cardPhoto?.urlTemplate.replace(
                              "?w={width}&h={height}&s=1",
                              ""
                            )
                          : "https://www.8ways.ch/application/files/9415/0874/4507/restaurant_1.jpeg"
                      }
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {content.title}
                      </Typography>
                      <Chip label={content.primaryInfo} variant="outlined" />

                      <div className="flex justify-between">
                        <Rating
                          value={Number(content.bubbleRating.rating)}
                          readOnly
                        />
                        <Typography gutterBottom variant="subtitle1">
                          out of {content.bubbleRating.numberReviews} review
                        </Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography gutterBottom variant="subtitle1">
                          Distance
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          {content.distance}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
        {/* attractions nearby */}
        <div className="container mx-auto my-8 px-4">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <p className="uppercase font-sans tracking-[5px]">
              {details?.attractionsNearby.sectionTitle}
            </p>
          </div>
          <div className="flex flex-row  mt-8 gap-4 overflow-y-auto data ">
            {details?.attractionsNearby.content.map(
              (content: any, index: number) => (
                <div key={index}>
                  <Card sx={{ width: 345 }} className="">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={
                        content.cardPhoto?.urlTemplate
                          ? content.cardPhoto?.urlTemplate.replace(
                              "?w={width}&h={height}&s=1",
                              ""
                            )
                          : "https://www.8ways.ch/application/files/9415/0874/4507/restaurant_1.jpeg"
                      }
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {content.title}
                      </Typography>
                      <Chip label={content.primaryInfo} variant="outlined" />

                      <div className="flex justify-between">
                        <Rating
                          value={Number(content.bubbleRating.rating)}
                          readOnly
                        />
                        <Typography gutterBottom variant="subtitle1">
                          out of {content.bubbleRating.numberReviews} review
                        </Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography gutterBottom variant="subtitle1">
                          Distance
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          {content.distance}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
        {/* question answer */}
      </section>
    </>
  );
}
