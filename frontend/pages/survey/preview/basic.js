import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/ui/PageTitle';
import SurveyPreview from "../../../components/ui/survey/SurveyPreview";
import axios from "axios";
import { useRecoilState } from "recoil";
import { glbSvyContentsState } from "../../../atoms/glbSvyContents.js";

// 설문 참여 페이지
const BasicPreview = () => {
    const router = useRouter();
    const [query, setQuery] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [svyContents, setSvyContents] = useState(null);
    const [svyResContents, setSvyResContents] = useState(null);
    const [isModify, setIsModify] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [glbSvyContents, setGlbSvyContents] = useRecoilState(glbSvyContentsState);



    useEffect(() => {
        setLoading(true)
        getQuery();
    }, [query])

    if (isLoading) return <div>Loading</div>;
    if (query == undefined) return <div>Loading</div>;
    if (svyContents === undefined || !svyContents) return <div>Loading</div>;

    async function getQuery(){
        try{
            setQuery(router.query);
            if(query){
                if (!query.hasOwnProperty("svyResId") && !query.hasOwnProperty("svyContent")) {
                    // 설문 목록에서 실행한 미리보기인 경우
                    await getSurvey(query.svyId);
                    // console.log("목록 미리보기인 경우");
                    setLoading(false);
                } else if (query.hasOwnProperty("svyResId")) {
                    // 설문 결과에서 실행한 미리보기인 경우
                    await getSurvey(query.svyId);
                    setSvyResContents(JSON.parse(query.svyResContents));
                    setIsResult(true);
                    setLoading(false);
                } else {
                    // 설문 생성에서 실행한 미리보기인 경우
                    setSvyContents(JSON.parse(query.svyContent));
                    // console.log("생성에서 미리보기인 경우");
                    setLoading(false);
                    setIsModify(false);
                }
            }
            setLoading(false);

        }catch (e) {
            console.log(e);
        }
      }

    async function getSurvey() {
        try {
            const svyContents = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + query.svyId);
            setSvyContents(svyContents.data);
            setLoading(false);
            return svyContents;
        } catch (e) {
            console.log(e);
        }
    }

    async function getCreateSurvey() {
        try {
            setSvyContents(JSON.parse(JSON.parse(JSON.stringify(query)).svyContent));
            setLoading(false);
            return svyContents;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <PageTitle title={isResult ? "설문결과" : "설문 미리보기"}/>
            <SurveyPreview svyContents={svyContents} preURL={router.query.preURL} svyId={router.query.svyId} svyResContents = {svyResContents} isModify ={isModify}/>
        </>
    );
};

// export async function getServerSideProps(context) {

//     const svyContent = context.query.svyContent;
//     const preURL = context.query.preURL;

//     return {
//         props: {
//             svyContent: svyContent,
//             preURL: preURL
//         },
//     };
// }

export default BasicPreview;
