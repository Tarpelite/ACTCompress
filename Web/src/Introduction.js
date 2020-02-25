import React from 'react';
import logo from './logo.svg';
import { Container,Row,Col,  } from 'reactstrap';
import './App.css';
import Pmodal from "./Pmodal"

const Inro = (props) =>{
    return (
        <Container>
            <Row >
                <Col md="12">
                    <h3>教学视频压缩工具</h3>
                    <br></br>
                    <dl class="dl-left">
                    <dt>文件名称</dt>
                    <dd>Compress.exe</dd>
                    <dt>
                        文件大小
                    </dt>
                    <dd>
                        27.0 M
                    </dd>
                    <dt>
                        指导教师
                    </dt>
                    <dd>
                        李莹
                    </dd>
                    
                    <dt>
                        作者
                    </dt>
                    <dd>
                        虞世城  石浤浩
                    </dd>
                    
                    <dt>性能</dt>
                    <dd>支持各种主流视频格式文件压缩，压缩率可达3~10倍</dd>
                    <dt>联系方式</dt>
                    <dd>yushic@act.buaa.edu.cn</dd>
                    <dt>使用方法</dt>    
                    <dd>
                        <ol>
                           <li>请将需要压缩的视频文件与Compress.exe放置于同一目录下（支持多个不同类型视频文件压缩）</li> 
                           <li>文件名中请勿包含空格、&等特殊字符</li>
                           <li>运行Compress.exe，可将视频文件压缩为高、中、低三个等级的MP4文件，压缩后的MP4文件会自动存储在“压缩后”文件夹中</li>
                        </ol>
                    </dd>
                    <dt>注意事项</dt>
                    <dd> 若“压缩后”文件夹中已有经过压缩的同名视频，再次压缩会将其覆盖</dd>                
                    </dl>
                    <div>
                    <strong>copyright(C)2020-2021,北京航空航天大学计算机学院，大数据科学与脑机智能高精尖创新中心</strong>

                </div> 
                <Pmodal buttonLabel="获取下载链接" />
                </Col>

            </Row>
        </Container>
    )
};



export default Inro;