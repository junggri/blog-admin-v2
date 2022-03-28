import React, {FC, LegacyRef, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from "./write.module.scss";

import {Editor, SyntheticKeyboardEvent} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Draft, {EditorState, convertFromRaw, ContentState, convertToRaw, RichUtils, getDefaultKeyBinding} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import 'tui-color-picker/dist/tui-color-picker.css';

import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppState, RootState} from "reducer";
import {RouteComponentProps, useHistory, useLocation} from "react-router-dom";
import EditorMetaInfo from "../../component/EditorMetaInfo/EditorMetaInfo";
import {PostActions} from "../../reducer/post";
import {PostItemActions} from "../../reducer/postItem";
import htmlToDraft from "html-to-draftjs";


export interface WriteFormik {
  content: string
  // originalContent: string
  title: string
  desc: string
  open: boolean
  file: File | null
  hashId: string | null,
  thumbnail: string | null
  is_published: boolean,
  tagIds: number[]
}

interface MatchParams {
  hashId: string;
}

interface Props {
}

const Write: FC<RouteComponentProps<MatchParams> & Props> = ({match}) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const post = useSelector((state: AppState) => state.upsertPost);

  const {values, resetForm, handleChange, handleSubmit, validateForm, setFieldValue} = useFormik<WriteFormik>({
    initialValues: {
      content: "",
      title: "",
      desc: "",
      open: true,//공개 비공개
      file: null,
      hashId: null,
      thumbnail: null,
      is_published: true,//임시저장 저장
      tagIds: []
    },
    onSubmit: () => {
      dispatch(PostActions.UPSERT_POST(values))
    },
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isNext, setIsNext] = useState<boolean>(false);
  const EditorRef = useRef<object>()

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const markUp = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setFieldValue("content", markUp)
  };

  const setReference = (ref: object) => {
    EditorRef.current = ref
  }

  const handleOnTab = (e: SyntheticKeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (location.search) {
      const hashId = location.search.split("=")[1];
      dispatch(PostItemActions.GET_POST(hashId))
    }

  }, [location])

  useEffect(() => {
    if (!post.data) {
      return
    }
    setFieldValue("content", post.data.content)
    setFieldValue("title", post.data.title)
    setFieldValue("desc", post.data.desc)
    setFieldValue("open", post.data.open)
    setFieldValue("hashId", post.data.hashId);
    setFieldValue("thumbnail", post.data.thumbnail)
    setFieldValue("is_published", post.data.isPublished)
    setFieldValue("tagIds", post.data.tag.map(e => e.id))

    const blocksFromHtml = htmlToDraft(post.data.content as string);
    if (blocksFromHtml) {
      const {contentBlocks, entityMap} = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }

  }, [post.data])

  useEffect(() => {
    if (!EditorRef.current) {
      return
    }
    (EditorRef.current as HTMLDivElement).focus()
  }, [EditorRef.current])


  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit}>
        <EditorMetaInfo
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          values={values}
          isNext={isNext}
          setIsNext={setIsNext}
        />
        <Editor
          editorStyle={{
            padding: '0 20px'
          }}
          wrapperClassName="wrapper-class"
          editorClassName="editor"
          toolbarClassName="toolbar-class"
          tabIndex={-1}
          toolbar={{
            list: {inDropdown: true},
            textAlign: {inDropdown: true},
            link: {inDropdown: true},
            history: {inDropdown: false},
          }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          placeholder={"글 작성하기"}
          onTab={handleOnTab}
          editorRef={setReference}
        />
        <div className={styles.button} onClick={() => {
          setIsNext(true)
        }}>
          다음
        </div>
      </form>
    </section>
  );
};

export default Write;
