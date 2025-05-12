// import { WebVoiceProcessor } from '@picovoice/web-voice-processor';
// import { PorcupineWorker } from "@picovoice/porcupine-web";

// function keywordDetectionCallback(detection) {
//     console.log(`Detected: ${detection.label}`);
//     document.getElementById('status').textContent = `Detected: ${detection.label}`;
// }

// const startWakeWordDetection = async () => {
//     try {
//         const accessKey = "RMdkA91MkThfNfnkWHLioWUSjzMKugEqdevkpFN8Y9IyybuSR6t7vQ==";

//         // Create options object according to latest documentation
//         const options = {
//             accessKey: accessKey,
//             keywords: ["Jarvis"],
//             processErrorCallback: error => {
//                 console.error("Porcupine Error:", error);
//                 document.getElementById('status').textContent = "Error: " + error.message;
//             }
//         };

//         // Create the Porcupine worker with options object
//         const porcupine = await PorcupineWorker.create(
//             options.accessKey,
//             options.keywords.map(keyword => ({
//                 builtin: keyword
//             })),
//             keywordDetectionCallback
//         );

//         // Subscribe to the WebVoiceProcessor
//         await WebVoiceProcessor.subscribe(porcupine);
//         document.getElementById('status').textContent = "Listening for 'Jarvis'...";
//     } catch (error) {
//         console.error('Porcupine Error:', error);
//         document.getElementById('status').textContent = "Error: " + error.message;
//     }
// };

// // Add event listener for the start button
// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('startButton').addEventListener('click', async () => {
//         try {
//             await navigator.mediaDevices.getUserMedia({ audio: true });
//             await startWakeWordDetection();
//         } catch (error) {
//             alert("Microphone permission error: " + error.message);
//         }
//     });
// });

// export { startWakeWordDetection };