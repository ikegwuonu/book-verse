import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { any } from "zod";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractTextFromPDF = async (file:File) => {
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item:any) => item.str).join(" ") + "\n";
  }

  return text;
};
const generateQA = async (text:any) => {
    const response = await fetch("https://your-genkit-endpoint.com/generate-qa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"  // if needed
      },
      body: JSON.stringify({ document: text, numQ: 5 })
    });
  
    const data = await response.json();
    return data.qa;  // expect: [{ question: "", answer: "" }, ...]
  };
  