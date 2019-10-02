import React from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import {reqDeleteImg} from '../../api'

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = async ({ file, fileList }) => {
        if(file.status==='done') {
            const result = file.response;
            if(result.status===0) {
                const {name, url} = result.data;
                file = fileList[fileList.length-1];
                file.name = name;
                file.url = url;
            } else {
                message.error('Upload Failed!')
            }
        }
            else if (file.status==='removed') {
            const result = await reqDeleteImg(file.name);
            if (result.status===0) {
                message.success('Delete Image Successfully!')
            } else {
                message.error('Delete Image Failed!')
            }
        }
        this.setState({ fileList })
    };

    getImgs  = () => {
        return this.state.fileList.map(file => file.name)
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/univ/img/upload"
                    accept='image/*'
                    name='image'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        )
    }
}
