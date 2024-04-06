"use client";
import React, { FC, RefObject, useEffect, useState } from "react";

import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Box,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useRouter } from "next/navigation";

const PlaceDetails = ({ place, selected, refProp }: any) => {
  const router = useRouter();
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.cardPhotos[0]
            ? place?.cardPhotos[0].sizes.urlTemplate.replace(
                "?w={width}&h={height}&s=1",
                ""
              )
            : "https://im.whatshot.in/img/2020/Apr/41215842-2062970037054645-8180165235601047552-o-baan-tao-cropped-1586780385.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.title}
        </Typography>

        <div className="flex justify-between">
          <Rating value={Number(place.bubbleRating.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.bubbleRating.count} review
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </div>

        {place?.awards?.map(
          (
            award: {
              images: { small: string | undefined };
              display_name: string | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div key={index} className="flex justify-between items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={award.images.small} alt={award.display_name} />
              <Typography
                variant="subtitle2"
                color="textSecondary"
              ></Typography>
            </div>
          )
        )}

        {place?.secondaryInfo && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className="flex items-center justify-between mt-[10px]"
          >
            <LocationOnIcon />
            {place.secondaryInfo}
          </Typography>
        )}
        {place?.priceForDisplay && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className="flex items-center justify-between mt-[10px]"
          >
            <PaymentsIcon />
            <span>
              <span className="line-through text-red-400">
                {place.strikethroughPrice}
              </span>
              <span className="font-bold">{place.priceForDisplay}</span>
            </span>
          </Typography>
        )}
        <CardActions className="flex justify-between mt-3">
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            size="small"
            onClick={() => {
              router.push(`/u/hotel/${place.id}`);
            }}
          >
            book now
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
