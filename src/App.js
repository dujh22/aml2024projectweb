import React from 'react';
import { Row, Col, Card, Carousel } from 'antd';
import './App.css';
import axios from 'axios'
import DPlayer from "react-dplayer";

function isMobile() {
  return window.innerWidth <= 768;
}

class AntdCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expand: false
    }
  }

  render() {
    const item = this.props.item
    const year = this.props.year
    const status = this.props.status || {}
    const healthy = status.status_code && status.status_code >= 200 && status.status_code < 300
    const sick = status.status_code && status.status_code >= 400
    const access = status.count
    let cover = undefined
    const renderPic = (pic, idx) => {
      const dplayerOptions = {
        video: { url: `${process.env.PUBLIC_URL}/img-compressed/${year}/${pic}` }
      }
      if (year === 2024 && pic === "music-0.mp4") {
        dplayerOptions["video"]["pic"] = `${process.env.PUBLIC_URL}/img-compressed/2024/music-0.png`
      }
      if (pic.toLowerCase().endsWith('.mp4')) {
        return <div className="cover-img" key={idx}>
          {/* <video width="100%" controls>
            <source src={ `${process.env.PUBLIC_URL}/img-compressed/${year}/${pic}` } type="video/mp4" />
          </video> */}
          <DPlayer
            options={dplayerOptions}
          />
        </div>
      } else {
        return <div className="cover-img" key={idx}>
          <div className="cover-inner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img-compressed/${year}/${pic})` }}></div>
        </div>
      }
    }
    // {
    //   return <div className="cover-img" key={idx}>
    //   <div className="cover-inner" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img-compressed/${year}/${pic})`}}></div>
    // </div> }
    if (item.imgs.length === 1) cover = renderPic(item.imgs[0])
    else if (item.imgs.length > 1) cover = <Carousel autoplay={true} dotPosition="right">
      {item.imgs.map(renderPic)}
    </Carousel>
    return <Col ref={(e) => {this.el = e}} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
      <div className="card-wrapper" style={{maxHeight: this.state.expand ? "none" : 480}}>
      <Card cover={cover && <div className="cover-container">{cover}</div>}>
        <Card.Meta title={<div className="card-meta-title-group">
          {/* <div className="meta-header">
            {healthy && <div className="working-badge">&#9679;运行中</div>}
            {sick && <div className="stopped-badge">&#9632;已停止</div>}
            {!healthy && !sick && <div className="unknown-badge">&#11042;未知</div>}
            {access && access >= 0 && <div className="card-meta-access-count">访问次数:{access}</div>}
          </div> */}
          <div className="card-meta-title" onClick={() => {if (item.href && item.href.length > 0) window.open(item.href, '_blank')}}>{item.title}</div>
          <div className="card-meta-author">{item.author}</div>
        </div>} description={
          <div className="card-meta-description" onClick={() => this.setState({expand: !this.state.expand})}>{item.description}</div>
        }
        />
        {!this.state.expand && <div className="card-wrapper-bottom"></div>}
      </Card>
      </div>
    </Col>
  }

}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      year: 2024,
      cnt: 2024,
      loading: true
    }
    this.dataCache = {};
  }

  componentDidMount() {
    this.loadData(this.state.year);
    this.loadAccessCount();
  }

  loadData = async (year) => {
    this.setState({ loading: true, year: year });
    try {
      if (!this.dataCache[year]) {
        let data;
        data = await import(`./data${year}.json`);
        this.dataCache[year] = data.default;
      }
      this.setState({ data: this.dataCache[year], currentYear: year, loading: false });
    } catch (error) {
      console.error('Error loading data:', error);
      this.setState({ loading: false });
    }
  }

  loadAccessCount = () => {
    // axios.get('https://lab.aminer.cn/isoa-2021-web/api/all').then(resp => resp.data).then(obj => {
    //   if (obj.status) this.setState({ data: obj.data })
    // }).catch(err => { console.error(err) })
    // axios.get('https://lab.aminer.cn/isoa-2021-web/api/access').then(resp => resp.data).then(obj => {
    //   if (obj.status) this.setState({ cnt: obj.count })
    // }).catch(err => { console.error(err) })
  }

  renderYearSection = () => {
    // const years = [2024, 2025];
    const years = [2024];
    return (
      <div className="year-section">
        {years.map(year => (
          <span
            key={year}
            className={`year-item ${this.state.year === year ? 'active' : ''}`}
            onClick={() => this.loadData(year)}
          >
            {year}
          </span>
        ))}
      </div>
    );
  }

  render2025Content() {
    const data = this.state.data
    const epdata = data.filter(d => d.category === 'epidemic')
    const academicdata = data.filter(d => d.category === 'academic')
    return (
      <>
        {!isMobile() && <hr className="separator" />}
        <div className="column">
          <div className="content">
            <div className="bar" id="epidemic-title">可视化专题</div>
            <Row type="flex">
              {epdata.map((item, idx) => <AntdCard key={idx} idx={idx} item={item} year={this.state.year} status={data[item.author]} />)}
            </Row>
          </div>
        </div>
        {!isMobile() && <hr className="separator" />}
        <div className="column">
          <div className="content">
            <div className="bar" id="academic-title">学术信息挖掘专题</div>
            <Row type="flex">
              {academicdata.map((item, idx) => <AntdCard key={idx} idx={idx} item={item} year={this.state.year} status={data[item.author]} />)}
            </Row>
          </div>
        </div>
        <div className="nav">
          <div className="nav-btn" style={{ background: "#cccccc" }}
            onClick={() => {
              const el = document.getElementById("intro-title")
              if (el) el.scrollIntoView()
            }}>简介</div>
          <div className="nav-btn" style={{ background: "#c9ffbf" }}
            onClick={() => {
              const el = document.getElementById("epidemic-title")
              if (el) el.scrollIntoView()
            }}>{isMobile() ? "可视化" : "可视化专题"}</div>
          <div className="nav-btn" style={{ background: "#c1ceff" }}
            onClick={() => {
              const el = document.getElementById("academic-title")
              if (el) el.scrollIntoView()
            }}>{isMobile() ? "学术" : "学术信息挖掘专题"}</div>
        </div>
      </>
    );
  }

  render2024Content() {
    const data = this.state.data
    return (
      <>
        {!isMobile() && <hr className="separator" />}
        <div className="column">
          <div className="content">
            <div className="bar" id="a-title">语言模型与推理</div>
            <Row type="flex">
              {data.filter(d => d.category === 'a').map((item, idx) => <AntdCard key={idx} idx={idx} item={item} year={this.state.year} status={data[item.author]} />)}
            </Row>
          </div>
        </div>
        {!isMobile() && <hr className="separator" />}
        <div className="column">
          <div className="content">
            <div className="bar" id="b-title">图像、视频与多模态模型</div>
            <Row type="flex">
              {data.filter(d => d.category === 'b').map((item, idx) => <AntdCard key={idx} idx={idx} item={item} year={this.state.year} status={data[item.author]} />)}
            </Row>
          </div>
        </div>
        {!isMobile() && <hr className="separator" />}
        <div className="column">
          <div className="content">
            <div className="bar" id="c-title">优化与推荐系统</div>
            <Row type="flex">
              {data.filter(d => d.category === 'c').map((item, idx) => <AntdCard key={idx} idx={idx} item={item} year={this.state.year} status={data[item.author]} />)}
            </Row>
          </div>
        </div>
        {!isMobile() && <hr className="separator" />}
        <div className="column">
          <div className="content">
            <div className="bar" id="d-title">教育、科学与医疗</div>
            <Row type="flex">d
              {data.filter(d => d.category === 'd').map((item, idx) => <AntdCard key={idx} idx={idx} item={item} year={this.state.year} status={data[item.author]} />)}
            </Row>
          </div>
        </div>
        {!isMobile() && <hr className="separator" />}
        <div className="column">
          <div className="content">
            <div className="bar" id="e-title">商业与应用</div>
            <Row type="flex">
              {data.filter(d => d.category === 'e').map((item, idx) => <AntdCard key={idx} idx={idx} item={item} year={this.state.year} status={data[item.author]} />)}
            </Row>
          </div>
        </div>

        <div className="nav">
          <div className="nav-btn" style={{ background: "#cccccc" }}
            onClick={() => {
              const el = document.getElementById("intro-title")
              if (el) el.scrollIntoView()
            }}>简介</div>
          <div className="nav-btn" style={{ background: "#ffe7ba" }}
            onClick={() => {
              const el = document.getElementById("a-title")
              if (el) el.scrollIntoView()
            }}>{isMobile() ? "互动" : "语言模型与推理"}</div>
          <div className="nav-btn" style={{ background: "#f4ffb8" }}
            onClick={() => {
              const el = document.getElementById("b-title")
              if (el) el.scrollIntoView()
            }}>{isMobile() ? "创作" : "图像、视频与多模态模型"}</div>
          <div className="nav-btn" style={{ background: "#bae7ff" }}
            onClick={() => {
              const el = document.getElementById("c-title")
              if (el) el.scrollIntoView()
            }}>{isMobile() ? "游戏" : "优化与推荐系统"}</div>
          <div className="nav-btn" style={{ background: "#efdbff" }}
            onClick={() => {
              const el = document.getElementById("d-title")
              if (el) el.scrollIntoView()
            }}>{isMobile() ? "学术" : "教育、科学与医疗"}</div>
          <div className="nav-btn" style={{ background: "#c9ffbf" }}
            onClick={() => {
              const el = document.getElementById("e-title")
              if (el) el.scrollIntoView()
            }}>{isMobile() ? "学术" : "商业与应用"}</div>
        </div>
      </>
    );
  }

  renderYearContent() {
    if (this.state.year === 2025) {
      return this.render2025Content();
    }

    else if (this.state.year === 2024) {
      return this.render2024Content();
    }
  }


  render() {
    return (
      <div className="App">
        <div className="header">高级机器学习AML</div>
        <div className="main-body">
          <div className="column">
            <div className="content">
              {this.renderYearSection()}
              <div className="bar" id="intro-title">简介</div>
              {this.state.year === 2025 &&
                <div className="intro-section">
                  <a href="https://www.aminer.cn/aml2024">“高级机器学习”</a>{"是清华大学计算机系研究生的课程之一，由"}<a href="http://keg.cs.tsinghua.edu.cn/jietang/" target="_blank" rel="noopener noreferrer">唐杰教授</a>授课。
                  在2024-2025年的AML课程中，同学们基于先进的LLM大语言模型和多模态技术，
                  各小组选取不同的方向，经过整个学期的努力，完成了一系列创新而有深度的项目。这些项目涵盖了语言模型与推理、图像与视频处理、推荐系统优化、
                  教育与医疗应用，以及商业与其他实际应用等多个领域，展示了理论研究和实际应用的强有力结合。
                </div>
              }
              {this.state.year === 2024 &&
                <div className="intro-section">
                  <a href="https://www.aminer.cn/aml2024">“高级机器学习”</a>{"是清华大学计算机系研究生的课程之一，由"}<a href="http://keg.cs.tsinghua.edu.cn/jietang/" target="_blank" rel="noopener noreferrer">唐杰教授</a>授课。
                  在2024年秋季的课程前半段，同学们基于 ChatGPT、<a href="http://chatglm.cn">ChatGLM</a> 等先进的语言模型和多模态技术，
                  各小组选取不同的方向，经过几周的努力，完成了一系列创新而有趣的项目提案。这些项目涵盖了语言模型与推理、图像与视频处理、推荐系统优化、
                  教育与医疗应用，以及商业与其他实际应用等多个领域，展示了先进技术在各个领域的广泛应用和巨大潜力。
                </div>
              }
            </div>
          </div>

          {this.renderYearContent()}
          
          <div className="footnote">
            {this.state.cnt && <p>历史访问次数： {this.state.cnt}</p>}
            <p>AML 2024 Fall <a href="https://keg.cs.tsinghua.edu.cn">@THU</a> Jinhua Du</p>
          </div>
        </div>
      </div>
    )
  }
};
