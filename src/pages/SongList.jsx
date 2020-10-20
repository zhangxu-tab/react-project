import React, { Component } from 'react';
// 导入样式文件
import '../assets/css/hot.scss';
// 导入图标
import { PlayCircleOutlined } from '@ant-design/icons';
import { Spin, List } from 'antd';

// 数据请求
import { query } from '../utils';

import { Link } from 'react-router-dom';

export default class SongList extends Component {
    constructor(props) {
        super();
        this.state = {
            // 热歌榜  info.playlist.tracks---音乐列表
            info: {},
            // 歌单id
            id: props.match.params.id
        }
    }

    // 获取歌单详情数据
    getHotInfo() {
        query('/playlist/detail?id='+this.state.id).then(res => {
            // console.log(res);
            if (res.code === 200) {
                // 更新数据
                setTimeout(() => {
                    this.setState({ info: res.playlist });
                }, 1000)
            }
        })
    }
    componentWillMount() {
        this.getHotInfo();
    }

    render() {
        // 音乐列表
        const playlist = this.state.info.tracks;
        // 样式对象
        const bannerStyle = {
            backgroundImage: "url('" + this.state.info.coverImgUrl + "')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
        return (
            <div className="hot-container">
                {
                    playlist && playlist.length > 0 ? (
                        <>
                            <div className="banner" style={bannerStyle}></div>
                            <List
                                bordered
                                dataSource={playlist}
                                header={this.state.info.name}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{fontSize: 22}}/>
                                        ]}
                                    >
                                        <Link to={'/play/'+item.id} style={{color:'#333'}}>{item.name}</Link>
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>
                }
            </div>
        )
    }
}
