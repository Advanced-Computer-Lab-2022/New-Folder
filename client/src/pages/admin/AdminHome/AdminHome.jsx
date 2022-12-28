import { Tab, Tabs } from "react-bootstrap";
import Refunds from "../Refunds";
import Reports from "../Reports";
import AccessRequests from "../AccessRequests";

const AdminHome = () => {
  return (
    <Tabs
      id="editSubtitleTabs"
      className="m-4"
      defaultActiveKey="Reports"
      justify
    >
      <Tab eventKey="Reports" title={<h3 className="blackTxt">Reports</h3>}>
        <Reports />
      </Tab>
      <Tab eventKey="Refunds" title={<h3 className="blackTxt">Refunds</h3>}>
        <Refunds />
      </Tab>
      <Tab
        eventKey="Access Requests"
        title={<h3 className="blackTxt">Access Requests</h3>}
      >
        <AccessRequests />
      </Tab>
    </Tabs>
  );
};
export default AdminHome;
