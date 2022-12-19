const Earnings = (props) => {
  return (
    <div>
      <h1>{props.year}</h1>
      {props.months.map((month) => (
        <div>
          <h2>{month.month}</h2>
          <div>
            {month.payments.map((payment) => (
              <h4>{`${
                payment.magnitude
              } ${payment.currency.toUpperCase()}`}</h4>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Earnings;
