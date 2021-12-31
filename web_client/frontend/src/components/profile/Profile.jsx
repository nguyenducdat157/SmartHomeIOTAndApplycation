import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { UserOutlined } from "@ant-design/icons";
import { Row } from "antd";
import UserData from "database/user.js";
import { useState } from "react";
import { useEffect } from "react";

const imgProfile = `${process.env.PUBLIC_URL}image/img_profile.jpg`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    minWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const getUser = () => {
  let userId = localStorage.getItem("userId");

  UserData.map((user, index) => {
    if (user.id === userId) {
      console.log("user" + user);
      return JSON.stringify(user);
    }
  });
};

function Profile(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    let userId = localStorage.getItem("userId");

    UserData.map((user, index) => {
      if (user.id === userId) {
        setUser(user);
        console.log("user: ", user);
        // return JSON.stringify(user);
      }
    });
  }, []);
  // console.log('user '+user)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return user === undefined ? (
    ""
  ) : (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card className={classes.root}>
          <CardHeader
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={user.username}
            subheader="My house"
          />
          <CardMedia
            className={classes.media}
            image={imgProfile}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="div">
              <Row>Account ID: {user.id}</Row>
              <Row>Email: {user.email}</Row>
              <Row>Phone: {user.phone}</Row>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Profile:</Typography>
              <Typography paragraph>
                This is website for smart house.
              </Typography>
              <Typography paragraph>Detail profile</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
