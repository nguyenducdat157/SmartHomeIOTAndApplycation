import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Carousel, Col, notification, Row, Switch } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deveiceList, icon } from 'database/Deveices/DeveicesConfig';
import './DetailRoomTest.css';

import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { FaLightbulb, FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { SiApacheairflow } from 'react-icons/si';
import { GiDroplets, GiLightBulb } from 'react-icons/gi';
import { FaRegLightbulb, FaUserSecret, FaUserGraduate, FaUserNinja } from 'react-icons/fa';
import { ImPower } from 'react-icons/im';
import { RiCharacterRecognitionFill } from 'react-icons/ri';
import { AiFillCodeSandboxSquare } from 'react-icons/ai';
import { TiDeviceDesktop } from 'react-icons/ti';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import { useEffect } from 'react';
import Axios from 'axios';
import { Pie, WaterWave } from 'ant-design-pro/lib/Charts';
import { light } from '@material-ui/core/styles/createPalette';

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  borderRadius: 15,
  // background: "#364d79",
};

const LightItem = (props) => {
  const token = localStorage.getItem('token');
  const [test, setTest] = useState(false);
  const [turnOn, setTurnOn] = useState(props.item.status === 'on' ? true : false);
  const [isLoop, setIsLoop] = useState(false);

  const onChange = (id, checked) => {
    let status = 'off';

    if (checked === true) {
      status = 'off';
    } else {
      status = 'on';
    }

    Axios.patch(`/devices/${id}`, { status: status }, { headers: { Authorization: token } })
      .then((res) => {
        // if (airCondition && id === airCondition.id) {
        //   setAirCondition(res.data);
        // } else {
        //   let tmp = lights.map((item) => item);
        //   let index = findById(id, lights);
        //   tmp[index].status = status;

        //   setLights(tmp);
        // }

        if (res.data.status === 'on') {
          setTurnOn(true);
          notification.success({
            message: 'Turn on device successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        } else {
          setTurnOn(false);
          notification.success({
            message: 'Turn off device successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: 'server has an error!',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };

  useEffect(() => {
    if (test) {
      const loop = setInterval(() => {
        setTurnOn(!turnOn);
        onChange(props.item.id, turnOn);
        setIsLoop(!isLoop);
      }, 3000);
      return () => clearInterval(loop);
    }
  }, [isLoop, test]);

  return (
    <Col span={6}>
      <Card hoverable cover={<GiLightBulb size={54} color={turnOn ? '#ece707' : 'black'} />}>
        <div>
          <Switch
            checkedChildren="on"
            unCheckedChildren="off"
            checked={turnOn ? true : false}
            onChange={(checked, event) => onChange(props.item.id, turnOn)}
          />
          <Switch checkedChildren="test" unCheckedChildren="stop" checked={test} onChange={() => setTest(!test)} />
        </div>

        <Meta title={props.item.name} />
      </Card>
    </Col>
  );
};

function DetailRoomTest(props) {
  const roomId = useParams().id;
  const token = localStorage.getItem('token');
  const [lights, setLights] = useState([]);
  const [airCondition, setAirCondition] = useState();
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const [door, setDoor] = useState();
  const [fakeApi, setFakeApi] = useState(false);
  const [isGetApi, setIsGetApi] = useState(false);

  useEffect(() => {
    Axios.get(`/rooms/${roomId}`, {
      headers: { Authorization: token },
    }).then((res) => {
      let light = [];
      res.data.map((item, index) => {
        if (item.name === 'Air Condition') {
          setAirCondition(item);
        } else if (item.name === 'Door') {
          setDoor(item);
        } else {
          light.push(item);
        }
      });

      setLights(light);
    });
  }, []);

  useEffect(() => {
    Axios.get('/api/sensor', { headers: { Authorization: token } }).then((res) => {
      setHumidity(res.data.humidityAir);
      setTemperature(res.data.temperature);
    });
  }, [isGetApi]);

  const onChange = (id, checked, event) => {
    let status = 'off';
    if (checked === true) {
      status = 'on';
    } else {
      status = 'off';
    }

    Axios.patch(`/devices/${id}`, { status: status }, { headers: { Authorization: token } })
      .then((res) => {
        if (airCondition && id === airCondition.id) {
          setAirCondition(res.data);
        } else {
          let tmp = lights.map((item) => item);
          let index = findById(id, lights);
          tmp[index].status = status;
          setLights(tmp);
        }

        if (res.data.status === 'on') {
          notification.success({
            message: 'Turn on device successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        } else {
          notification.success({
            message: 'Turn off device successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: 'server has an error!',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };

  const handleFakeApiSensor = () => {
    Axios.post('/api/sensor/push-data').then((res) => {
      console.log('res: ', res);
      if (res.status === 200) {
        setIsGetApi(!isGetApi);
      }
    });
  };

  useEffect(() => {
    if (fakeApi) {
      const loop = setInterval(() => {
        handleFakeApiSensor();
        setIsGetApi(!isGetApi);
      }, 5000);
      return () => clearInterval(loop);
    }
  }, [fakeApi, isGetApi]);

  const handleLock = () => {
    let status = door.status;
    let tmp = 'off';
    if (status === 'on') {
      tmp = 'off';
    } else {
      tmp = 'on';
    }
    if (status === 'open') {
      tmp = 'off';
    }

    Axios.patch(`/devices/17`, { status: tmp }, { headers: { Authorization: token } })
      .then((res) => {
        setDoor(res.data);
        if (res.data.status === 'off') {
          notification.success({
            message: 'Lock door successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        } else {
          notification.success({
            message: 'Open door successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: 'server has an error!',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };

  const findById = (id, arr) => {
    let index = -1;
    arr.map((item, i) => {
      if (item.id === id) {
        index = i;
      }
    });
    return index;
  };

  return (
    <div className="detail-room">
      <Row>
        <Col span={16}>
          <Row>
            <Col span={6}>
              {airCondition === undefined ? (
                ''
              ) : (
                <Card
                  hoverable
                  // cover={<CgSmartHomeRefrigerator size={50} />}
                  cover={
                    <SiApacheairflow
                      size={50}
                      color="#518e1a"
                      className={airCondition.status === 'on' ? 'icon-air' : ''}
                    />
                  }
                >
                  <Switch
                    checkedChildren="on"
                    unCheckedChildren="off"
                    checked={airCondition.status === 'on' ? true : false}
                    onChange={(checked, event) => onChange(airCondition.id, checked, event)}
                  />
                  <Meta title={airCondition.name} />
                </Card>
              )}
            </Col>
            {/* <Col span={6}>
                            <Card
                                hoverable
                                // cover={<FaTemperatureHigh size={50} />}
                                cover={<FaRegLightbulb size={50} />}
                            >
                                <Switch
                                    checkedChildren="on"
                                    unCheckedChildren="off"
                                    defaultChecked
                                />
                                <Meta title="Floor lamp" />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                hoverable
                                // cover={<SiApacheairflow size={50} />}
                                cover={<FaLightbulb size={50} />}
                            >
                                <Switch
                                    checkedChildren="on"
                                    unCheckedChildren="off"
                                    defaultChecked
                                />
                                <Meta title="Track light" />
                            </Card>
                        </Col> */}
            {lights.map((item, index) => {
              return <LightItem item={item} />;
            })}
          </Row>
          {/* temp-3 */}
          <Row className="temp-3">
            <Col span={24}>
              <div className="image-room">
                <Carousel autoplay>
                  <div>
                    <div className="carousel-1" style={contentStyle}></div>
                  </div>
                  <div>
                    <div className="carousel-2" style={contentStyle}></div>
                  </div>
                  <div>
                    <div className="carousel-3" style={contentStyle}></div>
                  </div>
                  <div>
                    <div className="carousel-4" style={contentStyle}></div>
                  </div>
                </Carousel>
              </div>
            </Col>
          </Row>
        </Col>
        {/* col 2 */}
        <Col span={8}>
          <Row className="detail-2">
            <Col span={8}>
              {/* <Card hoverable cover={<GiDroplets size={50} />}>
                                <div style={{ fontSize: 40 }}>20%</div>
                            </Card> */}
              <div style={{ textAlign: 'center' }}>
                {humidity === undefined ? '' : <WaterWave height={96} title="humidity" percent={humidity} />}
              </div>
            </Col>
            <Col span={8} style={{ position: 'relative' }}>
              {/* <Card
                                hoverable
                                // cover={<FaTemperatureLow size={50} />}
                            > */}
              {/* <div style={{ fontSize: 40 }}>30°C</div> */}

              {temperature === undefined ? (
                ''
              ) : (
                <Pie
                  percent={temperature}
                  subTitle="T°"
                  // total="28°C"
                  total={temperature + '°C'}
                  height={120}
                  style={{ marginTop: 0 }}
                />
              )}
              {/* </Card> */}
            </Col>
            <Col span={8} style={{display: 'flex', alignItems: 'center'}}>
              <Switch
                style={{margin: 'auto'}}
                checkedChildren="test"
                unCheckedChildren="stop"
                checked={fakeApi ? true : false}
                onChange={(checked, event) => {
                  setFakeApi(!fakeApi);
                  handleFakeApiSensor();
                }}
              />
            </Col>
            <Col span={8} style={{ position: 'relative' }}>
              {door === undefined ? (
                ''
              ) : door.status !== 'off' ? (
                <div className="lock">
                  <BsFillUnlockFill size={60} onClick={handleLock} className="icon-lock" color="#0041ff" />
                </div>
              ) : (
                <div className="lock">
                  <BsFillLockFill size={60} onClick={handleLock} className="icon-lock" color="red" />
                </div>
              )}
            </Col>
          </Row>
          <Row className="detail-3">
            <Col span={24}>
              {/* <Card hoverable cover={<FaLightbulb size={50} />}>
                                <div style={{ fontSize: 30 }}>Detail</div>
                            </Card> */}
              <div className="info-room">
                <Row>
                  <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="title-detail">Detail of Room</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <TiDeviceDesktop size="20" />
                      &nbsp; Number of devices: 4
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ImPower size="20" />
                      &nbsp;Power: 220 V
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <AiFillCodeSandboxSquare size="20" />
                      &nbsp;Square: 50m
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RiCharacterRecognitionFill size="20" />
                      &nbsp;Ampe: 1,5 A
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="title-detail">Permisstion</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <FaUserSecret size="20" />
                      &nbsp;Leader: Dũng
                    </div>
                  </Col>
                  {/* <Col span={12}><div style={{marginLeft:18, marginTop: 20, display: 'flex', alignItems:'center'}}><TiDeviceDesktop size="20" />&nbsp;Rule : Control</div></Col>  */}
                </Row>
                <Row>
                  <Col span={24}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <FaUserNinja size="20" />
                      &nbsp;Members: Dũng, Đạt, Hiếu
                    </div>
                  </Col>
                  {/* <Col span={12}><div style={{marginLeft:18, marginTop: 20, display: 'flex', alignItems:'center'}}><TiDeviceDesktop size="20" />&nbsp;Rule : Watch</div></Col>  */}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DetailRoomTest;
