import "./EditSubtitle.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import CreateExam from "../../../../components/CreateExam/CreateExam";
import UploadVideo from "../../../../components/UploadVideo/UploadVideo";
import PageHeader from "../../../../components/PageHeader/PageHeader";

const EditSubtitle = () => {
  const { courseID, subtitleID } = useParams();
  return (
    <div id="editSubtitleMain">
      <PageHeader pageName="Edit subtitle" />
      <Tabs
        id="editSubtitleTabs"
        className="m-4"
        defaultActiveKey="Upload video"
        justify
      >
        <Tab
          eventKey="Upload video"
          title={<h3 className="blackTxt">Upload video</h3>}
        >
          <UploadVideo courseID={courseID} subtitleID={subtitleID} />
        </Tab>
        <Tab
          eventKey="Create exam"
          title={<h3 className="blackTxt">Create exam</h3>}
        >
          <CreateExam courseID={courseID} subtitleID={subtitleID} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default EditSubtitle;
