import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import CreateExam from "../../../components/CreateExam/CreateExam";
import UploadVideo from "../../../components/UploadVideo/UploadVideo";

const EditSubtitle = () => {
  const { subtitleID } = useParams();
  return (
    <Tabs defaultActiveKey="Upload video" className="m-4" justify>
      <Tab eventKey="Upload video" title="Upload video">
        <UploadVideo subtitleID={subtitleID} />
      </Tab>
      <Tab eventKey="Create exam" title="Create exam">
        <CreateExam subtitleID={subtitleID} />
      </Tab>
    </Tabs>
  );
};

export default EditSubtitle;
