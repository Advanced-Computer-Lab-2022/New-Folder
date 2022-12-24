import "./EarningsCard.css";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
const EarningsCard = (props) => {
  return (
    <div id="earningsCardMain">
      <Table striped>
        <tbody>
          {props.months.map((m) => (
            <tr>
              <td width={"78%"}>
                <h5>{m.month}</h5>
              </td>
              <td>
                {m.payments.length === 0 ? (
                  <Badge
                    id="noEarningsBadge"
                    className="ms-2"
                    bg="light"
                    text="dark"
                  >
                    No earnings
                  </Badge>
                ) : (
                  m.payments.map((p) => (
                    <Badge id="earningsBadge" className="ms-2">
                      {`${p.magnitude} ${p.currency.toUpperCase()}`}
                    </Badge>
                  ))
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EarningsCard;
