// // import { useState, useCallback, useEffect } from 'react';
// // import { useDropzone } from 'react-dropzone';
// // import { FiUploadCloud, FiMic, FiStopCircle } from 'react-icons/fi';
// // import * as pdfjs from 'pdfjs-dist/build/pdf';
// // import { Worker } from '@react-pdf-viewer/core';

// // // Configure PDF.js worker
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // const TextSummarizer = () => {
// //   const [text, setText] = useState('');
// //   const [summary, setSummary] = useState('');
// //   const [language, setLanguage] = useState('english');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [pdfLoading, setPdfLoading] = useState(false);
// //   const [recognition, setRecognition] = useState(null);

// //   const languages = [
// //     { value: 'english', label: 'English' },
// //     { value: 'spanish', label: 'Spanish' },
// //     { value: 'french', label: 'French' },
// //     { value: 'german', label: 'German' },
// //   ];

// //   // Initialize speech recognition
// //   useEffect(() => {
// //     if (typeof window !== 'undefined') {
// //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //       if (SpeechRecognition) {
// //         const recognizer = new SpeechRecognition();
// //         recognizer.continuous = true;
// //         recognizer.interimResults = true;
// //         recognizer.lang = 'en-US';

// //         recognizer.onresult = (event) => {
// //           const transcript = Array.from(event.results)
// //             .map(result => result[0])
// //             .map(result => result.transcript)
// //             .join('');
// //           setText(prev => prev + ' ' + transcript);
// //         };

// //         recognizer.onerror = (event) => {
// //           setError('Error occurred in recognition: ' + event.error);
// //         };

// //         setRecognition(recognizer);
// //       }
// //     }
// //   }, []);

// //   // PDF handling
// //   const onDrop = useCallback(async (acceptedFiles) => {
// //     const file = acceptedFiles[0];
// //     if (!file) return;

// //     setPdfLoading(true);
// //     try {
// //       const reader = new FileReader();
// //       reader.onload = async (e) => {
// //         const pdf = await pdfjs.getDocument({
// //           data: new Uint8Array(e.target.result),
// //           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
// //           cMapPacked: true,
// //         }).promise;

// //         let extractedText = '';
// //         for (let i = 1; i <= pdf.numPages; i++) {
// //           const page = await pdf.getPage(i);
// //           const content = await page.getTextContent();
// //           extractedText += content.items.map(item => item.str).join(' ');
// //         }

// //         setText(extractedText);
// //         setPdfLoading(false);
// //       };
// //       reader.readAsArrayBuffer(file);
// //     } catch (err) {
// //       setError('Error reading PDF file');
// //       setPdfLoading(false);
// //     }
// //   }, []);

// //   const { getRootProps, getInputProps } = useDropzone({
// //     onDrop,
// //     accept: {
// //       'application/pdf': ['.pdf']
// //     },
// //     multiple: false
// //   });

// //   // Voice handling
// //   const toggleRecording = () => {
// //     if (!recognition) {
// //       setError('Speech recognition not supported in your browser');
// //       return;
// //     }

// //     if (!isRecording) {
// //       recognition.start();
// //       setIsRecording(true);
// //     } else {
// //       recognition.stop();
// //       setIsRecording(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!text.trim()) {
// //       setError('Please enter some text to summarize');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     try {
// //       // Simulated API call - Replace with actual API call
// //       await new Promise(resolve => setTimeout(resolve, 1000));
// //       const mockSummary = "This is a mock summary generated based on the input text. In a real implementation, this would be replaced with the actual summary from your API.";
// //       setSummary(mockSummary);
// //     } catch (err) {
// //       setError('An error occurred while generating the summary');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
// //       <div className="min-h-screen bg-gray-50 py-8 px-4">
// //         <div className="max-w-4xl mx-auto">
// //           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
// //             Text Summarizer
// //           </h1>

// //           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
// //             <div className="space-y-4">
// //               <div className="flex gap-4 flex-wrap">
// //                 {/* PDF Upload */}
// //                 <div
// //                   {...getRootProps()}
// //                   className="flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors min-w-[250px]"
// //                 >
// //                   <input {...getInputProps()} />
// //                   <div className="flex flex-col items-center gap-2">
// //                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
// //                     <span className="text-sm text-gray-600">
// //                       {pdfLoading ? 'Processing PDF...' : 'Upload PDF'}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Voice Input */}
// //                 <button
// //                   type="button"
// //                   onClick={toggleRecording}
// //                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
// //                     isRecording
// //                       ? 'bg-red-500 hover:bg-red-600 text-white'
// //                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
// //                   }`}
// //                   disabled={!recognition}
// //                 >
// //                   <div className="flex flex-col items-center gap-2">
// //                     {isRecording ? (
// //                       <FiStopCircle className="w-8 h-8" />
// //                     ) : (
// //                       <FiMic className="w-8 h-8 text-gray-500" />
// //                     )}
// //                     <span className="text-sm">
// //                       {isRecording ? 'Stop Recording' : 'Start Recording'}
// //                     </span>
// //                   </div>
// //                 </button>
// //               </div>

