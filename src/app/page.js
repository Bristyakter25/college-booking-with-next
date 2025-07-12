import CollegeImageGallery from "@/components/CollegeImageGallery";
import Colleges from "@/components/colleges";
import ResearchPapers from "@/components/ResearchPapers";
import ReviewSlider from "@/components/ReviewSlider";




export default function Home() {
  return (
<div>
  

  <Colleges></Colleges>
  <CollegeImageGallery></CollegeImageGallery>
  <ResearchPapers></ResearchPapers>
  <ReviewSlider></ReviewSlider>
</div>
  );
}
