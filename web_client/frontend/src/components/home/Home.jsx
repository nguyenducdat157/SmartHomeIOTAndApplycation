import { Col, Row } from "antd";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Home.css";

import { Card as CardAntd } from "antd";

const imgHome = `${process.env.PUBLIC_URL}image/home.jpg`;
const imgModelHome = `${process.env.PUBLIC_URL}image/model_home.jpg`;

const { Meta } = CardAntd;

const useStyles = makeStyles({
  root: {
    maxWidth: 540,
    marginBottom: 15,
  },
});

function Home(props) {
  const classes = useStyles();
  return (
    <div className="home">
      <Row>
        <Col span={12}>
          <Row style={{marginBottom: "15px"}}>
            <CardAntd
              hoverable
            //   style={{ width: "540px", height: "312px", marginBottom: "15px" }}
            >
              <Typography gutterBottom variant="h5" component="p">
                Information about your smart home
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Smart Home
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Interactive security
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Video monitoring
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Remote energy management
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Intelligent home
              </Typography>

              <Typography gutterBottom variant="body1" component="p">
                - Product showcase
              </Typography>
            </CardAntd>
          </Row>

          <Row>
            <CardAntd
              hoverable
              style={{ height: "380px"}}
            >
              <Typography gutterBottom variant="h5" component="p">
                Benefits of smart home for you
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Great Potential in Saving Energy and Money
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Extreme Convenience
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Boost Your Home Security
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Home Security Awareness with Security Cameras
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Safety on Your Appliances and Lighting System
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - It Can Help Save Precious Time
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Contributes to the Economy
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Full Control When Your Out of Town
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Keep An Eye on Your Kids
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                - Increases Promotes Peace of Mind
              </Typography>
            </CardAntd>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Image smart home"
                  height="240"
                  image={imgHome}
                  title="Image smart home"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    Smart Home
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Row>

          <Row>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Image smart home"
                  height="306"
                  image={imgModelHome}
                  title="Modeling of smart home"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    Modeling of smart home
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
