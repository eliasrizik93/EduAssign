import { Avatar, makeStyles } from "@material-ui/core";

type MessageProps = {
  message?: string;
  imgUrl?: string;
  timeStamp?: string;
};
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width:'100%'
  },
  avatar: {
    height: "40px",
    width: "40px",
  },
  text: {
    marginLeft: '10px',
    marginTop:"15px",
    backgroundColor: '#56667529',
    borderRadius: '0 30px 30px 30px', 
    padding: '10px 20px 10px 20px',
    color: 'black',
  },
  timestamp: {
    display:"flex",
    justifyContent:"center",
    flexDirection:"column"
  },
}));
const Message = (props: MessageProps) => {
  const classes = useStyles();

  return (
    <>
     <div className={classes.container}>
      <Avatar
        src={props.imgUrl}
        alt="No Picture"
        className={classes.avatar}
      ></Avatar>
      <div className={classes.text}>qweqw qkw eoqw wqopi ejwopqie jqiopw jpioqwej pqwje pioqw wqeiojqwiop jqwiope jqpio epi ejwopqie jqiopw jpioqwej pqwje pioqw wqeiojqwiop jqwiope jqpio ejqopi ejqiop ejoipwq jiopq jioppi ejwopqie jqiopw jpioqwej pqwje pioqw wqeiojqwiop jqwiope jqpio ejqopi ejqiop ejoipwq jiopq jioppi ejwopqie jqiopw jpioqwej pqwje pioqw wqeiojqwiop jqwiope jqpio ejqopi ejqiop ejoipwq jiopq jiopjqopi ejqiop ejoipwq jiopq jiopejqiopwejoipqwejoipqwj wqe jioqwej ioqwejo iqjeio qwjeiowq jioewjioqejioqw ejioqwej qwioko qwj keioqjoi ejqwio jiowj ioqwej owqw qjiwe </div>
      <div className={classes.timestamp}>12:30</div>
    </div>
    <div className={classes.container}>
      <Avatar
        src={props.imgUrl}
        alt="No Picture"
        className={classes.avatar}
      ></Avatar>
      <div className={classes.text}>qweqw qkw eoqw wqopi ejio ejqopi ejqiop ejqwej owqw qjiwe </div>
      <div className={classes.timestamp}>12:30</div>
    </div>
    <div className={classes.container}>
      <Avatar
        src={props.imgUrl}
        alt="No Picture"
        className={classes.avatar}

        
      ></Avatar>
      <div className={classes.text}>qweqw qkw eoqw wqopi ejio ejqopi ejqiop ejqqopi ejqiop ejqwej owqqopi ejqiop ejqwej owqqopi ejqiop ejqwej owqwej owqw qjiwe </div>
      <div className={classes.timestamp}>12:30</div>
    </div>
    <div className={classes.container}>
      <Avatar
        src={props.imgUrl}
        alt="No Picture"
        className={classes.avatar}
      ></Avatar>
      <div className={classes.text}>qweqw qkqopi ejqiop ejqwej owqqopi ejqiop ejqwej owqw eoqw wqopi ejio ejqopi ejqiop ejqwej owqw qjiwe </div>
      <div className={classes.timestamp}>12:30</div>
    </div>
    </>

    
  );
};
export default Message;
