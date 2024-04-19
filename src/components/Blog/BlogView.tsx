import { Avatar, Typography } from "@mui/material";
import Link from "next/link";

export default function BlogView(data: any) {
  const bdata = data.data;
  return (
    <>
      <div className="rounded-md border-b-2 border-sky-300 bg-slate-500 p-4 shadow-md">
        <div id="title" className="flex items-center justify-start">
          <Avatar alt="Remy Sharp" src={bdata.userId.imgurl} className="m-1" />
          <p className="font-mono font-semibold text-emerald-950">
            {bdata.title}
          </p>
        </div>
        {/* details section */}
        <div>
          <Typography>{bdata.description}</Typography>
        </div>
      </div>
    </>
  );
}