// //               {/* Text Input */}
// //               <div>
// //                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Input Text (from PDF/Voice/Manual)
// //                 </label>
// //                 <textarea
// //                   id="text"
// //                   value={text}
// //                   onChange={(e) => setText(e.target.value)}
// //                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   placeholder="Enter text, upload PDF, or use voice input..."
// //                   disabled={loading || pdfLoading}
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Summary Language
// //                 </label>
// //                 <select
// //                   id="language"
// //                   value={language}
// //                   onChange={(e) => setLanguage(e.target.value)}
// //                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   disabled={loading}
// //                 >
// //                   {languages.map((lang) => (
// //                     <option key={lang.value} value={lang.value}>
// //                       {lang.label}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="flex items-end">
// //                 <button
// //                   type="submit"
// //                   disabled={loading || pdfLoading}
// //                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
// //                 >
// //                   {loading ? (
// //                     <span className="flex items-center justify-center">
// //                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
// //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
// //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
// //                       </svg>
// //                       Processing...
// //                     </span>
// //                   ) : (
// //                     'Generate Summary'
// //                   )}
// //                 </button>
// //               </div>
// //             </div>

// //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// //           </form>

// //           {summary && (
// //             <div className="bg-white p-6 rounded-lg shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
// //               <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </Worker>
// //   );
// // };

// // export default TextSummarizer;

// import { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';

// // Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const TextSummarizer = () => {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [language, setLanguage] = useState('en-US');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth, setSynth] = useState(null);
//   const [audioSupported, setAudioSupported] = useState(true);

//   const languages = [
//     { value: 'en-US', label: 'English' },
//     { value: 'es-ES', label: 'Spanish' },
//     { value: 'fr-FR', label: 'French' },
//     { value: 'de-DE', label: 'German' },
//   ];

