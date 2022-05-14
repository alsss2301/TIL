import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';
import { OmitProps } from 'antd/lib/transfer/renderListBody';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData(); // FormData안에는 전달하는 파일의 정보
        const config = {
            header: { 'content-type': 'multipart/fomr-data'} // header에 파일의 contenttype을 전해줌
        }        
        formData.append("file", files[0])

        axios.post('./api/product/image', formData, config)
            .then(response => {
                if(response.data.success) {
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                
                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image) //클릭한 이미지의 인덱스

        let newImages = {...Images}
        newImages.splice(currentIndex, 1) //0부터 시작해서 하나의 아이템(, 1)을 newImages라는 배열에서 지워준다는 의미.
        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <div 
                    style={{
                        width: 300, height: 240, border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }} 
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{fontSize:'3rem' }} />
                </div>
            )}
            </Dropzone>

            <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                
                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{minWidth: '300px', width: '300px', height: '240px'}}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                    ))}
            </div>
        </div>
    );
} 

export default FileUpload

//return 내용 https://react-dropzone.js.org/ 가져옴.
//multer라는 라이브러리로 프론트엔드가 전달해준 파일을 저장함, 백엔드는 파일을 저장하고 파일의 정보(위치등)를 프론트엔드에게 전달해줌.
//newImages.splice(currentIndex, 1) 파라미터의 첫번째는 배열 어디부터 지울건지, 두번째 파라미터는 배열 어디부터 "몇개" 지울건지 나타냄. 