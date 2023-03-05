import { LockClosedIcon } from '@heroicons/react/20/solid'
import Image from 'next/future/image';
import logoIcon from '../../public/img/mixed.png'
import Link from "next/link";
import {useRecoilState} from "recoil";
import {Fragment, useRef, useState} from "react";
import axios from "axios";
import {accToken} from '../../atoms/accToken'
import {refToken} from '../../atoms/refToken'
import { useRouter } from 'next/router'
import {getCookie, setCookie} from "cookies-next";
import {Dialog, Transition} from "@headlessui/react";
import FindUserEmail from "../../components/ui/account/FindUserEmail";

const SignIn =()=> {
    const router = useRouter();
    const userEmail = useRef("default");
    const userPw = useRef("default");
    const [acctoken,setAcctoken] = useRecoilState(accToken);
    const [reftoken,setReftoken] = useRecoilState(refToken);
    //로그인 오류 모달
    let [isFailOpen, setIsFailOpen] = useState(false)
    function closeFailModal() {
        setIsFailOpen(false)
    }
    function openFailModal() {
        setIsFailOpen(true)
    }
    const [isFindMailOpen, setIsFindMailOpen] = useState(false)
    //이메일 계정 조회 모달
    function openCheckEmail() {
        setIsFindMailOpen(true)
    }
    function closeCheckEmail() {
        setIsFindMailOpen(false)
    }

    const onEmailChange = (e) => {
        userEmail.current = e.target.value;
        // console.log("Email : "+userEmail.current);
    };
    const onPwChange = (e) => {
        userPw.current = e.target.value;
        // console.log("userPw : "+userPw.current);
    };

    async function reqLogin(){
        //로그인 입력 확인
        // console.log("userEmail : " + userEmail.current);
        // console.log("userPw : " + userPw.current);
        if(!userEmail.current){
            alert("이메일을 입력해주세요.");
            return <SignIn></SignIn>;
        }else if(!userPw.current){
            alert("비밀번호를 입력해주세요.");
            return <SignIn></SignIn>;
        }
        console.log("Login Request");

        //로그인 api 호출
        const data = new Object();
        // console.log("userEmail : " + userEmail.current);
        // console.log("userPw : " + userPw.current);
        data.email = userEmail.current;
        data.password = userPw.current;
        try{
            const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/v1/auth/login", data);

            // console.log("Result : " + JSON.stringify(result.data));
            // console.log("accessToken : "+ result.data["accessToken"]);
            // console.log("refreshToken : "+ result.data["refreshToken"]);
            // console.log(getCookie("access_token"))
            setAcctoken(result.data["accessToken"]);
            setReftoken(result.data["refreshToken"]);
            setCookie("accessToken",result.data["accessToken"])
            setCookie("refreshToken",result.data["refreshToken"])

            await router.push('/');
            return <></>;
        }catch(e){
            console.log(e);
            openFailModal();
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <Image
                            className="h-auto mx-auto w-60"
                            src={logoIcon}
                            alt="FormDuo"
                        />
                        <h2 className="mt-5 text-2xl font-bold tracking-tight text-center text-fdblue dark:text-fdyellowlight">
                            로 그 인
                        </h2>
                    </div>
                    <form className="mt-8 space-y-4" method="POST">
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
                                    className="relative block w-full px-3 py-2 text-neutral-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full px-3 py-2 text-neutral-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={onPwChange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between float-left">
                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={openCheckEmail}
                                >
                                    <a className="mr-2 font-bold text-fdbluedark hover:text-fdblue dark:text-neutral-200">
                                        계정 조회
                                    </a>
                                </button>
                                /
                                <Link
                                    href="/account/changePw"
                                >
                                    <a className="ml-2 font-bold text-fdbluedark hover:text-fdblue dark:text-neutral-200">
                                        비밀번호 재설정
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-between float-right">
                            <div className="text-sm">
                                <Link
                                    href="/account/signUp"
                                >
                                <a className="font-bold text-fdbluedark hover:text-fdblue dark:text-neutral-200">
                                    회원가입
                                </a>
                                </Link>
                            </div>
                        </div>

                        <div>
                                <button
                                    type="button"
                                    onClick={() => reqLogin()}
                                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-fdbluedark hover:bg-fdblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-fdyellowlight dark:text-neutral-700"
                                >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="w-5 h-5 text-fdbluelight group-hover:text-fdbluedark dark:text-neutral-700" aria-hidden="true" />
                </span>
                                    로그인
                                </button>
                        </div>
                    </form>
                </div>
            </div>

            {/*Email check Modal*/}
            <FindUserEmail show={isFindMailOpen} onHide={()=>{closeCheckEmail()}} init={true}/>

            {/*  signIn Fail Modal */}
            <Transition appear show={isFailOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeFailModal}>
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
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-extrabold leading-6 text-neutral-900"
                                    >
                                        ❗로그인 실패
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="justify-center text-sm text-neutral-500">
                                            로그인에 실패하였습니다! 확인 후 다시 로그인해주세요😢️
                                        </p>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                            onClick={closeFailModal}
                                        >
                                            닫기
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
};
export  default SignIn;