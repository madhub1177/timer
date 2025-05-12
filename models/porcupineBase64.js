// Create a function to load and read the base64 string from a .txt file
export async function loadBase64FromFile(filePath) {
    try {
        const response = await fetch(filePath);  // Fetch the file
        const base64Content = await response.text();  // Read the file as text
        return base64Content.trim();  // Return the base64 string (trim to remove any extra newlines)
    } catch (error) {
        console.error("Error loading base64 file:", error);
        return null;
    }
}

// Function to initialize Porcupine with the loaded model
async function initializePorcupine() {
    const base64 = await loadBase64FromFile('./models/porcupine_params_base64.txt');
    if (base64) {
        // console.log("Base64 Loaded:", base64); // Now you can use this base64 string as needed
        // You can now initialize Porcupine with this base64
    } else {
        console.error("Failed to load the base64 model.");
    }
}

// Call the initialization function to load the base64 model
initializePorcupine();



export const PORCUPINE_MODEL_BASE64 = loadBase64FromFile('./models/porcupine_params_base64.txt');
