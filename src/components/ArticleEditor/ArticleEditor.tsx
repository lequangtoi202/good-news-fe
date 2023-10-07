import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';

function ArticleEditor() {
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };
  return (
    <div style={{ height: '300px' }}>
      <h2>Viết bài viết của bạn</h2>
      <div>
        <CKEditor editor={ClassicEditor} data={editorData} onChange={handleEditorChange} />
      </div>
    </div>
  );
}

export default ArticleEditor;
