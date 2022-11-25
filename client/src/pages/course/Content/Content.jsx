import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SubtitleSideBar from '../../../components/Course/SubtitleSideBar/SubtitleSideBar';
import { youTubeGetID } from '../../../utils/videoID';
import './Content.css'


let indexOfSubtitle = 0;
let indexOfContent = 1;
let arrayofSubtitleFromCourse = [{
    "subtitleNumber": 1,
    "subTitle_Content": [
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "React Tutorial For Beginners",
        "duration": "6",
        "video": "https://www.youtube.com/watch?v=ZAsO9rqzcfE&ab_channel=ProgrammingWithFaris",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "WWE wristle mania",
        "duration": "6",
        "video": "https://www.youtube.com/watch?v=TVWDNhoBN1I&ab_channel=beINSPORTS",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e6f038005a5e19ffa1",
        "Questions": [
        ],
        "Mark": [],
        "__v": 0,
        "typeOfSubtitle": "excercise"
      }
    ],
    "duration": 12
  }, 
  {
    "subtitleNumber": 2,
    "subTitle_Content": [
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "facing your fear",
        "duration": "6",
        "video": "",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "masr masr masrrrr",
        "duration": "6",
        "video": "https://www.youtube.com/watch?v=BPaA8KvnP_E&ab_channel=AmrSherif",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e6f038005a5e19ffa1",
        "Questions": [
        ],
        "Mark": [],
        "__v": 0,
        "typeOfSubtitle": "excercise"
      }
    ],
    "duration": 12
  },
  {
    "subtitleNumber": 3,
    "subTitle_Content": [
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "masr masr masrrrr",
        "duration": "6",
        "video": "https://www.youtube.com/watch?v=7XxY4xHKeQs&ab_channel=HeshamAfifi",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "masr masr masrrrr",
        "duration": "6",
        "video": "https://www.youtube.com/watch?v=Q5VSWvZibpQ&ab_channel=LeanaDeeb",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e6f038005a5e19ffa1",
        "Questions": [
        ],
        "Mark": [],
        "__v": 0,
        "typeOfSubtitle": "excercise"
      }
    ],
    "duration": 12
  },
  {
    "subtitleNumber": 4,
    "subTitle_Content": [
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "masr masr masrrrr",
        "duration": "6",
        "video": "https://www.youtube.com/watch?v=hL6rUxvuXT4&ab_channel=LayedBakDFR",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "masr masr masrrrr",
        "duration": "6",
        "video": "https://www.youtube.com/watch?v=hL6rUxvuXT4&ab_channel=LayedBakDFR",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e6f038005a5e19ffa1",
        "Questions": [
        ],
        "Mark": [],
        "__v": 0,
        "typeOfSubtitle": "excercise"
      }
    ],
    "duration": 12
  },
  {
    "subtitleNumber": 5,
    "subTitle_Content": [
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "masr masr masrrrr",
        "duration": "6",
        "video": "",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "masr masr masrrrr",
        "duration": "6",
        "video": "",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e6f038005a5e19ffa1",
        "Questions": [
        ],
        "Mark": [],
        "__v": 0,
        "typeOfSubtitle": "excercise"
      }
    ],
    "duration": 12
  }
];




const Content = () => {
  // get course ID to get Course Object
  // get index of specific subtitle index (sId) and content that will be displayed (c)
  const { courseId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const indexOfSubtitle = params.get('sId');
  const indexOfContent = params.get('cId');

  // States of subtitle Array , Video will be displayed, and content description
  const [subtitle, setSubtitle] = useState([]);
  const [video,setVideo] = useState("");
  const [description, setDescription] = useState("");



  var contentDescription = arrayofSubtitleFromCourse[indexOfSubtitle].subTitle_Content[indexOfContent].description;
  var contentVideoLink = youTubeGetID(arrayofSubtitleFromCourse[indexOfSubtitle].subTitle_Content[indexOfContent].video);
  
  useEffect(()=>{

  }, [])

  return (
    <Row>
        <Col lg={8}>
            <div className="watchScreen__player">
                {/* get video id from youtube API and concatenate it to https://www.youtube.com/embed/*/}
                <iframe src={"https://www.youtube.com/embed/"+ contentVideoLink} frameborder="0" title='My Video' allowFullScreen width="100%" height="100%"></iframe>
            </div>
            <div class="watchScreen__description">
              <i class="bi bi-play-circle-fill"></i>
              <span>{description}</span>
              <button type="button" class="btn btn-primary">Next Video</button>
            </div>
        </Col>
        <Col lg={4}>
            <SubtitleSideBar subtitles={subtitle} />
        </Col>
    </Row>
  )

}

export default Content