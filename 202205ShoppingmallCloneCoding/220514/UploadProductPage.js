import React, {useState} from 'react';
import {Typography, Button, Form, Input} from 'antd'; // ant디자인에서 가져오기
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const {TextArea} = Input;

const Continents = [
    {key:1, value:"Africa"},
    {key:2, value:"Europe"},
    {key:3, value:"Asia"},
    {key:4, value:"North America"},
    {key:5, value:"South America"},
    {key:6, value:"Austrailia"},
    {key:7, value:"Antarctica"}
]
function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
            setTitle(event.currentTarget.value)
        }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault() // 확인버튼을 누를때 화면이 refresh되지 않게 하기 위해
        
        if (!Title || !Description || !Price || !Continent || !Images) {
           return alert("모든 값을 넣어주셔야 합니다.") 
        }

        //서버에 채운 값들을 request로 보낸다.

        const body = {
            writer: props.user.userData._id, //로그인 된 사람의 ID
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }
        Axios.post("/api/product", body)
            .then(response => {
                if(response.data.success) {
                    alert("상품 업로드에 성공 했습니다.")
                    props.history.push('/') //상품업로드가 성공하면 / 경로로 이동됨.
                } else {
                    alert("상품 업로드에 실패 했습니다.")
                }
            })
    }

    return (
            <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom: '2rem'}}>
               <h2 level={2}>여행 상품 업로드</h2>
            </div>

            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격($)</label>
                <Input  type="number" onChange={priceChangeHandler} value={Price}/> 
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.value}> {item.value} </option>
                    ))} 
                </select>
                <br />
                <br />
                <Button>
                    확인
                </Button>

            </Form>
        </div>
    )
}

export default UploadProductPage

//type="number" 하면은 숫자 updown할 수 있는 화살표 생성됨.
//map 안에 item 은 {key:1, value:"Africa"} 객체 하나하나 의미함. 
//map()메소드는 콜백 함수에서 리턴한 값들을 기반으로 새로운 배열을 만드는 함수, 콜백함수를 쉽게 입력하고자 화살표함수를 사용하기도 함. 
//자바스크립트는 함수도 하나의 자료형이므로 매개변수로 전달할 수 있다. 이렇게 매개변수로 전달하는 함수를 콜백 함수라 한다. 