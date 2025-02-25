'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
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
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import { Dispatch, SetStateAction } from 'react';

interface Props {
    content: string;
    updateContent: Dispatch<SetStateAction<string>>
}

export default function Editor({ content, updateContent }: Props) {
    return (
        <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
                const data = editor.getData()
                updateContent(data)
            }}
            
            config={{
                initialData: content,
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
                plugins: [
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
                    SourceEditing
                ],
                // Licenkey CKEditor
                licenseKey: process.env.NEXT_PUBLIC_CK_LICENSEKEY,
                simpleUpload: {
                    uploadUrl: "/api/upload",
                },
            }

            }
        />
    )
}