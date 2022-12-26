import { useState, useEffect } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { fetchExploreData } from "../../../network";
import { Carousel, Image, Spinner, Stack } from "react-bootstrap";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import "./Explore.css";
import PageHeader from "../../../components/PageHeader/PageHeader";
const Explore = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

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
            <div className="wrapper">{courseCards}</div>
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
          <div id="exploreSlogan" className="whiteCard">
            <h1 className="blueTxt">Reach the next level</h1>
            <h4>Learn new skills and Unlock new opportunities.</h4>
          </div>
          <h2 id="exploreTitle">Popular courses</h2>
          <div id="exploreMain" className="whiteCard">
            <Carousel
              nextIcon={<IoIosArrowDroprightCircle size={40} color="#100F0F" />}
              prevIcon={<IoIosArrowDropleftCircle size={40} color="#100F0F" />}
              variant="dark"
            >
              {courses}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
