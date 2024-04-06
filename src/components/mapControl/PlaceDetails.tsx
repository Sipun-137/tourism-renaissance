import React, { FC, RefObject } from "react";
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
import PhoneIcon from "@mui/icons-material/Phone";
import { useRouter } from "next/navigation";



interface PlaceDetailsProps {
  place: {
    photo: {
      images: {
        large: {
          url: string;
        };
      };
    };
    name: string;
    rating: number;
    num_reviews: number;
    ranking: number;
    awards?: {
      images: {
        small: string;
      };
      display_name: string;
    }[];
    cuisine?: {
      name: string;
    }[];
    address?: string;
    phone?: string;
    web_url: string;
    website: string;
  };
  selected: boolean;
  refProp?: RefObject<HTMLElement>;
}

const PlaceDetails = ({ place, selected, refProp }: any) => {
  const router=useRouter();
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://im.whatshot.in/img/2020/Apr/41215842-2062970037054645-8180165235601047552-o-baan-tao-cropped-1586780385.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <div className="flex justify-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} review
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

        {place?.cuisine?.map(({ name }: any) => (
          <Chip key={name} size="small" label={name} className="mx-2 my-1" />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className="flex items-center justify-between mt-[10px]"
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className="flex items-center justify-between mt-[10px]"
          >
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
        <CardActions className="flex justify-between mt-3">
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={() => {
              window.open(place.web_url);
            }}
          >
            Trip Advisor
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={() => {
              window.open(place.website);
            }}
          >
            Website
          </Button>
          {/* <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={() => {
              router.push(`/u/hotel/${place.location_id}`)
              alert("you have to book the site")
            }}
          >
            book now
          </Button> */}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
