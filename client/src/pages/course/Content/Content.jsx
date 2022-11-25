import React from 'react'
import {Col, Row} from 'react-bootstrap';
import SubtitleSideBar from '../../../components/Course/SubtitleSideBar/SubtitleSideBar';
import './Content.css'


// 1- retreive subtitles from Course
// 2- get corresponding subtitle with the index passed
// 3- get corresponding content with the index passed from corresponding subtitle


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
        "video": "",
        "__v": 0,
        "typeOfSubtitle": "content"
      },
      {
        "_id": "637c00e7f038005a5e19ffa6",
        "courseID": "637c00e6f038005a5e19ff9e",
        "description": "WWE wristle mania",
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
  },
  {
    "subtitleNumber": 3,
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
  },
  {
    "subtitleNumber": 4,
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
  return (
    <Row>
        <Col lg={8}>
            <div className="watchScreen__player">
                {/* get video id from youtube API and concatenate it to https://www.youtube.com/embed/*/}
                <iframe src="https://www.youtube.com/embed/U05BDwOTGp0" frameborder="0" title='My Video' allowFullScreen width="100%" height="100%"></iframe>
            </div>
            <h4>{arrayofSubtitleFromCourse[indexOfSubtitle].subTitle_Content[indexOfContent].description}</h4>
        </Col>
        <Col lg={4}>
            <SubtitleSideBar subtitles={arrayofSubtitleFromCourse} />
        </Col>
    </Row>
  )

}

export default Content