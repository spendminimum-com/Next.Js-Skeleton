import classes from '../../../styles/Card.module.css';

function Card(props) {
  return (
    <div className="CARD">
      <div className={classes.card}>{props.children}</div>
    </div>
  );
}

export default Card;
