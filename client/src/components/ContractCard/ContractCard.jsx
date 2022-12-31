import { Button, Modal } from "react-bootstrap";

const ContractCard = (props) => {
  const handleClose = () => props.setShow(false);
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title>Terms and conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Introduction </h3>
        These Website Standard Terms and Conditions written on this webpage
        shall manage your use of our website, Webiste Name accessible at
        Website.com. These Terms will be applied fully and affect to your use of
        this Website. By using this Website, you agreed to accept all terms and
        conditions written in here. You must not use this Website if you
        disagree with any of these Website Standard Terms and Conditions. Minors
        or people below 18 years old are not allowed to use this Website.{" "}
        <h3>Intellectual Property Rights</h3> Other than the content you own,
        under these Terms, Level Up and/or its licensors own all the
        intellectual property rights and materials contained in this Website.
        You are granted limited license only for purposes of viewing the
        material contained on this Website. <h3>Restrictions</h3> You are
        specifically restricted from all of the following:{" "}
        <ul>
          <li>publishing any Website material in any other media</li>
          <li>
            selling, sublicensing and/or otherwise commercializing any Website
            material
          </li>
          <li>publicly performing and/or showing any Website material</li>
          <li>
            using this Website in any way that is or may be damaging to this
            Website
          </li>
          <li>
            using this Website in any way that impacts user access to this
            Website
          </li>{" "}
          <li>
            using this Website contrary to applicable laws and regulations, or
            in any way may cause harm to the Website, or to any person or
            business entity
          </li>{" "}
          <li>
            engaging in any data mining, data harvesting, data extracting or any
            other similar activity in relation to this Website
          </li>
          <li>using this Website to engage in any advertising or marketing</li>
        </ul>{" "}
        Certain areas of this Website are restricted from being access by you
        and Level Up may further restrict access by you to any areas of this
        Website, at any time, in absolute discretion. Any user ID and password
        you may have for this Website are confidential and you must maintain
        confidentiality as well. <h3>Your Content</h3> In these Website Standard
        Terms and Conditions, “Your Content” shall mean any audio, video text,
        images or other material you choose to display on this Website. By
        displaying Your Content, you grant Level Up a non-exclusive, worldwide
        irrevocable, sub licensable license to use, reproduce, adapt, publish,
        translate and distribute it in any and all media. Your Content must be
        your own and must not be invading any third-party's rights. Level Up
        reserves the right to remove any of Your Content from this Website at
        any time without notice. <h3>No warranties</h3> This Website is provided
        “as is,” with all faults, and Level Up express no representations or
        warranties, of any kind related to this Website or the materials
        contained on this Website. Also, nothing contained on this Website shall
        be interpreted as advising you. <h3>Limitation of liability</h3> In no
        event shall Level Up, nor any of its officers, directors and employees,
        shall be held liable for anything arising out of or in any way connected
        with your use of this Website whether such liability is under contract.
        Level Up, including its officers, directors and employees shall not be
        held liable for any indirect, consequential or special liability arising
        out of or in any way related to your use of this Website.
        <h3>Indemnification</h3> You hereby indemnify to the fullest extent
        Level Up from and against any and/or all liabilities, costs, demands,
        causes of action, damages and expenses arising in any way related to
        your breach of any of the provisions of these Terms.{" "}
        <h3>Severability</h3> If any provision of these Terms is found to be
        invalid under any applicable law, such provisions shall be deleted
        without affecting the remaining provisions herein.{" "}
        <h3>Variation of Terms</h3>
        Level Up is permitted to revise these Terms at any time as it sees fit,
        and by using this Website you are expected to review these Terms on a
        regular basis. <h3>Assignment</h3> The Level Up is allowed to assign,
        transfer, and subcontract its rights and/or obligations under these
        Terms without any notification. However, you are not allowed to assign,
        transfer, or subcontract any of your rights and/or obligations under
        these Terms. <h3>Entire Agreement</h3>These Terms constitute the entire
        agreement between Level Up and you in relation to your use of this
        Website, and supersede all prior agreements and understandings.
        <h3>Governing Law & Jurisdiction</h3> These Terms will be governed by
        and interpreted in accordance with the laws of the State of Country, and
        you submit to the non-exclusive jurisdiction of the state and federal
        courts located in Country for the resolution of any disputes.
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ width: "200px" }}
          className="blueBg blueBgHover"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ContractCard;
