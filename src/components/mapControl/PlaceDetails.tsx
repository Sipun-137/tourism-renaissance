import React, { FC, RefObject, useContext, useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Modal,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useRouter } from "next/navigation";
import { AddBlog } from "@/services/Blog";
import toast, { Toaster } from "react-hot-toast";
import { GlobalContext } from "@/context";

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

  const {user}=useContext(GlobalContext);
  const initialFormData={
    userId:user?._id,
    pid:"",
    title:"",
    description:""
  }
  const [addModal, setAddModal] = useState(false);
  const [formdata,setFormdata]=useState(initialFormData);
  function addmodalClose() {
    setAddModal(false);
    setFormdata(initialFormData);
  }

  useEffect(()=>{
    if(user!==null){
      setFormdata({...formdata,userId:user?._id})
    }
  },[user, setFormdata])
  
  const router = useRouter();
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  async function addPost(){
    const res=await AddBlog(formdata)
    if(res.success){
      toast.success(res.message)
      setFormdata(initialFormData);
      router.push("/u/blog")
    }else{
      toast.error(res.message)
      setFormdata(initialFormData);
    }
  }
  console.log(formdata)
  return (
    <>
    <Toaster position="top-right"/>
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
            {
              user!==null?<Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={() => {
                setFormdata({...formdata,pid:place.location_id})
                setAddModal(true)}}
            >
              Write Blog
            </Button>:null
            }
            
          </CardActions>
        </CardContent>
      </Card>
      <Modal
        open={addModal}
        onClose={addmodalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box border-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[800px] ">
          <div className=" flex items-center justify-center gap-5">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <p className="uppercase font-sans tracking-[5px] text-white">
                Add Post
              </p>
            </div>
          </div>
          <div className="container flex justify-center items-center mt-2 rounded-md p-4 bg-white">
            <div className="w-full p-3 flex flex-col gap-y-2">
              <FormControl fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input id="title" aria-describedby="title-text" value={formdata.title} onChange={(event:any)=>{setFormdata({...formdata,title:event.target.value})}}/>
                <FormHelperText id="title-text">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Enter the title of the post
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="description-input">Description</InputLabel>
                <Input
                  id="description-input"
                  aria-describedby="description-helper-text"
                  rows={3}
                  value={formdata.description}
                  onChange={(event:any)=>{setFormdata({...formdata,description:event.target.value})}}
                />
                <FormHelperText id="description-helper-text">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Describe your experience
                </FormHelperText>
              </FormControl>
            </div>
          </div>
            <div className="mt-2 mx-auto ">
              <Button fullWidth variant="outlined" onClick={addPost}>Publish</Button>
            </div>
        </div>
      </Modal>
    </>
  );
};

export default PlaceDetails;
