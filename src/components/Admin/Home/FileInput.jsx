import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const FileInput = ({ label, keyName }) => {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            setFileName(selectedFile.name)
        } else {
            setFile(null)
            setFileName('')
        }
    }

    const handleUpload = async () => {
        if (!file) {
            alert('파일을 먼저 선택해주세요')
            return
        }

        const formData = new FormData()
        formData.append('key', keyName)
        formData.append('file', file)

        setUploading(true)
        try {
            const res = await axios.post(`${baseUrl}/admin/home/save_image.php`, formData)
            if (res.data.success) {
                alert('저장 완료')
            } else {
                alert('업로드 실패: ' + res.data.message)
            }
        } catch (err) {
            console.error(err)
            alert('서버 오류')
        } finally {
            setUploading(false)
        }
    }

    useEffect(() => {
        const loadFileName = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/home/load_image_name.php?key=${keyName}`)
                if (res.data.success && res.data.file_name) {
                    setFileName(res.data.file_name)
                }
            } catch (err) {
                console.error('파일 이름 로딩 실패', err)
            }
        }

        loadFileName()
    }, [keyName])

    return (
        <div className='input_wrap'>
            <div>
                <input type="file" id={`file-${keyName}`} onChange={handleFileChange} />
                <label htmlFor={`file-${keyName}`}>{label}</label>
                <p>{fileName}</p>
            </div>
            <button onClick={handleUpload}>{uploading ? '저장 중...' : '저장'}</button>
        </div>
    )
}

export default FileInput
