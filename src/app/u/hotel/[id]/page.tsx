import Details from "@/components/Details";
import { GetHotelData } from "@/services/Data/getHotelData";
import { dummydata2 } from "@/utils/data/data";
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await GetHotelData(id);
  console.log(data.data);

  return (
    <>
      {/* <Details  details={dummydata2} hid={id} /> */}
      <Details  details={data.data} hid={id} />
    </>
  );
}
