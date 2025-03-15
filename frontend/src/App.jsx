import './App.css';
import logo from '../src/assets/logo.png'
import 'prismjs/themes/prism-tomorrow.css';
import prism from "prismjs";
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import axios from 'axios';

function App() {
    const BackendUrl = import.meta.env.VITE_API_URL;
    const [code, setCode] = useState(`

    function generateCode ( )  {

            return a + b;

        }
    `);

    const [loading, setLoading] = useState(false);

    const [reviewResult, setReviewResult] = useState(null);

    const handleReview = async () => {
        setLoading(true);
        try {
            const response = await axios.post(BackendUrl + "/ai/get-content", { code });
            if(response.data.success){
                setReviewResult(response.data.reviewCode); 
            }
            console.log(response.data.reviewCode);
            
        } catch (error) {
            console.error("Error during code review:", error);
            setReviewResult({ message: "Error during code review.", error: error.message }); 
        }
        setLoading(false);
    };

    useEffect(() => {
        prism.highlightAll();
    }, [code]);

    return (
        <main className='sm:h-screen bg-zinc-900 p-8 pt-0'>
            <div className='flex  sm:gap-0 gap-4 justify-center items-center py-8 sm:py-4'><img className='sm:w-40 w-30' src={logo} alt="logo" /><h1 className='sm:text-3xl bg-[length:200%] text-center text-xl animate-gradient font-bold  uppercase bg-gradient-to-r from-[#B7D828] via-black to-[#06DBF7] bg-clip-text text-transparent'>Ai Code Reviewer</h1></div>
            <div className='flex  sm:h-[80vh] sm:flex-row flex-col gap-8 '>
            <div className='sm:h-full h-[70vh] w-full relative rounded-2xl overflow-hidden'>
                <div className='code h-full w-full'>
                    <Editor
                        className='h-full w-full scroller'
                        value={code}
                        onValueChange={code => setCode(code)}
                        highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
                        padding={10}
                        style={{
                            fontSize: 15,
                            color: 'white',
                            backgroundColor: 'black',
                            padding: '10px',
                            overflow:'auto'
                        }}
                    />
                </div>
                <button onClick={handleReview} className='px-8 py-2 bg-blue-400/40 font-bold rounded-lg absolute bottom-4 right-4 text-white hover:bg-blue-500 transition-all duration-300 active:bg-blue-500/20 active:scale-95'>
                    REVIEW
                </button>
            </div>
            <div className='sm:h-full h-[70vh] scroller relative w-full rounded-2xl overflow-hidden bg-zinc-800 p-6 text-white overflow-y-scroll overflow-x-scroll'> 
            {reviewResult && <pre>{reviewResult}</pre>}
            {loading &&
  <div className="flex flex-col gap-4 w-full h-full justify-center ">
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[90%] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[75%] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[85%] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[65%] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[90%] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[75%] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[85%] p-3 skeleton rounded-md animate-pulse"></div>
    <div className="bg-gradient-to-r from-[#5684D1] via-[#131314] to-[#5684D1] w-[65%] p-3 skeleton rounded-md animate-pulse"></div>
  </div>
}
            {!reviewResult && !loading && <p className='hidden sm:block'>No review yet.</p>}
            <button onClick={() => setReviewResult(null)} className='px-8 py-2 bg-[#ECF136]/60 uppercase  font-bold rounded-lg absolute top-5 right-4 text-black hover:bg-[#ECF136] transition-all duration-300 active:bg-[#ECF136]/20 active:scale-95'>reset</button>
            </div>
            </div>
        </main>
    );
}

export default App;