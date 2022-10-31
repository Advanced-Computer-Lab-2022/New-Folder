import React from 'react'
import { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { ReactSession } from "react-client-session";
import { getPrice } from '../network'
// import { Route, useParams } from 'react-router-dom'
// import { fetchcCourseDetils } from '../network'
const CourseDetails = () => {
    const [courses, setCourses] = useState(0);
    const [reviews , setReviws] = useState([]);
    const [price, setPrice] = useState();
    const [subtitles, setsubtitles] = useState([]);
    
    const location = useLocation();


    const fetchPrice = async () => {
        try {
          const fetchedPrice = await getPrice(courses.price);
          console.log(fetchedPrice);
          setPrice(fetchedPrice);
        } catch (err) {
          console.log(err);
        }
      };
    
    React.useEffect(()=>{
        setCourses(location.state.course);
        setReviws(location.state.course.reviews);
        setsubtitles(location.state.course.subtitles);
        fetchPrice();
    }, [ReactSession.get("country")]);

    return (
        <div>
            <h1>{courses.name}</h1>
            <img src={courses.image}></img>
            <h3>{courses.subject}</h3>
            <h3>{"price"+": "+price}</h3>
            <p>Description : <span>{courses.description}</span></p>
            <p> Total Number of Hours : {courses.duration}</p>
            
            <div>
                <h6>Course Content :</h6>
            
                    {subtitles.map((sub) => (
                       <ul>
                       <h4>Week {sub.subtitleNumber}</h4>
                       <h6>Content</h6>
                        <li>Number of hours : {sub.duration}</li>
                        <h6>Excercises</h6>
                        {sub.exercises.map((ex , index) =>{
                           return <button type='submit' disabled>Excercise {index +1}</button>
                        })}
                        
                     </ul>
                        
                    ))}
                
            </div>
            <h4>Reviews : </h4>
            <ul>
                {reviews.map((review) => (
                    <li>{review}</li>
                ))}
            </ul>
            
            
        </div>

    )
}

export default CourseDetails
