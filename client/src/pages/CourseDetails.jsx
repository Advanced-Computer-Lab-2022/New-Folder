import React from 'react'
import { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom';
// import { Route, useParams } from 'react-router-dom'
// import { fetchcCourseDetils } from '../network'
const CourseDetails = () => {
    const [courses, setCourses] = useState(0);
    const [reviews , setReviws] = useState([]);
    const [subTitles , setSubTitle] = useState([]);
    const location = useLocation();

    
    React.useEffect(()=>{
        
        setCourses(location.state.course);
        setReviws(location.state.course.reviews);
        
    }, []);

    return (
        <div>
            <h1>{courses.name}</h1>
            <img src={courses.image}></img>
            <h3>{courses.subject}</h3>
            {/* <p>{courses.price.magnitude}</p> */}
            <p>{courses.description}</p>
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
