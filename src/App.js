import axios from 'axios';
import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css';

import AniNumber from './components/AnimationNumber/AniNumber';
import CustomModal from "./components/CustomModal";
// Images
import background from './img/BG_tv.png';
import congra from './img/congra.png';
// import goodluck from './img/goodluck.png';
import haoquang from './img/haoquang.png';
// import logo from './img/logo.svg';
// import title from './img/title.gif';
// import flower1 from './img/vienhoa1.png';
// import flower2 from './img/vienhoa2.png';

import IPconfigDialog from "./components/IPconfigDialog";
import _background from "./img2/BG.png";
import card from "./img2/Card.png";
import buttonImage from "./img2/Quay1.png";
import light from "./img2/Win Screen/light.png";
import congratulate from "./img2/Win Screen/win_award.gif";
import winBG from "./img2/test.png";
import PrizeList from "./components/PrizeList";
import Loader from 'react-loader-spinner';

var uniqueRandomArray = require('unique-random-array');

const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

var timer = 0;

const ipconfig = '192.168.0.179:3000';

const NUMBER_SQUARES = 6;
const DEFAULT_NUMBER_PRIZES = 1;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: {},
      codeDigits: Array(NUMBER_SQUARES).fill(0),
      // customerdata: {
      //   customer: []
      // },
      customerdata :[],
      lotteryCode :[],
      winnerCustomer :{},
      outOfCode:false,
      outOfGift:false,
      prizeInfo:"",
      numberOfPrizes: [{
				id:1,
				quantity:1,
				info: "01 cặp vé du lịch Singapore giành cho 02 người"
			},
			{
				id:2,
				quantity:1,
				info: "Sea Sun Sand Resort & Spa - Phuket"
			},
			{
				id:3,
				quantity:2,
				info: "Impiana Resort Patong - Phuket "
			}],
      loading:false,
      show: false,
      check_data: false,
      listGift: [],
      pickedGift: null,
      _customerdata: [],
      gift_topic: "Chọn giải thưởng",
      numberOfprize: [0, 0, 1],
      numberOfGold: 2,
      error: false,
      check_data1 : false,
    }
  }

  componentDidMount() {
    localStorage.setItem("giftHistory","");

  }

  getLuckyNumber() {
    if (this.state.lotteryCode.length === 0) {
      this.setState({check_data1: true});
      return;
    }
    this.interval = setInterval(() => this.createAnimationUpdate(), 1);
  }

  createAnimationUpdate() {
    //chạy hiệu ứng
    this.setState({
      codeDigits: convertNumberToArrayDigits(getRandomInt(1, 99999))
    });
   
    //hết hiệu ứng show ra kết quả thật
    timer++;
    if (timer > 200) {
      timer = 0;
      clearInterval(this.interval);

      //lấy khách hàng trúng thưởng
      console.log(this.state.lotteryCode);
      const luckyFunction = uniqueRandomArray(this.state.lotteryCode);
      const lucky = luckyFunction();
      for(let i =0;i<this.state.customerdata.length;i++)
      {
        if(lucky === this.state.customerdata[i].visitor.attributes.visitorCode)
            { 
              this.setState({winnerCustomer:this.state.customerdata[i]});
              let checkDigitCode;
              let length = (this.state.customerdata[i].visitor.attributes.visitorCode.length);
              // console.log(length);
              let cloneData =   this.state.customerdata[i].visitor.attributes.visitorCode;   
              // console.log(cloneData);
              if (length === 3)
                checkDigitCode = convertNumberToArrayDigits("00"+cloneData);
              else if (length === 2)
                checkDigitCode = convertNumberToArrayDigits("000"+cloneData);
              else if (length === 1)
                checkDigitCode = convertNumberToArrayDigits("0000"+cloneData);
              this.setState({codeDigits:checkDigitCode})
              setTimeout(()=>{this.setState({show:true})},1000);
              return;
            }    
      }
    }
  }

  handleClose() {
    console.log(this.state.lotteryCode,"state cũ");
    //axios post xác nhận phần thưởng
    // this.getDataphase2();
    let deleteIndex = [];
    let cloneState;
    for (let i = 0;i<this.state.lotteryCode.length;i++) {
      if (this.state.lotteryCode[i] === this.state.winnerCustomer.visitor.attributes.visitorCode)
        deleteIndex.push(i);
    }
    cloneState = [...this.state.lotteryCode];
    let length = deleteIndex.length;
    for (let i =0;i<length;i++)
    {
      cloneState.splice(deleteIndex[i],1);
      i --;
      length --;
    }
    this.setState({ show: false });
    this.setState({lotteryCode:cloneState });
    console.log(cloneState,"state mới");
    console.log(this.state.winnerCustomer.visitor.attributes.visitorCode);
    let clonePrizeState = this.state.numberOfPrizes;
    let prize;
    if (localStorage.getItem("prize") === "3") {
      clonePrizeState[2].quantity --;
      prize = "giải khuyến khích 2";
    } else if(localStorage.getItem("prize") === "2") {
      clonePrizeState[1].quantity --;
      prize = "giải khuyến khích 1";
    } else if(localStorage.getItem("prize") === "1") {
      clonePrizeState[0].quantity --;
      prize = "giải đặc biệt";
    }
    let customerdata = this.state.winnerCustomer
    let info = `name: ${customerdata.visitor.displayName} phone: ${customerdata.visitor.phone} prize:${localStorage.getItem("prize")}   `;
    let history = localStorage.getItem("giftHistory");
    history += info;
    localStorage.setItem("giftHistory",history);

  }

  async getDataphase2(){
    // console.log(this.state.customerdata.customer);

    // const test = await axios.post(`http://${ipconfig}/api/v1/update-winner-info`,{
    //   winnerCode : this.state.customerdata.customer
    // })

    // if (test.data !== null) {
    //   axios.get(`http://${ipconfig}/gift/find?gameType=lucky%20number`)
    //   .then(res => {
    //     const listGiftData1 = res.data;
    //     this.setState({ listGift: listGiftData1 });
    //     console.log(res.data);

    //   });
    // }
    let deleteIndex = [];
    let cloneState;
    for(let i = 0;i<this.state.lotteryCode.length;i++)
    {
      if(this.state.lotteryCode[i] === this.state.winnerCustomer.visitor.attributes.visitorCode)
        deleteIndex.push(i);
    }
    cloneState = [...this.state.lotteryCode];
    let length = deleteIndex.length;
    for (let i =0;i<length;i++)
    {
      cloneState.splice(deleteIndex[i],1);
      i --;
      length --;
    }
    this.setState({lotteryCode:cloneState });

    let customerdata = this.state.winnerCustomer
    let info = `name: ${customerdata.visitor.displayName} phone: ${customerdata.visitor.phone} prize: ${localStorage.getItem("prize")}`;
    let history = localStorage.getItem("giftHistory");
    history += info
    localStorage.setItem("giftHistory",history);
    console.log(localStorage.getItem("giftHistory"));
  }

  handleRespin() {
    console.log(this.state.lotteryCode,"state cũ");
    let deleteIndex = [];
    let cloneState;
    for (let i = 0;i<this.state.lotteryCode.length;i++) {
      if (this.state.lotteryCode[i] === this.state.winnerCustomer.visitor.attributes.visitorCode)
        deleteIndex.push(i);
    }
    console.log(this.state.winnerCustomer.visitor.attributes.visitorCode);
    // console.log(deleteIndex);
    cloneState = [...this.state.lotteryCode];
    let length = deleteIndex.length;
    for (let i =0;i<length;i++)
    {
      cloneState.splice(deleteIndex[i],1);
      i --;
      length --;
    }
    
    this.setState({ show: false,lotteryCode:cloneState });

    let customerdata = this.state.winnerCustomer
    let info = `name: ${customerdata.visitor.displayName} phone: ${customerdata.visitor.phone} prize:Absent   `;
    let history = localStorage.getItem("giftHistory");
    history += info;
    localStorage.setItem("giftHistory",history);
    console.log(cloneState,"state mới");
  }

  getIdOfGiftGold = () => {
    this.state.listGift.map(gift => {
      if (gift.brandName === "Gigamall")
        this.setState({
          pickedGift: gift.id,
          gift_topic: "1 chỉ vàng 9999"
        })
    });
  }

  getIdOfGiftVoucher = () => {
    this.state.listGift.map(gift => {
      if (gift.brandName === "Nitipon")
        this.setState({
          pickedGift: gift.id,
          gift_topic: "Voucher Nitipon" })
    });

  }

  handleClose4 = () => {
    this.setState({check_data1:false});
  }

  CloseOutCode = ()=>{
    console.log("??");
    this.setState({outOfCode:false});
  }

  CloseOutOfGift = ()=>{
    this.setState({outOfGift:false});
  }

  changePrizeInfo =(data)=>{
    this.setState({prizeInfo:data});
  }
  fetchData = async (ipAdress)=>{
    console.log(ipAdress);
    this.setState({loading:true});
    await axios.get(`http://${ipAdress}/api/v1/first/events/8237150364214756356/invitees/allCheckedin`)
    .then(res => {
      const data = res.data.data;
      console.log(res.data.data);
      this.setState({customerdata:res.data.data});
      for(let i =0;i<data.length;i++)
      {
        for(let y=0; y< parseInt(data[i].visitor.attributes.point);y ++ )
        {
          this.setState({lotteryCode:[...this.state.lotteryCode,`${data[i].visitor.attributes.visitorCode}`]});
        }
      }
    }).catch(error=>{
      this.setState({loading:false});
      alert("request data time out, check connection to server");
    });
    // await axios.get(`https://5d67957c6847d40014f66171.mockapi.io/visitors`)
    // .then(res=>{
    //   for(let i =0;i<res.data.length;i++)   
    //     this.setState({lotteryCode:[...this.state.lotteryCode,`${res.data[i]}`]});      
    // });
    
    console.log(this.state.lotteryCode);
    this.setState({loading:false});
  }

  render() {
    const digits = this.state.codeDigits;
    return (
      this.state.loading === true ? (
        <div style={{marginLeft:"45%",marginTop:"10%"}}>
          <Loader style={{width:"50%",height:"30%"}}></Loader>
        </div>
      ):(
      <div className="App">
        {/* <CustomerLogo logo={logo} name="vpbank"/> */}
        {/* <AppTitle image={title}/> */}


        <div style={{position:"absolute", top:"35%", left:"32%"}}>
          <AniNumber value={digits[0]} ></AniNumber>
          <AniNumber value={digits[1]} ></AniNumber>
          <AniNumber value={digits[2]} ></AniNumber>
          <AniNumber value={digits[3]} ></AniNumber>
          <AniNumber value={digits[4]} ></AniNumber>
        </div>
        <div style={{textAlign:'right'}} >
          <img src={card} style={{position:"relative",marginTop:"21%"}} alt="card"></img>
        </div>
        

        <div>
          <br></br>
          <br></br>
          <PrizeList
            numberOfPrizes={this.state.numberOfPrizes}
            changePrizeInfo={(data)=>{this.changePrizeInfo(data)}}
          />
          {this.state.prizeInfo.length !== 0 ? (<div style={{position:"absolute",top:"58%",left:"40.5%",fontSize:"16px",width:"400px",fontWeight:"bold",textAlign:"center"}} >{this.state.prizeInfo}</div>):null}   
          <Button
            variant="success"
            style={{backgroundColor:"transparent", width:"146px", height: "84px",position:"absolute",top:"62%",left:"46.5%",backgroundImage: "url(" + buttonImage + ")" }}
            onClick={() => this.getLuckyNumber()}
          />
        
          <Modal
            {...this.props}
            show={this.state.show}
            // show={true}
            onHide={this.state.show}
            size="lg"
            centered
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modaltransition"
            style={{marginLeft:"5%"}}
          >
            <Modal.Body
              bsPrefix="default"
              style={{
                width:"617px",
                height:"426px",
                backgroundImage: `url(${winBG})`,
                // backgroundColor: "transparent",
                textAlign: "right",
                color: "red",
                fontFamily: "Lucida Console",
                textAlign: "center" }}
            >
              {/* <div>
                <img src={winBG} style={{position:"absolute",left:"30%"}}></img>
              </div> */}
              <div>
                <img src={congratulate} alt="congra" style={{ width: "70%",marginTop:"-30%" }}></img>
              </div>
              {/*connect with db của anh duy */}
              <div >
                <div >
                  <img
                    src={light}
                    alt="congra"
                    style={{
                      position: "absolute",
                      top: "-50%",
                      left: "-20%",
                      width: "150%",
                      animation: "App-logo-spin infinite 10s linear",zIndex:"-1" }}
                  />
                </div>
                <div className="container3">
                  <h4 style={{color:"white"}}>Họ và tên: {this.state.winnerCustomer.visitor === undefined ? ``:this.state.winnerCustomer.visitor.displayName} </h4>
                  {/* <h4> Số điện thoại: {this.state.winnerCustomer.visitor === undefined ? ``:this.state.winnerCustomer.visitor.phone}</h4> */}
                  <h4 style={{color:"white"}}> Mã dự thưởng:{this.state.winnerCustomer.visitor === undefined ? ``:this.state.winnerCustomer.visitor.attributes.visitorCode} </h4>
                  {/* <h4> Tên cửa hàng: {this.state._customerdata.storeName}</h4> */}
                </div>
              </div>
              {/*connect with db của anh khoa */}
              <br></br>
              {/* {this.state.customerdata.customer.map(customer =>{
                return ( <div>
                  <div >
                <img src={haoquang} alt="congra" style={{position:"absolute",top:"-5%",left:"30%", width: "40%" ,animation:"App-logo-spin infinite 10s linear"}}></img>
                </div>

                <div className="container3"><h4>Họ và tên: {customer.name} </h4>
                  <h4> Số điện thoại: {customer.phoneNumber}</h4>
                  <h4> Mã hóa đơn: {customer.qrCode}</h4>
                  <h4> Tên cửa hàng: {customer.shopName}</h4>
                </div>

                </div>)
              })}  */}

              <br></br>
              <br></br>
              <Button
                style={{color:"white",position:"absolute",top:"80%",left:"30%"}}
                variant="success"
                onClick={() => this.handleRespin()}>
                  Quay lại
              </Button>
              <Button
                variant="success"
                style={{marginLeft:"5%",color:"white",position:"absolute",top:"80%",left:"50%"}}
                onClick={() => this.handleClose()}>
                  Xác nhận
              </Button>
            </Modal.Body>

            {/* <Modal.Footer
              bsPrefix="default"
              style={{
                // backgroundImage: `url(${background})`,
                backgroundColor: "green",
                textAlign: "right",
                color: "red",
                fontFamily: "Lucida Console",
                textAlign: "center"
              }}>
              
            </Modal.Footer> */}

          </Modal>
         
        <div style={{textAlign:"left",position:"absolute",top:"92.3%"}}>
          <IPconfigDialog 
            fetchData={(ipAdress)=>{this.fetchData(ipAdress)}}
          />
        </div>
         
          {/*hết quà */}
         <CustomModal 
            show ={this.state.outOfGift}
            content="Đã hết quà"  
            onCancel = {()=>this.CloseOutOfGift}
         />
          {/*hết code dự thưởng*/}
         <CustomModal
            show={this.state.outOfCode}
            content="Đã hết code dự thưởng"
            onCancel = {()=>this.CloseOutCode}
         />   
         
        </div>
      </div>
      )
    );
  }
}

function Decoration(props) {
  return (
    <img
      className="Decoration"
      src={props.image}
      style={{
        position: "absolute",
        top: props.style.top,
        left: props.style.left,
        width: props.style.width,
        height: props.style.height
      }}
      alt="decor-item"
    />
  )
}

/**
 *Show vertically centered popup information
 *
 * @param {*} props
 * @returns React.Component Modal
 */
function Popup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <Modal
      {...this.props}
      show={this.state.check_data1}
      onHide={this.state.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        bsPrefix="default"
        style={{
          backgroundColor: "pink",
          color: "red",
          fontFamily: "Lucida Console",
          textAlign: "center" }}
      >
        <p>Đã hết code dự thưởng</p>
      </Modal.Body>

      <Modal.Footer
        bsPrefix="default"
        style={{
          backgroundColor: "pink",
          color: "red",
          fontFamily: "Lucida Console",
          textAlign: "center" }}>
        <Button
          variant="outline-danger"
          onClick={() => this.handleClose4()} >
            Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


function convertNumberToArrayDigits(n) {
  return Array.from(String(n), Number);
}

export default App;
