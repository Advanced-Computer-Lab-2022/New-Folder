import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import CreateExam from "../../../components/CreateExam/CreateExam";
import UploadVideo from "../../../components/UploadVideo/UploadVideo";

const EditSubtitle = () => {
  const { courseID, subtitleID } = useParams();
  return (
    <Tabs defaultActiveKey="Upload video" className="m-4" justify>
      <Tab eventKey="Upload video" title="Upload video">
        <UploadVideo courseID={courseID} subtitleID={subtitleID} />
      </Tab>
      <Tab eventKey="Create exam" title="Create exam">
        <CreateExam courseID={courseID} subtitleID={subtitleID} />
      </Tab>
    </Tabs>
  );
};

export default EditSubtitle;
