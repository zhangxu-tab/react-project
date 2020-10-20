import React, { Component } from 'react';
import '../assets/css/play.scss';

import {query} from '../utils';

export default class Play extends Component {
    constructor(props) {
        super();
        this.state={
            id: props.match.params.id,
            //播放状态
            play: false,
            // 音乐播放控件的旋转角度
            deg: '-15deg',
            // 音乐详情
            info: {},
            // 音乐播放地址
            picUrl: '',
            // 歌词
            lyric: []
        }
    }

    // 切换播放状态
    toggle() {
        this.setState({
            play: !this.state.play,
            deg: this.state.play ? '-15deg' : 0
        },()=> {
            // audio的dom对象上有一个play()方法，可以实现音乐的播放
            // audio的dom对象上有一个pause()方法，可以暂停音乐的播放
            if(this.state.play) {
                this.audio.play();
            }else {
                this.audio.pause();
            }
        })
    }

    // 获取音乐详情
    async getDetail() {
        const res = await query(`/song/detail?ids=${this.state.id}`);
        if(res.code === 200) {
            // console.log(res);
            this.setState({info: res.songs[0].al});
        }
    }
    // 获取音乐播放地址
    async getPlayUrl() {
        const res = await query(`/song/url?id=${this.state.id}`);
        if(res.code === 200) {
            // console.log(res);
            this.setState({picUrl: res.data[0].url});
        }
    }

    // 获取歌词
    async getLyric() {
        const res = await query(`/lyric?id=${this.state.id}`);
        if(res.code === 200) {
            // console.log(res);
            this.setState({
                lyric: this.lyricFmt(res.lrc.lyric)
            })
            // console.log(this.state.lyric)
        }
    }
    // 歌词格式化
    lyricFmt(lyric) {
        const pattern = /(\[.*\])(.*)/g;
        const lyricArr = [];
        lyric.replace(pattern,(a,b,c) => {
            // console.log(a,b,c);
            lyricArr.push(c);
        })
        return lyricArr;
    }

    // 监听音乐视频的播放
    componentDidUpdate() {
        this.audio.ontimeupdate = function() {
            console.log('ontimeupdate');
        }
    }

    componentWillMount() {
        this.getDetail();
        this.getPlayUrl();
        this.getLyric();
    }

    render() {
        const controlStyle = {
            transform: 'rotate('+this.state.deg+')'
        }
        return (
            <div className="play-container">
                {/* 播放控件 */}
                <div style={controlStyle} className="play-controls"></div>
                <div className="play-wrap">
                    <img className={this.state.play ? 'run' : ''} src={this.state.info.picUrl} alt=""/>
                    <div className={['btn',this.state.play ? 'btn-pause' : 'btn-play'].join(' ')} onClick={() => this.toggle()}></div>
                    {/* 音乐播放控件 */}
                    <audio ref={(dom) => this.audio=dom} src={this.state.picUrl} style={{display:'none'}} controls></audio>
                </div>
                <div className="content">
                    {/* 歌词 */}
                    <h3>{this.state.info.name}</h3>
                    {this.state.lyric.map((item,index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
        )
    }
}
