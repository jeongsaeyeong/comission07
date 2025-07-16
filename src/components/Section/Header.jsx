import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Header = ({ mobile }) => {
    const [banner, setBanner] = useState(null)

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/home/get_banner_image.php`)
                const key = mobile ? 'm_banner' : 'banner'
                const fileName = res.data[key]

                if (fileName) {
                    setBanner(`http://ooooo0516.dothome.co.kr/uploads/admin/${fileName}`)
                }
            } catch (err) {
                console.error('배너 이미지 로딩 실패', err)
            }
        }

        fetchBanner()
    }, [mobile])

    return (
        <div className='Header_wrap'>
            {banner && <img src={banner} alt="배너 이미지" />}
        </div>
    )
}

export default Header