//   // Check speech synthesis support
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       if ('speechSynthesis' in window) {
//         setSynth(window.speechSynthesis);
//       } else {
//         setAudioSupported(false);
//       }
//     }
//   }, []);

//   // Initialize speech recognition
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognizer = new SpeechRecognition();
//         recognizer.continuous = true;
//         recognizer.interimResults = true;
//         recognizer.lang = 'en-US';

//         recognizer.onresult = (event) => {
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//           setText(prev => prev + ' ' + transcript);
//         };

//         recognizer.onerror = (event) => {
//           setError('Error occurred in recognition: ' + event.error);
//         };

//         setRecognition(recognizer);
//       }
//     }
//   }, []);

//   // PDF handling
//   const onDrop = useCallback(async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     setPdfLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdf = await pdfjs.getDocument({
//           data: new Uint8Array(e.target.result),
//           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//           cMapPacked: true,
//         }).promise;

//         let extractedText = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           extractedText += content.items.map(item => item.str).join(' ');
//         }

//         setText(extractedText);
//         setPdfLoading(false);
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       setError('Error reading PDF file');
//       setPdfLoading(false);
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf']
//     },
//     multiple: false
//   });

//   // Voice handling
//   const toggleRecording = () => {
//     if (!recognition) {
//       setError('Speech recognition not supported in your browser');
//       return;
//     }

//     if (!isRecording) {
//       recognition.start();
//       setIsRecording(true);
//     } else {
//       recognition.stop();
//       setIsRecording(false);
//     }
//   };

//   // Text-to-speech handler
//   const handleTextToSpeech = () => {
//     if (!audioSupported) {
//       setError('Text-to-speech not supported in your browser');
//       return;
//     }

//     if (isSpeaking) {
//       synth.cancel();
//       setIsSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(summary);
//       utterance.lang = language;
//       utterance.onend = () => setIsSpeaking(false);
//       utterance.onerror = () => setIsSpeaking(false);
//       synth.speak(utterance);
//       setIsSpeaking(true);
//     }
//   };

//   // Stop speech when component unmounts
//   useEffect(() => {
//     return () => {
//       if (synth && synth.speaking) {
//         synth.cancel();
//       }
//     };
//   }, [synth]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter some text to summarize');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // Simulated API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const mockSummary = "This is a comprehensive mock summary generated based on the input text. In a production environment, this would be replaced with an actual AI-generated summary from your backend API service. The summary would condense the key points while maintaining contextual accuracy and readability.";
//       setSummary(mockSummary);
//     } catch (err) {
//       setError('An error occurred while generating the summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Text Summarizer
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex gap-4 flex-wrap">
//                 <div
//                   {...getRootProps()}
//                   className="flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors min-w-[250px]"
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center gap-2">
//                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
//                     <span className="text-sm text-gray-600">
//                       {pdfLoading ? 'Processing PDF...' : 'Upload PDF'}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={toggleRecording}
//                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
//                     isRecording
                      // ? 'bg-red-500 hover:bg-red-600 text-white'
//                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
//                   }`}
//                   disabled={!recognition}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {isRecording ? (
//                       <FiStopCircle className="w-8 h-8" />
//                     ) : (
//                       <FiMic className="w-8 h-8 text-gray-500" />
//                     )}
//                     <span className="text-sm">
//                       {isRecording ? 'Stop Recording' : 'Start Recording'}
//                     </span>
//                   </div>
//                 </button>
//               </div>

//               <div>
//                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
//                   Input Text (from PDF/Voice/Manual)
//                 </label>
//                 <textarea
//                   id="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter text, upload PDF, or use voice input..."
//                   disabled={loading || pdfLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
//                   Summary Language
//                 </label>
//                 <select
//                   id="language"
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={loading}
//                 >
//                   {languages.map((lang) => (
//                     <option key={lang.value} value={lang.value}>
//                       {lang.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || pdfLoading}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     'Generate Summary'
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </form>

//           {summary && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
//                 <button
//                   onClick={handleTextToSpeech}
//                   disabled={!audioSupported || !summary}
//                   className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
//                     isSpeaking ? 'text-blue-600' : 'text-gray-600'
//                   } ${!audioSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   title={audioSupported ? (isSpeaking ? 'Stop audio' : 'Play audio') : 'Audio not supported'}
//                 >
//                   {isSpeaking ? (
//                     <FiVolumeX className="w-6 h-6" />
//                   ) : (
//                     <FiVolume2 className="w-6 h-6" />
//                   )}
//                 </button>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Worker>
//   );
// };

// export default TextSummarizer;



//working code

// import { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';
// import axios from 'axios';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const TextSummarizer = () => {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [language, setLanguage] = useState('en-US');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth, setSynth] = useState(null);
//   const [audioSupported, setAudioSupported] = useState(true);

//   const languages = [
//     { value: 'en-US', label: 'English' },
//     { value: 'hi-IN', label: 'Hindi' },
//     { value: 'fr-FR', label: 'French' },
//     { value: 'de-DE', label: 'German' },
//   ];

//   useEffect(() => {
//     if ('speechSynthesis' in window) {
//       setSynth(window.speechSynthesis);
//     } else {
//       setAudioSupported(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognizer = new SpeechRecognition();
//         recognizer.continuous = true;
//         recognizer.interimResults = true;
//         recognizer.lang = language;
        
//         recognizer.onresult = (event) => {
//           console.log("recording the audio")
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//             console.log(transcript);
//             setText(prev => prev + ' ' + transcript);
          
//         };

//         recognizer.onerror = (event) => {
//           setError('Recognition error: ' + event.error);
//         };

//         setRecognition(recognizer);
//       }
//     }
//   }, [language]);

//   const extractPdfText = async (file) => {
//     setPdfLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdf = await pdfjs.getDocument({
//           data: new Uint8Array(e.target.result),
//           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//           cMapPacked: true,
//         }).promise;

//         let extractedText = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           extractedText += content.items.map(item => item.str).join(' ') + '\n';
//         }
        
//         setText(extractedText);
//         setPdfLoading(false);
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       setError('Error reading PDF file');
//       setPdfLoading(false);
//     }
//   };

//   const onDrop = useCallback(async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;
//     await extractPdfText(file);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { 'application/pdf': ['.pdf'] },
//     multiple: false
//   });

//   const toggleRecording = () => {
//     if (!recognition) {
//       setError('Speech recognition not supported');
//       return;
//     }
//     isRecording ? recognition.stop() : recognition.start();
//     setIsRecording(!isRecording);
//   };

//   const handleTextToSpeech = () => {
//     if (!audioSupported) return;
    
//     if (isSpeaking) {
//       synth.cancel();
//     } else {
//       const utterance = new SpeechSynthesisUtterance(summary);
//       utterance.lang = language;
//       utterance.onend = () => setIsSpeaking(false);
//       synth.speak(utterance);
//     }
//     setIsSpeaking(!isSpeaking);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter some text');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
//     setSummary('');
    
//     try {
//       const response = await axios.post(`${API_URL}/summarize`, {
//         text: text,
//         lang: language
//       });
//       setSummary(response.data.summary);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Summarization failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Text Summarizer
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex gap-4 flex-wrap">
//                 <div
//                   {...getRootProps()}
//                   className={`flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg transition-colors min-w-[250px] ${
//                     isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
//                   }`}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center gap-2">
//                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
//                     <span className="text-sm text-gray-600">
//                       {pdfLoading ? 'Extracting Text...' : 'Upload PDF'}
//                     </span>
//                     {isDragActive && (
//                       <span className="text-sm text-blue-500">Drop PDF here</span>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={toggleRecording}
//                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
//                     isRecording 
//                       ? 'bg-red-500 hover:bg-red-600 text-white'
//                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
//                   }`}
//                   disabled={!recognition}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {isRecording ? (
//                       <FiStopCircle className="w-8 h-8" />
//                     ) : (
//                       <FiMic className="w-8 h-8 text-gray-500" />
//                     )}
//                     <span className="text-sm">
//                       {isRecording ? 'Stop Recording' : 'Start Recording'}
//                     </span>
//                   </div>
//                 </button>
//               </div>

//               <div>
//                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
//                   Input Text {pdfLoading && '(Extracting from PDF...)'}
//                 </label>
//                 <textarea
//                   id="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter text, upload PDF, or use voice input..."
//                   disabled={loading || pdfLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
//                   Summary Language
//                 </label>
//                 <select
//                   id="language"
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={loading}
//                 >
//                   {languages.map((lang) => (
//                     <option key={lang.value} value={lang.value}>
//                       {lang.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || pdfLoading}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     'Generate Summary'
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </form>

//           {summary && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
//                 <button
//                   onClick={handleTextToSpeech}
//                   disabled={!audioSupported}
//                   className={`p-2 rounded-full hover:bg-gray-100 ${
//                     isSpeaking ? 'text-blue-600' : 'text-gray-600'
//                   } ${!audioSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   title={audioSupported ? (isSpeaking ? 'Stop audio' : 'Play audio') : 'Audio not supported'}
//                 >
//                   {isSpeaking ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
//                 </button>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Worker>
//   );
// };

// export default TextSummarizer;




// import { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';
// import axios from 'axios';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const TextSummarizer = () => {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [language, setLanguage] = useState('en');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth, setSynth] = useState(null);
//   const [audioSupported, setAudioSupported] = useState(true);

//   const languages = [
//     { value: 'en', label: 'English', code: 'en-IN' },
//     { value: 'hi', label: 'Hindi', code: 'hi-IN' },
//     { value: 'bn', label: 'Bengali', code: 'bn-IN' },
//     { value: 'ta', label: 'Tamil', code: 'ta-IN' }
//   ];

//   useEffect(() => {
//     if ('speechSynthesis' in window) {
//       setSynth(window.speechSynthesis);
//     } else {
//       setAudioSupported(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognizer = new SpeechRecognition();
//         recognizer.continuous = true;
//         recognizer.interimResults = true;
//         recognizer.lang = languages.find(l => l.value === language)?.code || 'en-IN';

//         recognizer.onresult = (event) => {
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//           setText(prev => prev + ' ' + transcript);
//         };

//         recognizer.onerror = (event) => {
//           setError('Recognition error: ' + event.error);
//         };

//         setRecognition(recognizer);
//       }
//     }
//   }, [language]);

//   const extractPdfText = async (file) => {
//     setPdfLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdf = await pdfjs.getDocument({
//           data: new Uint8Array(e.target.result),
//           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//           cMapPacked: true,
//         }).promise;

//         let extractedText = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           extractedText += content.items.map(item => item.str).join(' ') + '\n';
//         }
        
//         setText(extractedText);
//         setPdfLoading(false);
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       setError('Error reading PDF file');
//       setPdfLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: useCallback(async (files) => files[0] && extractPdfText(files[0]), []),
//     accept: { 'application/pdf': ['.pdf'] },
//     multiple: false
//   });

//   const toggleRecording = () => {
//     if (!recognition) {
//       setError('Speech recognition not supported');
//       return;
//     }
//     isRecording ? recognition.stop() : recognition.start();
//     setIsRecording(!isRecording);
//   };

//   const handleTextToSpeech = () => {
//     if (!audioSupported) return;
    
//     const voices = synth.getVoices();
//     const selectedVoice = voices.find(v => v.lang === languages.find(l => l.value === language)?.code);
    
//     if (!selectedVoice) {
//       setError('Voice not available for selected language');
//       return;
//     }

//     if (isSpeaking) {
//       synth.cancel();
//     } else {
//       const utterance = new SpeechSynthesisUtterance(summary);
//       utterance.voice = selectedVoice;
//       utterance.lang = selectedVoice.lang;
//       utterance.onend = () => setIsSpeaking(false);
//       synth.speak(utterance);
//     }
//     setIsSpeaking(!isSpeaking);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter some text');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
//     setSummary('');
    
//     try {
//       const response = await axios.post(`${API_URL}/summarize`, {
//         text: text,
//         lang: language
//       });
//       setSummary(response.data.summary);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Summarization failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Text Summarizer
//           </h1>

//           {/* Language Selector */}
//           <div className="mb-8">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Language
//             </label>
//             <select
//               value={language}
//               onChange={(e) => setLanguage(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             >
//               {languages.map((lang) => (
//                 <option key={lang.value} value={lang.value}>
//                   {lang.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Rest of the form remains same with updated text elements */}
//           {/* ... (previous form elements) ... */}


//           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex gap-4 flex-wrap">
//                 <div
//                   {...getRootProps()}
//                   className={`flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg transition-colors min-w-[250px] ${
//                     isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
//                   }`}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center gap-2">
//                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
//                     <span className="text-sm text-gray-600">
//                       {pdfLoading ? 'Extracting Text...' : 'Upload PDF'}
//                     </span>
//                     {isDragActive && (
//                       <span className="text-sm text-blue-500">Drop PDF here</span>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={toggleRecording}
//                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
//                     isRecording 
//                       ? 'bg-red-500 hover:bg-red-600 text-white'
//                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
//                   }`}
//                   disabled={!recognition}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {isRecording ? (
//                       <FiStopCircle className="w-8 h-8" />
//                     ) : (
//                       <FiMic className="w-8 h-8 text-gray-500" />
//                     )}
//                     <span className="text-sm">
//                       {isRecording ? 'Stop Recording' : 'Start Recording'}
//                     </span>
//                   </div>
//                 </button>
//               </div>

//               <div>
//                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
//                   Input Text {pdfLoading && '(Extracting from PDF...)'}
//                 </label>
//                 <textarea
//                   id="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter text, upload PDF, or use voice input..."
//                   disabled={loading || pdfLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
//                   Summary Language
//                 </label>
//                 <select
//                   id="language"
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={loading}
//                 >
//                   {languages.map((lang) => (
//                     <option key={lang.value} value={lang.value}>
//                       {lang.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || pdfLoading}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     'Generate Summary'
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </form>

//           {summary && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
//                 <button
//                   onClick={handleTextToSpeech}
//                   className={`p-2 rounded-full hover:bg-gray-100 ${
//                     isSpeaking ? 'text-blue-600' : 'text-gray-600'
//                   }`}
//                 >
//                   {isSpeaking ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
//                 </button>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap" style={{ fontFamily: 
//                 language === 'hi' ? 'Noto Sans Devanagari' : 
//                 language === 'bn' ? 'Noto Sans Bengali' :
//                 language === 'ta' ? 'Noto Sans Tamil' : 'inherit'
//               }}>
//                 {summary}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Worker>
//   );
// };

// export default TextSummarizer;



//with google trans

// FRONTEND - src/components/TextSummarizer.js
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
import * as pdfjs from 'pdfjs-dist/build/pdf';
import { Worker } from '@react-pdf-viewer/core';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TextSummarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [originalSummary, setOriginalSummary] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth, setSynth] = useState(null);
  const [audioSupported, setAudioSupported] = useState(true);
  const [showOriginal, setShowOriginal] = useState(false);

  const languages = [
    { value: 'en', label: 'English', code: 'en-US' },
    { value: 'hi', label: 'Hindi', code: 'hi-IN' },
    { value: 'bn', label: 'Bengali', code: 'bn-IN' },
    { value: 'ta', label: 'Tamil', code: 'ta-IN' }
  ];

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
      window.speechSynthesis.onvoiceschanged = () => {
        setSynth(window.speechSynthesis);
      };
    } else {
      setAudioSupported(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognizer = new SpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = languages.find(l => l.value === language)?.code || 'en-US';

        recognizer.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          setText(prev => prev + ' ' + transcript);
        };

        recognizer.onerror = (event) => {
          setError('Recognition error: ' + event.error);
        };

        setRecognition(recognizer);
      }
    }
  }, [language]);

  const extractPdfText = async (file) => {
    setPdfLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdf = await pdfjs.getDocument({
          data: new Uint8Array(e.target.result),
          cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }).promise;

        let extractedText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extractedText += content.items.map(item => item.str).join(' ') + '\n';
        }
        
        setText(extractedText);
        setPdfLoading(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError('Error reading PDF file: ' + err.message);
      setPdfLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(async (files) => files[0] && extractPdfText(files[0]), []),
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const toggleRecording = () => {
    if (!recognition) {
      setError('Speech recognition not supported in your browser');
      return;
    }
    isRecording ? recognition.stop() : recognition.start();
    setIsRecording(!isRecording);
  };

  const handleTextToSpeech = () => {
    if (!audioSupported || !synth) {
      setError('Text-to-speech not supported in your browser');
      return;
    }

    const voices = synth.getVoices();
    const targetLang = languages.find(l => l.value === language)?.code;
    const voice = voices.find(v => v.lang === targetLang) || 
                 voices.find(v => v.lang.startsWith(language)) ||
                 voices[0]; // Fallback to first available voice

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }
    
    setLoading(true);
    setError('');
    setSummary('');
    setOriginalSummary('');
    
    try {
      const response = await axios.post(`${API_URL}/summarize`, {
        text: text,
        lang: language
      }, {
        timeout: 60000, // Increase timeout for large texts
      });
      
      if (response.data.error) throw new Error(response.data.error);
      
      setSummary(response.data.summary);
      if (response.data.original && language !== 'en') {
        setOriginalSummary(response.data.original);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 413) {
          setError('Text is too long. Please reduce the size.');
        } else if (err.response.status === 429) {
          setError('Too many requests. Please try again later.');
        } else {
          setError(`Server error (${err.response.status}): ${err.response.data.error || 'Unknown error'}`);
        }
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(err.message || 'Summarization failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Abstractive Text Summarizer
          </h1>

          <div className="mb-8 space-y-4">
            <div className="flex gap-4 items-center">
              <label className="block text-sm font-medium text-gray-700">
                Output Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div
                {...getRootProps()}
                className={`flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg transition-colors ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
                } ${loading || pdfLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input {...getInputProps()} disabled={loading || pdfLoading} />
                <div className="flex flex-col items-center gap-2">
                  <FiUploadCloud className="w-8 h-8 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {pdfLoading ? 'Extracting Text...' : 'Upload PDF'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleRecording}
                className={`flex-1 p-4 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-white border-2 border-gray-300 hover:border-blue-500'
                }`}
                disabled={!recognition || loading || pdfLoading}
              >
                <div className="flex flex-col items-center gap-2">
                  {isRecording ? (
                    <FiStopCircle className="w-8 h-8" />
                  ) : (
                    <FiMic className="w-8 h-8 text-gray-500" />
                  )}
                  <span className="text-sm">
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </span>
                </div>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text {pdfLoading && '(Extracting PDF...)'}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter text, upload PDF, or use voice input..."
                disabled={loading || pdfLoading}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || pdfLoading || !text.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Processing...
              </span>
            ) : (
              'Generate Summary'
            )}
          </button>

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

          {summary && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Summary ({languages.find(l => l.value === language)?.label})
                </h2>
                <div className="flex items-center gap-2">
                  {originalSummary && (
                    <button
                      onClick={() => setShowOriginal(!showOriginal)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {showOriginal ? "Hide English" : "Show English"}
                    </button>
                  )}
                  <button
                    onClick={handleTextToSpeech}
                    className={`p-2 rounded-full hover:bg-gray-100 ${
                      isSpeaking ? 'text-blue-600' : 'text-gray-600'
                    }`}
                    title={isSpeaking ? 'Stop audio' : 'Play audio'}
                    disabled={!audioSupported}
                  >
                    {isSpeaking ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
                  </button>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">
                {summary}
              </p>
              
              {/* Show original English summary if requested */}
              {showOriginal && originalSummary && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">
                    Original Summary (English)
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap text-sm">
                    {originalSummary}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Worker>
  );
};

export default TextSummarizer;

