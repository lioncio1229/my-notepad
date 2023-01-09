import useStore from '../useStore';
import '../mynotepad.style.css';
import Header from "../components/header";
import Notes from '../components/notes';
import TextEditor from '../components/text-editor';
import LoadingCircle from '../components/loading-circle';
import useFetchUserData from '../useFetchUserData';
import { useEffect } from 'react';
import { isMobile } from '../utils';

export default function Main() {
  const state = useStore().state;
    const {picture} = state.global.account;
    const {isWide, isLong, isFullscreen} = state.textEditor.display;
    const {fetch} = useFetchUserData();

    useEffect(() => {
      fetch();
    }, []);

    return (
      <div className='main flex-con fcol'>
        {
          isMobile ? 
          <>
            <Header picture={picture}/>
            <Notes />
          </> : 
          <>
            <LoadingCircle />
            {(!isLong && !isFullscreen) && <Header picture={picture}/>}
            <div className='my-notepad flex-con'>
              {(!isWide && !isFullscreen) && <Notes />}
              <TextEditor />
            </div>
          </>
        }
      </div>
    );
};
