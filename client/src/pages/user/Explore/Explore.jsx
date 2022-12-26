import { useState, useEffect } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { fetchExploreData } from "../../../network";
import { Carousel, Spinner, Stack } from "react-bootstrap";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import "./Explore.css";
import PageHeader from "../../../components/PageHeader/PageHeader";
const Explore = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let tmp = [];
      const fetchedCourses = await fetchExploreData();
      for (let i = 0; i < fetchedCourses?.length && i < 16; i += 3) {
        let courseCards = [];
        for (let j = 0; j + i < fetchedCourses?.length && j < 3; j++) {
          courseCards.push(<CourseCard course={fetchedCourses[i + j]} />);
        }
        tmp.push(
          <Carousel.Item className="exploreCarouselItem">
            <div className="wrapperExplore">{courseCards}</div>
          </Carousel.Item>
        );
      }
      setCourses(tmp);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Stack className="m-4">
          <Spinner animation="border" />
        </Stack>
      ) : (
        <div>
          <PageHeader pageName="Explore" />
          <div id="exploreSlogan" className="blackBg whiteCard">
            <h1 id="exploreSloganTxt">Reach the next level</h1>
            <p id="sloganSmallTxt">
              Learn new skills and unlock new opportunities.
            </p>
          </div>
          <h2 id="exploreTitle">Popular courses</h2>
          <div id="exploreMain" className="blueBg">
            {courses?.length > 0 ? (
              <Carousel
                nextIcon={<IoIosArrowDroprightCircle size={40} />}
                prevIcon={<IoIosArrowDropleftCircle size={40} />}
                variant="light"
              >
                {courses}
              </Carousel>
            ) : (
              <h2 className="m-4 mt-0">
                Right now there are no courses uploaded yet.
              </h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
