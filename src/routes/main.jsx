import useStore from '../useStore';
import '../mynotepad.style.css';
import Header from "../components/header";
import Notes from '../components/notes';
import TextEditor from '../components/text-editor';

export default function Main() {
  const {isWide, isLong, isFullscreen} = useStore().state.textEditor.display;

  return (
    <div className='main flex-con fcol'>
      {(!isLong && !isFullscreen) && <Header />}
      <div className='my-notepad flex-con'>
        {(!isWide && !isFullscreen) && <Notes />}
        <TextEditor />
      </div>
    </div>
  );
}
