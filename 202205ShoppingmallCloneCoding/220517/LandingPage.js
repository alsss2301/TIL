import React, { useCallback, useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) //어디서부터 데이터를 가져오는지에 대한 위치
    const [Limit, setLimit] = useState(8) // 처음 데이터를 가져올때와 더보기 버튼을 눌러서 가져올때 얼마나 많은 데이터를 한번에 가져오는지
    cosnt [PostSize, setPostSize] = useState(0)

    useEffect(()=> {

        let body = {
            skip: Skip,
            limit: Limit
        } //데이터를 8개만 가져올 수 있게 하는거

        getProduct(body)
        
    }, [])

    const getProduct = (body) => {
        axios.post("/api/product/products", body) // request보낼때, 8개만 보내주라고 body랑 같이 보냄
         .then(response => {
            if (response.data.success) {
                if(body.loadMore) {
                    /* 더보기 버튼을 눌렀을때는 */
                    setProducts([...Products, response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize) //사진이 더있냐에 따라 더보기 버튼 없애고 나오게 하는거.
            } else {
                alert("상품들을 가져오는데 실패했습니다.")
            } 
         })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit
                //   0  +  8
                //   8  +  8

        let body = {
            skip: skip, // Skip + Limit
            limit: Limit,
            loadMore: true //더보기눌렀을때 나오는 request라는 정보
        }
        
        getProduct(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}> 
            <Card
                cover={<ImageSlider images={product.images}/>} //가져온 데이터의 이미지 띄우기, 
            >
                <meta 
                    title={product.title}
                    description={`$${product.price}`} // 가격 
                />
            </Card>
        </Col>
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere<Icon type="rocket"/></h2>
            </div>

            {/* Filter */}

            {/* Search */}


            {/* Cards */}

            <Row gutter={[16, 16]} /*gutter여백넣기*/>
                {renderCards}
            </Row>

            <br/>

            {PostSize >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }

        </div>
    )
}

export default LandingPage

//Col, Row 화면 크기에 따라 자유자재로 사진 크기 조정 위한 