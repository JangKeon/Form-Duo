import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import {getCookie} from "cookies-next";
import Piechart from "./PieChart";

export default function Conversation(props) {
    
    const [good_motion, setGood_motion] = useState(0);
    const [bad_motion, setBad_motion] = useState(0);
    const [normal_motion, setNormal_motion] = useState(0);
    const [conv_end, setConv_end] = useState("!@!");
    var msg_Arr = [];

    const data = new Object();

    useEffect(()=>{
        init();
        getConversation()
        .then(()=>{
            if(conv_end != "!@!"){
                getEmotion2();
            }
        })
    }, [conv_end])

    useEffect(() => {
        
    }, [good_motion, normal_motion, bad_motion])

    async function init(){
        setBad_motion(0);
        setGood_motion(0);
        setNormal_motion(0);
    }

    async function getConversation() {
        axios.defaults.headers = {
            'Content-Type': "application/json",
            "Authorization": "Bearer " + getCookie("accessToken"),
        };
        axios.defaults.mode = "cors";
        axios.defaults.withCredentials = true;
        try {
            const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/v1/surveys/${props.cvId.convId}/resp`);
            msg_Arr = [];
            result.data.map(function(element){
                let messages = "";
                for ( let j = 0; j < element.svyRespContent.length; j++){
                    messages = messages + element.svyRespContent[j].ansVal[0].resp + '|'
                }
                msg_Arr.push(messages)
            })
            setConv_end("Conv Done");
        } catch (e) {
            return <error/>
        }
    }

    async function getEmotion2 () {
        getConversation(); 
        try{
            for (let i = 0; i < msg_Arr.length; i++){
                data.msg=msg_Arr[i];
                axios.defaults.headers = {
                    'Content-Type': "application/json",
                    "Authorization": "Bearer " + getCookie("accessToken"),
                };
                axios.defaults.mode = "cors";
                axios.defaults.withCredentials = true;
                const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/v1/conv', data);
                switch(result.data.emotion){
                    case "감정없음" : setNormal_motion((prevState) => prevState+1); break;
                    case "놀람" : setGood_motion((prevState) => prevState+1); break;
                    case "두려움" : setBad_motion((prevState) => prevState+1); break;
                    case "불확실" : setNormal_motion((prevState) => prevState+1); break;
                    case "슬픔" : setBad_motion((prevState) => prevState+1); break;
                    case "싫음" : setBad_motion((prevState) => prevState+1); break;
                    case "좋음" : setGood_motion((prevState) => prevState+1); break;
                    case "지루함" : setBad_motion((prevState) => prevState+1); break;
                    case "창피함" : setNormal_motion((prevState) => prevState+1); break;
                    default : console.log("Switch Error")
                }
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <p className="lg:text-center mt-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl">
                    응답 발화 분석 차트
                </p>
            <Piechart 
            good_motion = {good_motion}
            bad_motion = {bad_motion}
            normal_motion = {normal_motion}
            />
        </div>    
    )
}

/*

import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import {getCookie} from "cookies-next";
import Piechart from "./PieChart";
import error from "./Error";

export default function Conversation(props) {
    
    const [msg, setMsg] = useState("!@!")
    const [allResp, setAllResp] = useState(0);
    const [good_motion, setGood_motion] = useState(0);
    const [bad_motion, setBad_motion] = useState(0);
    const [normal_motion, setNormal_motion] = useState(0);
    
    const API_KEY = "4c40dd27da9e877f7df64b6d77df572b"
    const API_URL = "https://a3d8fbea-c67e-4cac-8e14-f0af2ee1671f.api.kr-central-1.kakaoi.io/ai/conversation/a170a37cbdfd45b5883c82cf4552e324"
    const content_type = "application/json"
    
    // 0번째는 보통 1번째는 긍정적 2번째는 부정적

    const data = new Object();
    data.msg = msg;

    useEffect(() => {
        getConversation();
    }, [])

    useEffect(()=>{
        init();
        if(msg != "!@!"){
            getEmotion();
        }
    }, [msg])

    useEffect(() => {
        
    }, [good_motion, normal_motion, bad_motion])

    async function init(){
        setAllResp(0);
        setBad_motion(0);
        setGood_motion(0);
        setNormal_motion(0);
    }

    async function getConversation() {
        axios.defaults.headers = {
            'Content-Type': "application/json",
            "Authorization": "Bearer " + getCookie("accessToken"),
        };
        axios.defaults.mode = "cors";
        axios.defaults.withCredentials = true;
        // console.log("Survey ID : " + props.cvId);
        try {
            // default surveyId 191로 확인. 현재 주관식 문항 하나만 있는 설문에서만 사용 가능.
            // 그리고 현재 localhost:3000 or 공인아이피 둘 중 하나에서만 확인 가능. CORS 프록시 우회 IP가 하나밖에 설정이 안 됨.
            const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/v1/surveys/${props.cvId.convId}/resp`);
            let messages = "";
            // console.log(result)
            result.data.map(function(element){
                for (var i = 0; i < element.svyRespContent.length; i++){
                    messages = messages + element.svyRespContent[i].ansVal[0].resp + '|'
                }
                setAllResp((prevState)=> prevState + 1)
            })
            setMsg(messages)
            // console.log(messages) // 정상
        } catch (e) {
            return <error/>
        }
    }

    async function postData (d) {
        axios.defaults.headers = {
            "x-api-key": API_KEY,
            'Content-Type': content_type,
        };
        axios.defaults.mode = "cors";
        axios.defaults.withCredentials = false;
        try {
            const msgAnalysis = await axios.post(`https://keon-proxy.herokuapp.com/${API_URL}`, d, {
            maxBodyLength:2000,
            maxContentLength:2000
        });
          //console.log(msgAnalysis)
          return msgAnalysis
        } catch (error) {
          console.log(error)
        }
      }
      
      async function getEmotion(){
        postData(data).then(r => {
            // console.log(r.data)    
            for (var i = 0; i < allResp; i++){
                switch(r.data[i].emotion.value){
                    case "감정없음" : setNormal_motion((prevState) => prevState+1); break;
                    case "놀람" : setGood_motion((prevState) => prevState+1); break;
                    case "두려움" : setBad_motion((prevState) => prevState+1); break;
                    case "불확실" : setNormal_motion((prevState) => prevState+1); break;
                    case "슬픔" : setBad_motion((prevState) => prevState+1); break;
                    case "싫음" : setBad_motion((prevState) => prevState+1); break;
                    case "좋음" : setGood_motion((prevState) => prevState+1); break;
                    case "지루함" : setBad_motion((prevState) => prevState+1); break;
                    case "창피함" : setNormal_motion((prevState) => prevState+1); break;
                    default : console.log("Switch Error")
                }
            }
        });
    }

    return (
        <div>
            <p className="lg:text-center mt-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl">
                    응답 발화 분석 차트
                </p>
            <Piechart 
            good_motion = {good_motion}
            bad_motion = {bad_motion}
            normal_motion = {normal_motion}
            />
        </div>    
    )
}
*/