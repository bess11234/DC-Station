// components/custom-editor.js
'use client' // only in App Router

import React from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

import { Dispatch, SetStateAction } from 'react';

interface Props {
    content: string;
    updateContent: Dispatch<SetStateAction<string>>
}

const CustomEditor = ({content, updateContent}: Props) => {
    const cloud = useCKEditorCloud({
        version: '44.2.1',
        premium: false
    });

    if (cloud.status === 'error') {
        return <div>Error!</div>;
    }

    if (cloud.status === 'loading') {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Bold,
        Essentials,
        Heading,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        MediaEmbed,
        Paragraph,
        Table,
        Undo,
        Image,
        ImageInsert,
        ImageUpload,
        ImageToolbar,
        ImageCaption,
        ImageResize,
        ImageBlock,
        ImageEditing,
        ImageStyle,
        ImageInline,
        LinkImage,
        AutoImage,
        BlockQuote,
        CodeBlock,
        SimpleUploadAdapter,
        Alignment,
        Font,
        SourceEditing
    } = cloud.CKEditor;

    return (
        <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
                const data = editor.getData()
                updateContent(data)
            }}
            data={content}
            config={{
                simpleUpload: {
                    uploadUrl: "/api/upload",
                },
                licenseKey: process.env.NEXT_PUBLIC_CK_LICENSEKEY,
                plugins: [Bold,
                    Essentials,
                    Heading,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    MediaEmbed,
                    Paragraph,
                    Table,
                    Undo,
                    Image,
                    ImageInsert,
                    ImageToolbar,
                    ImageCaption,
                    ImageUpload,
                    ImageResize,
                    ImageBlock,
                    ImageEditing,
                    ImageStyle,
                    ImageInline,
                    LinkImage,
                    AutoImage,
                    BlockQuote,
                    CodeBlock,
                    SimpleUploadAdapter,
                    Alignment,
                    Font,
                    SourceEditing,
                    Essentials, Paragraph, Bold, Italic],
                toolbar: {
                    items: [
                        'undo', 'redo', '|',
                        'heading', '|', 'bold', 'italic', 'alignment', '|',
                        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                        'link', 'insertImage', 'blockQuote', 'codeBlock', '|',
                        'bulletedList', 'numberedList', 'indent', 'outdent', '|',
                        'sourceEditing'
                    ],
                    shouldNotGroupWhenFull: true
                },
                image: {
                    toolbar: [
                        'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
                        'toggleImageCaption', 'imageTextAlternative'
                    ]
                },
            }}
        />
    );
};

export default CustomEditor;
