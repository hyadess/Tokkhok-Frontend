import { useNavigate, useParams } from "react-router";
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { marked } from "marked"; // Import marked for Markdown-to-HTML conversion

const BASE_URL = 'https://buet-genesis.onrender.com';

export default function CreateNote() {
  const navigate = useNavigate();
  const [value, setValue] = useState("**Hello world!!!**");
  const [saving, setSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);
  const { userId } = useAuth();

  // Load Bengali font for PDF
  useEffect(() => {
    const loadFont = async () => {
      try {
        const fontResponse = await fetch(
          "https://cdn.jsdelivr.net/npm/noto-sans-bengali@2.001/noto-sans-bengali.ttf"
        );
        const fontBuffer = await fontResponse.arrayBuffer();
        
        const font = new FontFace('NotoSansBengali', fontBuffer);
        await font.load();
        document.fonts.add(font);
        
        setFontLoaded(true);
      } catch (err) {
        console.error("Error loading font:", err);
      }
    };
    
    loadFont();
  }, []);

  const uploadNote = async () => {
    try {
      setIsTranslating(true);
      
      const res = await axios.post(`${BASE_URL}/api/v1/translation/generate`, {
        text: value,
        translated_text: "",
        user_id: userId
      });
      console.log(res.data);
      setTranslatedText(res.data.translated_text);
      
    } catch (error) {
      console.error("Error during translation:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const saveTranslatedTextOptimized = async () => {
    try {
      if (!translatedText) {
        alert("Please translate text first");
        return;
      }
      
      setSaving(true);
      
      // Dynamically import html2canvas
      const html2canvas = await import('html2canvas');
      
      // Convert Markdown to HTML using marked
      const htmlContent = marked(translatedText);
  
      // Create a container for the rendered HTML
      const contentDiv = document.createElement('div');
      contentDiv.style.width = '750px';
      contentDiv.style.padding = '20px';
      contentDiv.style.position = 'absolute';
      contentDiv.style.left = '-9999px';
      contentDiv.style.backgroundColor = 'white';
      contentDiv.style.fontFamily = "'NotoSansBengali', Arial, sans-serif";
      contentDiv.style.fontSize = '14px';
      contentDiv.style.lineHeight = '1.5';
      contentDiv.style.color = '#000';
      contentDiv.style.wordWrap = 'break-word';
  
      // Add custom styles for headings to ensure proper sizing
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        h1 { font-size: 28px !important; font-weight: bold; margin: 10px 0; }
        h2 { font-size: 24px !important; font-weight: bold; margin: 8px 0; }
        h3 { font-size: 20px !important; font-weight: bold; margin: 6px 0; }
        h4 { font-size: 18px !important; font-weight: bold; margin: 4px 0; }
        h5 { font-size: 16px !important; font-weight: bold; margin: 2px 0; }
        h6 { font-size: 14px !important; font-weight: bold; margin: 2px 0; }
        p { margin: 5px 0; }
        strong { font-weight: bold; }
        em { font-style: italic; }
        ul, ol { margin: 10px 0; padding-left: 20px; }
        li { margin: 5px 0; }
      `;
      contentDiv.appendChild(styleElement);
      
      // Add the converted HTML content
      contentDiv.innerHTML += `<div>${htmlContent}</div>`;
      
      document.body.appendChild(contentDiv);
      
      // Create canvas with higher DPI for better quality
      const canvas = await html2canvas.default(contentDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true
      });
      
      document.body.removeChild(contentDiv);
      
      // Create PDF with optimized image quality
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasRatio = canvas.height / canvas.width;
      const imgWidth = pdfWidth - 20;
      const imgHeight = imgWidth * canvasRatio;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      
      const pdfBlob = pdf.output('blob');
      saveAs(pdfBlob, "translated_note.pdf");
      
      const formData = new FormData();
      formData.append("uploader_id", userId);
      formData.append("status", "Completed");
      formData.append("privacy_status", "private");
      formData.append("tags", JSON.stringify([]));
      formData.append("image_url", "string");
      formData.append("file", pdfBlob, "translated_note.pdf");
      
      const res = await axios.post(`${BASE_URL}/api/v1/files/pdf_upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("PDF uploaded successfully:", res.data);
      
      alert("Translated text saved as PDF successfully!");
    } catch (error) {
      console.error("Error saving translated text as PDF:", error);
      alert(`Failed to save PDF: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="w-full-max-w-10 dark:bg-slate-800"
      >
        {isTranslating ? (
          <h2>Translating...</h2>
        ) : saving ? (
          <h2>Saving...</h2>
        ) : (
          <div>
            <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
              Note Editor
            </h2>

            <div
              style={{
                width: "70vw",
                minHeight: "60vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MDEditor
                value={value}
                onChange={setValue}
                className="mb-4"
              />

              <button
                type="button"
                className="focus:outline-none text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                onClick={uploadNote}
              >
                Translate
              </button>

              {translatedText && (
                <div
                  className="mt-4 p-4 text-white bg-black rounded-md"
                  style={{
                    minHeight: "20vh",
                    overflowY: "auto",
                    fontFamily: fontLoaded ? "'NotoSansBengali', Arial, sans-serif" : "Arial, sans-serif"
                  }}
                >
                  <h3 className="text-lg font-bold mb-2">Translated</h3>
                  <MDEditor.Markdown source={translatedText} />
                </div>
              )}

              {translatedText && (
                <div className="mt-4">
                  <button
                    type="button"
                    className="focus:outline-none text-white font-semibold bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-green-900"
                    onClick={saveTranslatedTextOptimized}
                    disabled={saving}
                  >
                    {saving ? "Generating PDF..." : "Save as PDF"}
                  </button>
                  {!fontLoaded && (
                    <p className="text-sm text-yellow-500 mt-2">
                      Loading Bengali font... PDF quality may be affected if you save before the font is loaded.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}