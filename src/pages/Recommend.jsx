import React, { Component } from 'react';
import '../assets/css/recommend.scss';

import {Link} from 'react-router-dom';

// 导入数据请求方法
import { query } from '../utils';

import { Carousel, Row, Col, Card, List, Spin } from 'antd';
// 导入icon图片
import { PlayCircleOutlined } from '@ant-design/icons';
const { Meta } = Card;

export default class Recommend extends Component {
    constructor() {
        super();
        this.state = {
            // 轮播图
            banner: [],
            // 推荐歌单
            recommendList: [],
            // 最新音乐
            newSong: []
        }
    }

    // 获取轮播图列表数据的方法
    getBanner() {
        query('/banner').then(res => {
            if (res.code === 200) {
                // console.log(res);
                // 更新数据
                this.setState({ banner: res.banners });
            }
        })
    }

    // 获取歌单
    getRecommendList() {
        query('/personalized?limit=9').then(res => {
            // console.log(res);
            if (res.code === 200) {
                this.setState({ recommendList: res.result });
            }
        })
    }

    // 获取最新音乐
    getNewSongs() {
        query('/personalized/newsong').then(res => {
            // console.log(res);
            if (res.code === 200) {
                this.setState({ newSong: res.result });
            }
        })
    }

    componentWillMount() {
        this.getBanner();
        this.getRecommendList();
        this.getNewSongs();
    }

    render() {
        const { banner, recommendList, newSong } = this.state;
        const { push } = this.props.history;
        return (
            <div className="recommend-container">
                {
                    banner && recommendList && newSong ? (
                        <>
                            {/* 轮播图 */}
                            <Carousel autoplay>
                                {
                                    banner.map(item => (
                                        <div key={item.targetId}>
                                            <img src={item.imageUrl} title={item.typeTitle} alt={item.typeTitle} />
                                        </div>
                                    ))
                                }
                            </Carousel>
                            {/* 歌单推荐 */}
                            <div className="section">
                                <h3>推荐歌单</h3>
                                <Row gutter={10}>
                                    {
                                        recommendList.map(item => (
                                            <Col span={8} key={item.id} onClick={() => push('/songlist/' + item.id)}>
                                                <Card
                                                    hoverable
                                                    cover={<img alt="example" src={item.picUrl} />}
                                                >
                                                    <Meta title={item.name} description={item.copywriter.substr(0, 5)} />
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </div>
                            {/* 新歌推荐 */}
                            <div className="section">
                                <h3>新歌推荐</h3>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={newSong}
                                    renderItem={item => (
                                        <List.Item
                                            actions={[
                                                <PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{ fontSize: 22 }} />
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={<Link to={"/play/"+item.id}>{item.name}</Link>}
                                                description={item.song.alias[0]}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </>
                    ) : <div style={{textAlign:'center',marginTop:20}}><Spin size="large"/></div>
                }
            </div>
        )
    }
}
