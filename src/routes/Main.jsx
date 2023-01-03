import useStore from '../useStore';
import '../mynotepad.style.css';
import Header from "../components/header";
import Notes from '../components/notes';
import TextEditor from '../components/text-editor';
import LoadingCircle from '../components/loading-circle';
import Provider from '../provider';

export default function Main() {

  const MainPage = () => {
    const state = useStore().state;
    const {picture} = state.global.account;
    const {isWide, isLong, isFullscreen} = state.textEditor.display;

    return (
      <div className='main flex-con fcol'>
        <LoadingCircle />
        {(!isLong && !isFullscreen) && <Header picture={picture}/>}
        <div className='my-notepad flex-con'>
          {(!isWide && !isFullscreen) && <Notes />}
          <TextEditor />
        </div>
      </div>
    );
  }

  return (
    <Provider>
      <MainPage />
    </Provider>
  )
};
