import React, { Component } from 'react';
import '../assets/css/search.scss';

import { Input, Divider, Row, Col, Button, List, message } from 'antd';
import { SearchOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { query } from '../utils';

import { Link } from 'react-router-dom';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            // 搜索关键词
            keyWords: '',
            // 热门搜索
            hotList: [],
            // 搜索结果
            songs: []
        }
    }

    // 获取热门搜索
    async getHots() {
        const res = await query('/search/hot');
        if (res.code === 200) {
            // console.log(res);
            this.setState({ hotList: res.result.hots });
        }
    }
    componentDidMount() {
        this.getHots();
    }

    // 点击搜索热词，更新keywords
    setKeywords(keyWords) {
        this.setState({keyWords},() => {
            this.search();
        })
    }

    // 搜索输入框的change事件处理函数
    keyWordsUpdate(event) {
        // console.log(event.target.value);
        const keyWords = event.target.value;
        this.setState({keyWords});
    }
    // 搜索输入框keyup事件的处理函数
    enter(event) {
        if(event.keyCode === 13) {
            // console.log('搜索');
            // 执行搜索操作
            this.search();
        }
    }
    // 搜索方法
    async search() {
        // 表单校验
        if(this.state.keyWords.trim() === '') {
            return message.warning('请输入搜索关键词');
        }
        const res = await query('/search?keywords='+this.state.keyWords);
        if(res.code === 200) {
            // 更新数据
            // console.log(res);
            this.setState({songs:res.result.songs});
        }
    }


    render() {
        return (
            <div className="search-container">
                <Input value={this.state.keyWords} onChange={(event) => {this.keyWordsUpdate(event)}} onKeyUp={(event) => {this.enter(event)}} size="large" placeholder="请输入搜索关键词" prefix={<SearchOutlined />} />
                <Divider />
                {/* 热门搜索词 */}
                <Row gutter={10}>
                    {
                        this.state.hotList.map(item => (
                            <Col key={item.first}>
                                <Button onClick={()=>{this.setKeywords(item.first)}}>{item.first}</Button>
                            </Col>
                        ))
                    }
                </Row>
                <Divider />

                {/* 搜索结果展示区域 */}
                <List
                    dataSource={this.state.songs}
                    renderItem={item => (
                        <List.Item
                            actions={[<PlayCircleOutlined onClick={() => this.props.history.push('/play/'+item.id)} style={{ fontSize: 22 }} />]}
                        >
                            <Link to={'/play/'+item.id} style={{color:'#333'}}>{item.name}</Link>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
