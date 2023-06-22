import React, { useState, useEffect } from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { blue } from "@material-ui/core/colors";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  icon: {
    height: "30px",
    width: "30px",
  },
  iconClicked: {
    height: "30px",
    width: "30px",
    color: "blue",
  },
  divClicked: {
    borderBottom: "2px solid blue",
  },
  roundedButton: {
    borderRadius: "25px",
    borderColor: blue[800],
  },
  signInText: {
    textTransform: "capitalize",
    color: blue[800],
  },
  signInIcon: {
    color: blue[800],
  },
});

type IconType = "home" | "messages" | "notifications";

interface IconWrapperProps {
  name: IconType;
  Icon: typeof HomeOutlinedIcon;
  clickedIcon: IconType | null;
  setClickedIcon: React.Dispatch<React.SetStateAction<IconType | null>>;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  name,
  Icon,
  clickedIcon,
  setClickedIcon,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1) as IconType;
    setClickedIcon(path || "home");
  }, [location, setClickedIcon]);

  const onClick = () => {
    setClickedIcon(name);
    navigate(`/${name}`);
  };

  return (
    <button
      onClick={onClick}
      className={`w-1/3 flex justify-center items-center cursor-pointer relative
        ${clickedIcon === name ? classes.divClicked : ""}`}
      data-testid={`${name}-icon`}
    >
      <div className="rounded-lg flex items-center hover:bg-gray-200 w-5/6 h-5/6 p-0 m-0 justify-center">
        <Icon
          className={clickedIcon === name ? classes.iconClicked : classes.icon}
        />
      </div>
    </button>
  );
};

const NavBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [clickedIcon, setClickedIcon] = useState<IconType | null>(null);
  const ICONS: Record<IconType, typeof HomeOutlinedIcon> = {
    home: HomeOutlinedIcon,
    messages: MessageOutlinedIcon,
    notifications: NotificationsNoneIcon,
  };

  return (
    <nav className="w-full h-10 mdh-14 lg:h-16 text-zinc-50 bg-white flex">
      <button
        className="h-full ml-10 text-sky-700 font-bold text-2xl w-1/3 flex items-center"
        onClick={() => navigate("/")}
      >
        EduAssign
      </button>
      <div className="h-full flex-1 flex justify-center text-zinc-500 w-1/3">
        {Object.entries(ICONS).map(([name, Icon]) => (
          <IconWrapper
            key={name}
            name={name as IconType}
            Icon={Icon}
            clickedIcon={clickedIcon}
            setClickedIcon={setClickedIcon}
          />
        ))}
      </div>
      <div className="h-full text-zinc-500 w-1/3 flex justify-end mr-10 items-center">
        <Button
          data-testid="Sign-in"
          variant="outlined"
          className={classes.roundedButton}
          onClick={() => navigate("/signin")}
        >
          <PersonOutlineIcon className={classes.signInIcon} />
          <span className={`ml-2 ${classes.signInText}`}>Sign in</span>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
