import { useEffect, useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';

function App() {
  const [markdownText, setMarkdownText] = useState('');

  const insertMarkdown = (syntax, wrap = false) => {
    const textarea = document.getElementById("markdown-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdownText.substring(start, end);
    const beforeText = markdownText.substring(0, start);
    const afterText = markdownText.substring(end);

    if (wrap) {
      setMarkdownText(`${beforeText}${syntax}${selectedText}${syntax}${afterText}`);
    } else {
      setMarkdownText(`${beforeText}${syntax}${selectedText}${afterText}`);
    }

    // Place cursor after inserted text
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + syntax.length;
      textarea.focus();
    }, 0);
  };
  
  
  return (
    <>
    <h1 className='text-indigo-500 text-6xl font-bold mb-10'>Markdown</h1>
    <div className='flex flex-row gap-4 justify-center mb-10'>
      <button className='btn' onClick={() => insertMarkdown("# ", false)} >Heading 1</button>
      <button className='btn' onClick={() => insertMarkdown("## ", false)} >Heading 2</button>
      <button className='btn' onClick={() => insertMarkdown("**", true)} >Bold</button>
      <button className='btn' onClick={() => insertMarkdown("_", true)} >Italic</button>
      <button className='btn' onClick={() => insertMarkdown("\n---\n", false)} >Horizontal line</button>
      <button className='btn' onClick={() => insertMarkdown("- First item\n- Second item\n- Third item\n ", false)} >Unordered list</button>
      <button className='btn' onClick={() => insertMarkdown("1. First item\n2. Second item\n3. Third item\n ", false)} >Ordered List</button>
      <button className='btn' onClick={() => insertMarkdown("[]()", false)} >Link</button>
      <button className='btn' onClick={() => insertMarkdown("`", true)}  >Code</button>
    </div>
    <div className='flex flex-row gap-20'>
      <div className=' flex flex-col gap-4 w-3/6 items-start h-screen'>
        <label htmlFor='markdown-textarea' className=' font-bold text-indigo-400'>Write your document markdown</label>
        <textarea 
          id="markdown-textarea" 
          className='border-solid border border-indigo-500 rounded p-5 w-full h-full' 
          value={markdownText}
          onChange={(e)=>setMarkdownText(e.target.value)}
          >
        </textarea>
      </div>
      <div className=' flex flex-col gap-4 w-3/6 items-start h-screen'>
        <p className=' font-bold text-indigo-400'>Your html code</p>
        <div 
          className='border-solid border border-indigo-500 rounded p-5 w-full h-full text-left'
          id="markdown-preview"
          >
            <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>
    </div>
    </>
        
  )
}

export default App
