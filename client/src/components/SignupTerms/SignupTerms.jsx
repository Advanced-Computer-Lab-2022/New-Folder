import { Button, Modal } from "react-bootstrap";

const SignupTerms = (props) => {
  const handleClose = () => props.setShow(false);
  return (
    <Modal
      centered
      style={{ maxHeight: "700px" }}
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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
        perspiciatis nihil quae animi exercitationem, porro voluptatum
        temporibus sit sapiente error aliquid vitae pariatur, repellendus culpa
        facere esse doloremque iste ipsum? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Ad tempore repudiandae ipsum omnis, ipsa
        consectetur fugit et architecto veritatis. Natus, molestiae autem. Quas
        aliquid maxime atque quam qui harum cumque. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Illo ipsam cumque eius, possimus, a odio
        autem deleniti error suscipit minima tempora totam rerum soluta atque
        dolorem quidem. Ullam, eveniet voluptatibus! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eveniet non quod est magni, iste doloribus
        perspiciatis ipsam nobis eaque quos, accusantium aut et fugit numquam
        facilis veritatis velit doloremque. Modi? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Doloribus quas perferendis nesciunt totam
        nam eos quaerat qui blanditiis cupiditate iusto. Rem autem voluptas
        itaque? Fugiat fugit adipisci obcaecati temporibus assumenda. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Consectetur suscipit
        qui perspiciatis exercitationem odit! Facere placeat nam unde quo,
        inventore consectetur, sit voluptas ipsam consequuntur a eveniet beatae
        assumenda in? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Ea ex aperiam consequatur at deleniti laborum fugit nam dolore, repellat
        mollitia a ad, nostrum et praesentium, doloribus atque perspiciatis
        commodi repellendus. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quod provident suscipit ad veniam blanditiis possimus! Voluptatem
        iste facere, tempora dolore officia ut alias numquam placeat veritatis
        dignissimos voluptatum amet eos. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Qui nulla voluptates veritatis distinctio iusto
        eligendi sequi architecto libero exercitationem reiciendis repudiandae
        mollitia facilis, neque sint voluptatem, optio numquam maxime sapiente.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet itaque
        beatae ratione deleniti officiis mollitia repellat nostrum sit
        laboriosam soluta, tempora ut! Mollitia similique vitae beatae non
        repudiandae nemo illum. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Iste inventore reiciendis debitis odit quos, adipisci
        nobis quas ducimus quia esse ab, expedita quidem quod dolores modi
        consequatur corrupti autem dolore. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Amet explicabo autem velit voluptate magni
        sunt, excepturi voluptatum hic, quas asperiores incidunt a vero ipsum
        sit pariatur illum magnam, voluptates officiis? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Accusamus aperiam adipisci sed
        voluptates reprehenderit esse necessitatibus quasi magni, eum qui
        consequuntur, maiores soluta id laudantium omnis iusto architecto,
        consectetur tempora? Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sint perspiciatis nihil quae animi exercitationem, porro
        voluptatum temporibus sit sapiente error aliquid vitae pariatur,
        repellendus culpa facere esse doloremque iste ipsum? Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Ad tempore repudiandae ipsum
        omnis, ipsa consectetur fugit et architecto veritatis. Natus, molestiae
        autem. Quas aliquid maxime atque quam qui harum cumque. Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Illo ipsam cumque eius,
        possimus, a odio autem deleniti error suscipit minima tempora totam
        rerum soluta atque dolorem quidem. Ullam, eveniet voluptatibus! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Eveniet non quod est
        magni, iste doloribus perspiciatis ipsam nobis eaque quos, accusantium
        aut et fugit numquam facilis veritatis velit doloremque. Modi? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Doloribus quas
        perferendis nesciunt totam nam eos quaerat qui blanditiis cupiditate
        iusto. Rem autem voluptas itaque? Fugiat fugit adipisci obcaecati
        temporibus assumenda. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Consectetur suscipit qui perspiciatis exercitationem
        odit! Facere placeat nam unde quo, inventore consectetur, sit voluptas
        ipsam consequuntur a eveniet beatae assumenda in? Lorem ipsum, dolor sit
        amet consectetur adipisicing elit. Ea ex aperiam consequatur at deleniti
        laborum fugit nam dolore, repellat mollitia a ad, nostrum et
        praesentium, doloribus atque perspiciatis commodi repellendus. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Quod provident
        suscipit ad veniam blanditiis possimus! Voluptatem iste facere, tempora
        dolore officia ut alias numquam placeat veritatis dignissimos voluptatum
        amet eos. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
        nulla voluptates veritatis distinctio iusto eligendi sequi architecto
        libero exercitationem reiciendis repudiandae mollitia facilis, neque
        sint voluptatem, optio numquam maxime sapiente. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Amet itaque beatae ratione deleniti
        officiis mollitia repellat nostrum sit laboriosam soluta, tempora ut!
        Mollitia similique vitae beatae non repudiandae nemo illum. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Iste inventore reiciendis
        debitis odit quos, adipisci nobis quas ducimus quia esse ab, expedita
        quidem quod dolores modi consequatur corrupti autem dolore. Lorem, ipsum
        dolor sit amet consectetur adipisicing elit. Amet explicabo autem velit
        voluptate magni sunt, excepturi voluptatum hic, quas asperiores incidunt
        a vero ipsum sit pariatur illum magnam, voluptates officiis? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Accusamus aperiam adipisci
        sed voluptates reprehenderit esse necessitatibus quasi magni, eum qui
        consequuntur, maiores soluta id laudantium omnis iusto architecto,
        consectetur tempora?
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ width: "200px" }}
          variant="outline-dark"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SignupTerms;
