import CollegeImageGallery from "@/components/CollegeImageGallery";
import Colleges from "@/components/colleges";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
<div>
  <Navbar></Navbar>

  <Colleges></Colleges>
  <CollegeImageGallery></CollegeImageGallery>
</div>
  );
}
