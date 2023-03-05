import axios from "axios";
import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Dialog, Disclosure, Tab, Transition} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/20/solid";
import QboxQuestion from "../survey/input/QboxQuestion";
import {Pagination} from "@mui/material";
import Image from "next/future/image";
import logoIcon from "../../../public/img/mixed.png";

const FindUserEmail = ({show, onHide, init}) => {
    const userEmail = useRef("");
    //오류메시지 상태저장
    const emailMessage = useRef("")
    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false)
    const [isExist, setIsExist] = useState(false)
    const [isChecking, setIsChecking] = useState(false)

    useEffect(()=>{
        if(init){
            emailMessage.current = ''
            init = false
        }
    })

    const onEmailChange = (e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        userEmail.current = e.target.value;
        console.log("Email : "+userEmail.current);

        if (!emailRegex.test(userEmail.current)) {
            emailMessage.current = '이메일 형식이 틀렸어요. 다시 확인해주세요😢'
            // setEmailMessage('이메일 형식이 틀렸어요. 다시 확인해주세요😢')
            setIsEmail(false)
        } else {
            emailMessage.current ='올바른 이메일 형식이에요 ✅'
                // setEmailMessage('올바른 이메일 형식이에요 ✅')
            setIsEmail(true)
        }
    };

    async function isMember(){
        emailMessage.current = ""
        // setEmailMessage('')
        const data = new Object();
        data.email = userEmail.current;
        try{
            const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/isMember',data);
            return result;
        }catch (e) {
            console.log(e);
        }
    }

    function checkEmail(){
        isMember().then(r =>{
            const result = r.data.username
            // console.log("Result : "+ result)
            if(isChecking)
                setIsChecking(false)
            else
                setIsChecking(true)
            //계정이 없을 때
            if(!result){
                emailMessage.current ='등록 되지 않은 메일입니다. 회원가입을 진행해주세요🤗'
                    // setEmailMessage('등록 되지 않은 메일입니다. 회원가입을 진행해주세요🤗')
                setIsExist(false)
            }else{
                emailMessage.current ='이미 가입 된 메일입니다. 비밀번호를 잊으셨다면 비밀번호를 재설정 해주세요🙇‍♀️'
                    // setEmailMessage('이미 가입 된 메일입니다. 비밀번호를 잊으셨다면 비밀번호를 재설정 해주세요🙇‍♀️')
                setIsExist(true)
            }
        })
    }

    return(
        <Transition appear show={show} onHide={onHide} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onHide}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="w-full rounded-xl p-3 max-w-md rounded-xl space-y-5 bg-fdyellowbright">
                                <div>
                                    <Image
                                        className="mt-8 w-40 h-auto mx-auto"
                                        src={logoIcon}
                                        alt="FormDuo"
                                    />
                                    <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-fdbluedark">
                                        계 정 확 인
                                    </h2>
                                </div>
                                <form className="space-y-2" method="POST">
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div className="-space-y-px rounded-md shadow-sm">
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">
                                                email
                                            </label>
                                            <input
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="relative block w-full appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-neutral-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Email address"
                                                onChange={onEmailChange}
                                            />
                                            {userEmail.current.length > 0 && <span className={`message ${!isEmail ? ' text-xs' : !isExist ? ' text-xs':' text-xs'}`}>{emailMessage.current}</span>}
                                            <div className="mt-2 p-2 grid grid-cols-2 divide-x">
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick ={checkEmail}
                                                        disabled={!isEmail}
                                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-fdbluedark py-2 px-4 text-sm font-medium text-white hover:bg-fdblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        계정 조회 하기
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick ={onHide}
                                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-fdbluedark py-2 px-4 text-sm font-medium text-white hover:bg-fdblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        닫기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

}
export default FindUserEmail