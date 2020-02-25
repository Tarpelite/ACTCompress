import React, {useState} from 'react';

import {Button, Modal, ModalHeader, ModalBody, Form, Input, FormText, FormGroup, Label, ModalFooter,Row, Col} from 'reactstrap';


class Pmodal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modal:false,
      modal2:false,
      input1:"",
      input2:"",
      link1:"",
      link2:"",
      cnt:0
    };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.handleInput1change = this.handleInput1change.bind(this);
    this.handleInput2change = this.handleInput2change.bind(this);
    this.submit = this.submit.bind(this)
    this.getCnt = this.getCnt.bind(this)

  }
  
  componentDidMount(){
    this.getCnt()
  }
  toggle(){
    // console.log(state.modal)
    this.setState( state =>({
      modal: !state.modal
    })
      
    );
  }

  toggle2(){
    this.setState( state =>({
      modal2: !state.modal2
    })
      
    );
  }

  handleInput1change = (e) =>{
    this.setState({input1:e.target.value});
  }
  handleInput2change = (e) =>{
    this.setState({input2:e.target.value})
  }

  getCnt = ()=>{
    fetch("http://39.105.14.241:6974/download/get_cnt")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({cnt:responseJson.cnt})
    })
    .catch((error) => {
      console.error(error)
    })
  }

  submit = ()=>{
    console.log(this.state.input1)
    console.log(this.state.input2)
    if(this.state.input1.trim().length == 0  || this.state.input2.trim().length == 0){
      alert("请先填写学校和学院信息")
      return;
    }
    fetch("http://39.105.14.241:6974/download/submit", {
      method: "POST",
      headers:{
        Accept: 'application/json',
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        "s1":this.state.input1,
        "s2":this.state.input2
      })
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      this.setState({link1: responseJson.link1});
      this.setState({link2: responseJson.link2});
    })
    .catch((error) => {
      console.error(error)
    });

    this.setState( state =>({
      modal: !state.modal
    })
    );
    this.toggle2();
    this.getCnt();

  }
  download=()=>{
    this.toggle2();
    this.getCnt();
  }
  render(){
    return (
      <div>
      <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>填写信息并下载软件</ModalHeader>
        <ModalBody>
          <Form id="pform">
            <FormGroup>
              <Label for="input1">学校:</Label>
              <Input name="input1" id="input1" placeholder="例如:北京航空航天大学" onChange={this.handleInput1change}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="input2">院系:</Label>
              <Input name="input2" id="input2" placeholder="例如:计算机学院"  onChange={this.handleInput2change}></Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button form="pform" key="submit" color="primary" onClick={this.submit}>下一步</Button>
          <Button color="secondary" onClick={this.toggle}>返回</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.modal2} toggle={this.toggle2} className="下载页">
        <ModalHeader toggle={this.toggle2}>请选择软件类型</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6">
          <a href={this.state.link1}><Button outline color="primary" onClick={this.download}>Compress.exe(64位)</Button></a>
          </Col>
          <Col md="6">
          <a href={this.state.link2}><Button outline color="primary" onClick={this.download}>Compress.exe(32位)</Button></a>
          </Col>
          </Row>
        </ModalBody>
      </Modal>
      <address id="count">已下载次数: {this.state.cnt} 次</address>
    </div>
    )
  }

}

export default Pmodal;