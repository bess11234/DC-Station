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
    Alignment
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

export default function Editor() {
    return (
        <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
                const data = editor.getData()
                console.log(data)
            }}
            config={{
                toolbar: {
                    items: [
                        'undo', 'redo', '|',
                        'heading', '|', 'bold', 'italic', 'alignment', '|',
                        'link', 'insertImage', 'blockQuote', 'codeBlock', '|',
                        'bulletedList', 'numberedList', 'indent', 'outdent'
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
                    Alignment
                ],
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDAyNjg3OTksImp0aSI6IjNkOWQ4NmY4LTc4ODAtNGM4NC1iMjE3LWY4MWQ2OWI2YWIyYiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjQ0NTkyMjY2In0.EcY2u0mwoqE1jRjW0cMa8yTDlTUXrq3ZOsnwPlUGBgddayzllr92WGNhbxIaRy2Ivn-KFjmVOYJZMphoCPfLhQ',
                simpleUpload: {
                    uploadUrl: "/api/upload",
                },
            }

            }
        />
    )
}